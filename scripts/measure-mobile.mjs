/**
 * Measures rendered page height at a phone viewport by driving the local
 * Chrome install over the DevTools protocol. Used to verify the mobile
 * length reduction; safe to delete.
 *
 * Usage: node scripts/measure-mobile.mjs [baseUrl]
 */
import { spawn } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const BASE = process.argv[2] || 'http://localhost:3000'
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PORT = 9333
const ROUTES = ['/', '/practices', '/attorneys', '/about', '/contact']
const VIEWPORT = { width: 390, height: 844 } // iPhone 14

const profile = mkdtempSync(join(tmpdir(), 'licit-measure-'))
const chrome = spawn(CHROME, [
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${profile}`,
  '--headless=new',
  '--no-first-run',
  '--no-default-browser-check',
  '--disable-extensions',
  `--window-size=${VIEWPORT.width},${VIEWPORT.height}`,
  'about:blank',
], { stdio: 'ignore' })

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function getWsUrl() {
  for (let i = 0; i < 50; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`)
      return (await res.json()).webSocketDebuggerUrl
    } catch { await sleep(200) }
  }
  throw new Error('Chrome did not expose a debugging endpoint')
}

function connect(url) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url)
    ws.onopen = () => resolve(ws)
    ws.onerror = reject
  })
}

let msgId = 0
function send(ws, method, params = {}, sessionId) {
  const id = ++msgId
  return new Promise((resolve, reject) => {
    const onMsg = (ev) => {
      const m = JSON.parse(ev.data)
      if (m.id !== id) return
      ws.removeEventListener('message', onMsg)
      m.error ? reject(new Error(`${method}: ${m.error.message}`)) : resolve(m.result)
    }
    ws.addEventListener('message', onMsg)
    ws.send(JSON.stringify({ id, method, params, sessionId }))
  })
}

const PROBE = `(() => {
  const d = document.documentElement, vh = window.innerHeight;
  const secs = [...document.querySelectorAll('main > section')];
  return JSON.stringify({
    height: d.scrollHeight,
    screens: +(d.scrollHeight / vh).toFixed(2),
    overflow: d.scrollWidth > window.innerWidth ? d.scrollWidth : 0,
    header: document.querySelector('header')?.offsetHeight ?? 0,
    footer: document.querySelector('footer')?.offsetHeight ?? 0,
    sections: secs.map(s => ({
      label: (s.querySelector('h1,h2')?.textContent || 'hero').trim().slice(0, 34),
      px: s.offsetHeight
    })),
    tooSmall: [...document.querySelectorAll('a,button,[role=button],input,select,textarea')]
      .filter(el => {
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) return false;
        return r.height < 24 || r.width < 24;
      }).length
  });
})()`

const results = []
try {
  const ws = await connect(await getWsUrl())
  const { targetId } = await send(ws, 'Target.createTarget', { url: 'about:blank' })
  const { sessionId } = await send(ws, 'Target.attachToTarget', { targetId, flatten: true })

  await send(ws, 'Page.enable', {}, sessionId)
  await send(ws, 'Emulation.setDeviceMetricsOverride', {
    ...VIEWPORT, deviceScaleFactor: 3, mobile: true,
  }, sessionId)
  await send(ws, 'Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 }, sessionId)

  for (const route of ROUTES) {
    await send(ws, 'Page.navigate', { url: BASE + route }, sessionId)
    await sleep(2600)
    // Dismiss the Bar Council disclaimer gate, which blocks scroll until accepted.
    await send(ws, 'Runtime.evaluate', {
      expression: `[...document.querySelectorAll('button')].find(b=>/I Agree/i.test(b.textContent))?.click()`,
    }, sessionId)
    await sleep(900)
    const { result } = await send(ws, 'Runtime.evaluate',
      { expression: PROBE, returnByValue: true }, sessionId)
    results.push([route, JSON.parse(result.value)])
  }
  ws.close()
} finally {
  chrome.kill()
  try { rmSync(profile, { recursive: true, force: true }) } catch {}
}

console.log(`\nViewport ${VIEWPORT.width}x${VIEWPORT.height} (iPhone 14)\n${'='.repeat(58)}`)
for (const [route, r] of results) {
  console.log(`\n${route}`)
  console.log(`  height        ${r.height}px  (${r.screens} screens)`)
  console.log(`  h-overflow    ${r.overflow ? '⚠ ' + r.overflow + 'px' : 'none'}`)
  console.log(`  header/footer ${r.header}px / ${r.footer}px`)
  console.log(`  sub-24px hits ${r.tooSmall === 0 ? 'none' : '⚠ ' + r.tooSmall}`)
  if (r.sections.length) {
    for (const s of r.sections) console.log(`    ${String(s.px).padStart(5)}px  ${s.label}`)
  }
}
console.log()
