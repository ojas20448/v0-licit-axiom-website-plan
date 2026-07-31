/**
 * Captures phone-viewport screenshots of the running site, sliced into
 * screen-sized chunks so each is readable. Safe to delete.
 *
 * Usage: node scripts/shoot-mobile.mjs <baseUrl> <route> <outPrefix> [maxShots]
 */
import { spawn } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync, mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const BASE = process.argv[2] || 'http://localhost:3000'
const ROUTE = process.argv[3] || '/'
const PREFIX = process.argv[4] || 'shot'
const MAX = Number(process.argv[5] || 6)
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PORT = 9335
const W = 390, H = 844

mkdirSync('output/shots', { recursive: true })
const profile = mkdtempSync(join(tmpdir(), 'licit-shot-'))
const chrome = spawn(CHROME, [
  `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
  '--headless=new', '--no-first-run', '--no-default-browser-check',
  '--hide-scrollbars', 'about:blank',
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
      m.error ? reject(new Error(`${method}: ${m.error.message}`)) : resolve(m.result)
    }
    ws.addEventListener('message', onMsg)
    ws.send(JSON.stringify({ id, method, params, sessionId }))
  })
}

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
    { width: W, height: H, deviceScaleFactor: 2, mobile: true }, sessionId)

  await send(ws, 'Page.navigate', { url: BASE + ROUTE }, sessionId)
  await sleep(3000)
  await send(ws, 'Runtime.evaluate', {
    expression: `[...document.querySelectorAll('button')].find(b=>/I Agree/i.test(b.textContent))?.click()`,
  }, sessionId)
  await sleep(1200)

  const { result: hr } = await send(ws, 'Runtime.evaluate',
    { expression: 'document.documentElement.scrollHeight', returnByValue: true }, sessionId)
  const total = hr.value
  const shots = Math.min(MAX, Math.ceil(total / H))

  for (let i = 0; i < shots; i++) {
    const y = i * H
    await send(ws, 'Runtime.evaluate',
      { expression: `window.scrollTo(0, ${y})` }, sessionId)
    // Let lazy sections settle and scroll-triggered animations finish.
    await sleep(1100)
    const { data } = await send(ws, 'Page.captureScreenshot', { format: 'png' }, sessionId)
    const file = `output/shots/${PREFIX}-${String(i + 1).padStart(2, '0')}.png`
    writeFileSync(file, Buffer.from(data, 'base64'))
    console.log(`${file}  (y=${y})`)
  }
  console.log(`total ${total}px, ${shots} shots`)
  ws.close()
} finally {
  chrome.kill()
  try { rmSync(profile, { recursive: true, force: true }) } catch {}
}
