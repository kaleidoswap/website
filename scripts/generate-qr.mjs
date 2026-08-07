/**
 * Generates the QR code that points to a digital business card
 * (https://kaleidoswap.com/contact/<slug>), ready to print on a physical
 * business card.
 *
 * Usage:
 *   node scripts/generate-qr.mjs <slug> [--url <full-url>] [--out <dir>]
 *
 * Example:
 *   node scripts/generate-qr.mjs nome-cognome
 *   -> public/qrcodes/nome-cognome.png (1000x1000, print-ready)
 *   -> public/qrcodes/nome-cognome.svg (vector, best for professional print)
 */

import QRCode from 'qrcode'
import { mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SITE_URL = 'https://kaleidoswap.com'

const args = process.argv.slice(2)
const slug = args.find((a) => !a.startsWith('--'))
if (!slug) {
  console.error('Usage: node scripts/generate-qr.mjs <slug> [--url <full-url>] [--out <dir>]')
  process.exit(1)
}

const urlFlagIndex = args.indexOf('--url')
const url = urlFlagIndex !== -1 ? args[urlFlagIndex + 1] : `${SITE_URL}/contact/${slug}`

const outFlagIndex = args.indexOf('--out')
const outDir = outFlagIndex !== -1 ? join(ROOT, args[outFlagIndex + 1]) : join(ROOT, 'public', 'qrcodes')

mkdirSync(outDir, { recursive: true })

const pngPath = join(outDir, `${slug}.png`)
const svgPath = join(outDir, `${slug}.svg`)

// Plain black-on-white: a business card is printed small (often under 2cm
// square), and a colored/low-contrast code fails to scan more often at that
// size — reliability matters more than matching the brand accent here.
const qrOptions = {
  margin: 2,
  errorCorrectionLevel: 'M',
  color: { dark: '#000000', light: '#FFFFFF' },
}

await QRCode.toFile(pngPath, url, { ...qrOptions, type: 'png', width: 1000 })
await QRCode.toFile(svgPath, url, { ...qrOptions, type: 'svg' })

console.log(`QR code for ${url}`)
console.log(`  PNG: ${pngPath}`)
console.log(`  SVG: ${svgPath}`)
