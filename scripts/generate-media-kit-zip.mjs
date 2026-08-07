/**
 * Generates public/media-kit/kaleidoswap-media-kit.zip from the source assets
 * referenced on the /media-kit page (logos, screenshots).
 * Run automatically via the "prebuild" npm script.
 */

import { createWriteStream, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import archiver from 'archiver'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const PUBLIC = join(ROOT, 'public')
const OUTPUT = join(PUBLIC, 'media-kit', 'kaleidoswap-media-kit.zip')

// Mirrors src/constants/mediaKit.ts — kept in sync manually, same as
// generate-sitemap.mjs's hardcoded route list.
const ENTRIES = [
  { src: 'logos/kaleidoswap-logos/kaleidoswap-full-logo-horizontal.svg', dest: 'logos/kaleidoswap-full-logo-horizontal.svg' },
  { src: 'logos/kaleidoswap-logos/kaleidoswap-full-logo-horizontal.png', dest: 'logos/kaleidoswap-full-logo-horizontal.png' },
  { src: 'logos/kaleidoswap-logos/kaleidoswap-full-logo-vertical.svg', dest: 'logos/kaleidoswap-full-logo-vertical.svg' },
  { src: 'logos/kaleidoswap-logos/kaleidoswap-full-logo-vertical.png', dest: 'logos/kaleidoswap-full-logo-vertical.png' },
  { src: 'logos/kaleidoswap-logos/kaleidoswap-pictogram.svg', dest: 'logos/kaleidoswap-pictogram.svg' },
  { src: 'logos/kaleidoswap-logos/kaleidoswap-pictogram.png', dest: 'logos/kaleidoswap-pictogram.png' },
  { src: 'logos/kaleidoswap-logos/kaleidoswap-logotype.svg', dest: 'logos/kaleidoswap-logotype.svg' },
  { src: 'logos/kaleidoswap-logos/kaleidoswap-logotype.png', dest: 'logos/kaleidoswap-logotype.png' },
  { src: 'images/product/desktop-app-screenshot-v3.png', dest: 'screenshots/desktop-app-screenshot.png' },
  { src: 'images/product/kaleidomind-screenshot.png', dest: 'screenshots/kaleidomind-screenshot.png' },
  { src: 'images/product/extension-screenshot-v2.png', dest: 'screenshots/extension-screenshot.png' },
]

const missing = ENTRIES.filter((e) => !existsSync(join(PUBLIC, e.src)))
if (missing.length > 0) {
  console.error('media-kit zip: missing source files:')
  missing.forEach((e) => console.error(`  - public/${e.src}`))
  process.exit(1)
}

const output = createWriteStream(OUTPUT)
const archive = archiver('zip', { zlib: { level: 9 } })

output.on('close', () => {
  console.log(`kaleidoswap-media-kit.zip written — ${ENTRIES.length} files, ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`)
})

archive.on('error', (err) => {
  throw err
})

archive.pipe(output)
for (const entry of ENTRIES) {
  archive.file(join(PUBLIC, entry.src), { name: entry.dest })
}
archive.finalize()
