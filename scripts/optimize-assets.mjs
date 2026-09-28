/**
 * Optimise generated artwork.
 *
 *   1. Drop the raw fal.ai downloads into public/images/src/ named after the
 *      manifest key, e.g. hero-sky.png, hero-foreground.png, media-neon-rain.png
 *      (see docs/ASSET_PROMPTS.md for the full list).
 *   2. pnpm assets:optimize
 *   3. Flip `ready: true` for that entry in lib/assets.ts.
 *
 * Outputs a WebP next to the manifest `src` (alpha preserved), capped at the
 * manifest width — Next/Image handles responsive sizes from there.
 */
import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SRC = 'public/images/src'
const OUT = 'public/images'
const MAX = { 'hero-': 2560, 'showcase-': 2560, 'cta-': 2560, 'media-': 1600 }

const files = (await readdir(SRC).catch(() => [])).filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
if (!files.length) {
  console.log(`No source images found in ${SRC}.`)
  process.exit(0)
}

for (const file of files) {
  const name = path.parse(file).name
  const max = Object.entries(MAX).find(([p]) => name.startsWith(p))?.[1] ?? 1600
  const input = path.join(SRC, file)
  const output = path.join(OUT, `${name}.webp`)
  const img = sharp(input)
  const meta = await img.metadata()
  await img
    .resize({ width: Math.min(max, meta.width ?? max), withoutEnlargement: true })
    .webp({ quality: meta.hasAlpha ? 86 : 80, alphaQuality: 90, effort: 6, smartSubsample: true })
    .toFile(output)
  const { size } = await stat(output)
  console.log(`${file} → ${output}  ${meta.width}×${meta.height}${meta.hasAlpha ? ' (alpha)' : ''}  ${(size / 1024).toFixed(0)} KB`)
}
