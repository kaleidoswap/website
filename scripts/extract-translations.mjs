#!/usr/bin/env node
/**
 * Script to extract translations from resources.ts to separate JSON files
 * Run with: node scripts/extract-translations.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, '..')

const locales = ['en', 'es', 'it', 'zh', 'de', 'fr', 'ja']
const resourcesPath = join(projectRoot, 'src/i18n/resources.ts')
const outputDir = join(projectRoot, 'public/locales')

// Read the resources.ts file
const content = readFileSync(resourcesPath, 'utf-8')

// Extract the baseTranslations array using regex
const arrayMatch = content.match(/const baseTranslations:\s*LocalizedString\[\]\s*=\s*\[([\s\S]*?)\n\]/)
if (!arrayMatch) {
  console.error('Could not find baseTranslations array')
  process.exit(1)
}

const arrayContent = arrayMatch[1]

// Parse individual translation entries
const entries = []
const entryRegex = /\{\s*key:\s*['"`]((?:[^'"`\\]|\\.)*)['"`]([^}]*)\}/g

let match
while ((match = entryRegex.exec(arrayContent)) !== null) {
  const key = match[1].replace(/\\'/g, "'").replace(/\\"/g, '"')
  const propsContent = match[2]

  const entry = { key }

  // Extract each locale's translation
  for (const locale of locales.filter(l => l !== 'en')) {
    const localeRegex = new RegExp(`${locale}:\\s*['"\`]((?:[^'"\`\\\\]|\\\\.)*)['"\`]`, 's')
    const localeMatch = propsContent.match(localeRegex)
    if (localeMatch) {
      entry[locale] = localeMatch[1]
        .replace(/\\'/g, "'")
        .replace(/\\"/g, '"')
        .replace(/\\n/g, '\n')
    }
  }

  entries.push(entry)
}

console.log(`Found ${entries.length} translation entries`)

// Create output directories and JSON files for each locale
for (const locale of locales) {
  const localeDir = join(outputDir, locale)

  if (!existsSync(localeDir)) {
    mkdirSync(localeDir, { recursive: true })
  }

  // Build translation object
  const translations = {}
  for (const entry of entries) {
    if (locale === 'en') {
      // For English, key is the value
      translations[entry.key] = entry.key
    } else {
      // For other locales, use translation or fallback to key
      translations[entry.key] = entry[locale] || entry.key
    }
  }

  const outputPath = join(localeDir, 'translation.json')
  writeFileSync(outputPath, JSON.stringify(translations, null, 2), 'utf-8')
  console.log(`Created ${outputPath} with ${Object.keys(translations).length} entries`)
}

console.log('\nDone! Translation files created in public/locales/')
console.log('You can now update src/i18n/index.ts to use i18next-http-backend')
