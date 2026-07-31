/**
 * Reports undersized tap targets and a footer height breakdown at a phone
 * viewport. Companion to measure-mobile.mjs; safe to delete.
 */
import { spawn } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const BASE = process.argv[2] || 'http://localhost:3000'
const ROUTES = (process.argv[3] || '/,/contact').split(',')
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PORT = 9334

const profile = mkdtempSync(join(tmpdir(), 'licit-diag-'))
const chrome = spawn(CHROME, [
  `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
  '--headless=new', '--no-first-run', '--no-default-browser-check', 'about:blank',
], { stdio: 'ignore' })

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
let msgId = 0
function send(ws, method, params = {}, sessionId) {
  const id = ++msgId
  return new Promise((resolve, reject) => {
    const onMsg = (ev) => {
      const m = JSON.parse(ev.data)
      if (m.id !== id) return
      ws.removeEventListener('message', onMsg)
      m.error ? reject(new Error(m.error.message)) : resolve(m.result)
    }
    ws.addEventListener('message', onMsg)
    ws.send(JSON.stringify({ id, method, params, sessionId }))
  })
}

const PROBE = `(() => {
  const small = [...document.querySelectorAll('a,button,[role=button],input,select,textarea')]
    .map(el => ({ el, r: el.getBoundingClientRect() }))
    .filter(({ r }) => r.width && r.height && (r.height < 24 || r.width < 24))
    .map(({ el, r }) => ({
      tag: el.tagName.toLowerCase(),
      w: Math.round(r.width), h: Math.round(r.height),
      text: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30),
      cls: (el.className || '').toString().slice(0, 60),
    }));
  const f = document.querySelector('footer');
  const parts = f ? [...f.querySelectorAll(':scope > div > div > div, :scope > div > div')]
    .map(d => ({ h: d.offsetHeight, txt: (d.textContent||'').trim().slice(0,28) }))
    .filter(d => d.h > 20) : [];
  return JSON.stringify({ small, footer: f?.offsetHeight ?? 0, parts });
})()`

try {
  let wsUrl
  for (let i = 0; i < 50; i++) {
    try { wsUrl = (await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json()).webSocketDebuggerUrl; break }
    catch { await sleep(200) }
  }
  const ws = await new Promise((res, rej) => { const w = new WebSocket(wsUrl); w.onopen = () => res(w); w.onerror = rej })
  const { targetId } = await send(ws, 'Target.createTarget', { url: 'about:blank' })
  const { sessionId } = await send(ws, 'Target.attachToTarget', { targetId, flatten: true })
  await send(ws, 'Page.enable', {}, sessionId)
  await send(ws, 'Emulation.setDeviceMetricsOverride',
    { width: 390, height: 844, deviceScaleFactor: 3, mobile: true }, sessionId)

  for (const route of ROUTES) {
    await send(ws, 'Page.navigate', { url: BASE + route }, sessionId)
    await sleep(2600)
    await send(ws, 'Runtime.evaluate', {
      expression: `[...document.querySelectorAll('button')].find(b=>/I Agree/i.test(b.textContent))?.click()`,
    }, sessionId)
    await sleep(900)
    const { result } = await send(ws, 'Runtime.evaluate', { expression: PROBE, returnByValue: true }, sessionId)
    const d = JSON.parse(result.value)
    console.log(`\n=== ${route} ===`)
    console.log(`footer total: ${d.footer}px`)
    for (const p of d.parts) console.log(`   ${String(p.h).padStart(4)}px  ${p.txt}`)
    console.log(`undersized targets: ${d.small.length}`)
    for (const s of d.small) console.log(`   ${s.tag} ${s.w}x${s.h}  "${s.text}"  ${s.cls}`)
  }
  ws.close()
} finally {
  chrome.kill()
  try { rmSync(profile, { recursive: true, force: true }) } catch {}
}
