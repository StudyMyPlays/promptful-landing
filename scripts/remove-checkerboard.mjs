/**
 * Some image models "fake" transparency by painting a grey/white checkerboard
 * into the pixels. This keys it out:
 *   - flood-fills checker-like pixels (bright + neutral) connected to the top edge,
 *   - feathers the 1–2px fringe and pulls its colour toward the subject,
 *   - crops away the empty rows above the subject.
 *
 *   node scripts/remove-checkerboard.mjs <input> <output.png> [--pad 12]
 */
import sharp from 'sharp'

const [input, output, ...rest] = process.argv.slice(2)
if (!input || !output) {
  console.error('usage: remove-checkerboard.mjs <input> <output.png> [--pad N]')
  process.exit(1)
}
const pad = Number(rest[rest.indexOf('--pad') + 1]) || 12

const { data, info } = await sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true })
const { width: W, height: H } = info
const px = (i) => [data[i * 3], data[i * 3 + 1], data[i * 3 + 2]]
const isChecker = (i) => {
  const [r, g, b] = px(i)
  return Math.min(r, g, b) > 168 && Math.max(r, g, b) - Math.min(r, g, b) < 22
}

// Flood fill from every top-row checker pixel (4-connected)
const bg = new Uint8Array(W * H)
const stack = []
for (let x = 0; x < W; x++) if (isChecker(x)) (bg[x] = 1), stack.push(x)
while (stack.length) {
  const i = stack.pop()
  const x = i % W
  const y = (i - x) / W
  for (const [nx, ny] of [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]) {
    if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue
    const j = ny * W + nx
    if (!bg[j] && isChecker(j)) (bg[j] = 1), stack.push(j)
  }
}

// Distance (in px, up to 3) from the background, for the fringe
const dist = new Uint8Array(W * H).fill(255)
for (let i = 0; i < W * H; i++) if (bg[i]) dist[i] = 0
for (let pass = 1; pass <= 3; pass++) {
  for (let i = 0; i < W * H; i++) {
    if (dist[i] !== 255) continue
    const x = i % W
    const y = (i - x) / W
    for (const [nx, ny] of [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]) {
      if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue
      if (dist[ny * W + nx] === pass - 1) {
        dist[i] = pass
        break
      }
    }
  }
}

const out = Buffer.alloc(W * H * 4)
const rowOpaque = new Uint32Array(H)
for (let i = 0; i < W * H; i++) {
  let [r, g, b] = px(i)
  let a = 255
  const d = dist[i]
  if (d === 0) a = 0
  else if (d <= 2) {
    // fringe: likely blended with the light checker — fade it and darken it
    const lum = (r + g + b) / 3
    const k = d === 1 ? 0.45 : 0.8
    a = Math.round(255 * k * (lum > 150 ? 0.6 : 1))
    const f = lum > 120 ? 0.55 : 0.85
    r = Math.round(r * f)
    g = Math.round(g * f)
    b = Math.round(b * f)
  }
  out[i * 4] = r
  out[i * 4 + 1] = g
  out[i * 4 + 2] = b
  out[i * 4 + 3] = a
  if (a > 0) rowOpaque[Math.floor(i / W)]++
}

// first row where the subject actually starts (ignores stray specks)
let top = rowOpaque.findIndex((n) => n > W * 0.01)
if (top < 0) top = 0
const cropTop = Math.max(0, top - pad)
await sharp(out, { raw: { width: W, height: H, channels: 4 } })
  .extract({ left: 0, top: cropTop, width: W, height: H - cropTop })
  .png()
  .toFile(output)
console.log(`${input} → ${output}  ${W}×${H - cropTop} (cropped ${cropTop}px of background)`)
