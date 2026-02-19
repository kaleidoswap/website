#!/usr/bin/env node
/**
 * Translation Sync Script
 * Extracts translation keys from source files and syncs them to all locale JSON files
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync } from 'fs'
import { join, dirname, extname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const LOCALES_DIR = join(ROOT, 'public/locales')
const SRC_DIR = join(ROOT, 'src')

const LANGUAGES = ['en', 'es', 'it', 'zh', 'de', 'fr', 'ja']

// Patterns to extract t('...') and {t('...')} calls
const T_PATTERNS = [
  /\bt\(['"`]([^'"`]+)['"`](?:\s*,\s*\{[^}]*\})?\)/g,
  /\{t\(['"`]([^'"`]+)['"`](?:\s*,\s*\{[^}]*\})?\)\}/g,
]

function walkDir(dir, fileList = []) {
  const files = readdirSync(dir)
  for (const file of files) {
    const filePath = join(dir, file)
    const stat = statSync(filePath)
    if (stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.startsWith('.')) {
        walkDir(filePath, fileList)
      }
    } else {
      const ext = extname(file)
      if (['.tsx', '.ts', '.jsx', '.js'].includes(ext) && !file.includes('.test.') && !file.includes('.spec.')) {
        fileList.push(filePath)
      }
    }
  }
  return fileList
}

function extractKeysFromFile(filePath) {
  const content = readFileSync(filePath, 'utf-8')
  const keys = new Set()

  for (const pattern of T_PATTERNS) {
    let match
    const regex = new RegExp(pattern.source, pattern.flags)
    while ((match = regex.exec(content)) !== null) {
      keys.add(match[1])
    }
  }

  return keys
}

function extractAllKeys() {
  const files = walkDir(SRC_DIR)
  const allKeys = new Set()

  for (const filePath of files) {
    const keys = extractKeysFromFile(filePath)
    keys.forEach((key) => allKeys.add(key))
  }

  return Array.from(allKeys).sort()
}

function loadTranslations(lang) {
  const filePath = join(LOCALES_DIR, lang, 'translation.json')
  try {
    return JSON.parse(readFileSync(filePath, 'utf-8'))
  } catch {
    return {}
  }
}

function saveTranslations(lang, translations) {
  const dirPath = join(LOCALES_DIR, lang)
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true })
  }
  const filePath = join(dirPath, 'translation.json')
  writeFileSync(filePath, JSON.stringify(translations, null, 2) + '\n', 'utf-8')
}

function syncTranslations() {
  console.log('🔍 Extracting translation keys from source files...\n')

  const keys = extractAllKeys()
  console.log(`📝 Found ${keys.length} unique translation keys\n`)

  for (const lang of LANGUAGES) {
    const existing = loadTranslations(lang)
    const updated = {}
    let added = 0
    let removed = 0

    // Add all extracted keys
    for (const key of keys) {
      if (existing[key]) {
        updated[key] = existing[key]
      } else {
        // For English, use the key as the value
        // For other languages, mark as needing translation
        updated[key] = lang === 'en' ? key : `[TODO] ${key}`
        added++
      }
    }

    // Count removed keys
    for (const key of Object.keys(existing)) {
      if (!keys.includes(key)) {
        removed++
      }
    }

    saveTranslations(lang, updated)
    console.log(`✅ ${lang}: ${Object.keys(updated).length} keys (${added} added, ${removed} removed)`)
  }

  console.log('\n✨ Translation sync complete!')

  // Show sample of new keys
  const enTranslations = loadTranslations('en')
  const newKeys = Object.keys(enTranslations).slice(0, 10)
  console.log(`\n📋 Sample keys: ${newKeys.slice(0, 5).join(', ')}...`)
}

syncTranslations()
