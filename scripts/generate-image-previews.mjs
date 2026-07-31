/**
 * Generates lightweight WebP previews for the images displayed on the /media-kit page.
 *
 * The page renders these previews; the download buttons and the media-kit zip keep
 * serving the full-resolution originals, which journalists need for print.
 *
 * Previews use a "-preview.webp" suffix and sit next to their source, so a missing
 * or stale pair is easy to spot.
 *
 * Run manually after adding or replacing a source image:
 *   npm run images:previews
 */

import { existsSync, statSync } from 'fs'
import { join, dirname, extname, basename } from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = join(__dirname, '..', 'public')

const QUALITY = 82

// Mirrors src/constants/mediaKit.ts — kept in sync manually, same as generate-media-kit-zip.mjs.
// maxSize is the longest side of the preview, sized for the largest render on the page:
//   landscape screenshots -> 566x378 CSS px slot, 2x            = 1400 (long side)
//   portrait screenshot   -> 566x861 CSS px slot; 2x would need 1132px of width,
//                            more than the 738px source has, so it stays native.
const ENTRIES = [
  { src: 'images/desktop-app-screenshot-v3.png', maxSize: 1400 },
  { src: 'images/kaleidomind-screenshot.png', maxSize: 1400 },
  { src: 'images/extension-screenshot-v2.png', maxSize: 1430 },
]

const previewPathFor = (src) =>
  join(dirname(src), `${basename(src, extname(src))}-preview.webp`).replace(/\\/g, '/')

const missing = ENTRIES.filter((e) => !existsSync(join(PUBLIC, e.src)))
if (missing.length > 0) {
  console.error('image previews: missing source files:')
  missing.forEach((e) => console.error(`  - public/${e.src}`))
  process.exit(1)
}

let totalSrc = 0
let totalOut = 0

for (const entry of ENTRIES) {
  const srcPath = join(PUBLIC, entry.src)
  const outRel = previewPathFor(entry.src)
  const outPath = join(PUBLIC, outRel)

  const { width, height } = await sharp(srcPath).metadata()
  // Never upscale: a source smaller than the target stays at its own size.
  const fit = Math.max(width, height) <= entry.maxSize ? null : entry.maxSize

  const info = await sharp(srcPath)
    .resize(fit ? { width: fit, height: fit, fit: 'inside', withoutEnlargement: true } : undefined)
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(outPath)

  const srcKB = statSync(srcPath).size / 1024
  totalSrc += srcKB
  totalOut += info.size / 1024

  const note = fit ? '' : '  (sorgente già sotto il target, nessun resize)'
  console.log(
    `${outRel.padEnd(48)} ${String(`${info.width}x${info.height}`).padEnd(10)} ` +
      `${srcKB.toFixed(1)} KB -> ${(info.size / 1024).toFixed(1)} KB${note}`
  )
}

console.log(
  `\n${ENTRIES.length} preview generate — ${totalSrc.toFixed(1)} KB di originali -> ` +
    `${totalOut.toFixed(1)} KB serviti in pagina (-${(100 - (totalOut / totalSrc) * 100).toFixed(0)}%)`
)
