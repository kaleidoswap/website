#!/usr/bin/env node
/**
 * Sync blog narration MP3s between the gitignored local cache (blog-audio/)
 * and the R2 bucket that serves them in production.
 *
 * The audio is not in git — it is ~31 MB and grows with every narrated post —
 * so a fresh clone has an empty cache and needs `pull` before the dev server
 * can play anything.
 *
 *   node scripts/sync-blog-audio.mjs pull [slug]   # R2 -> blog-audio/
 *   node scripts/sync-blog-audio.mjs push [slug]   # blog-audio/ -> R2
 *
 * Neither direction calls ElevenLabs, so neither costs anything. Use
 * `npm run blog:audio` only when a post's text has actually changed.
 */
import { readFileSync, existsSync, mkdirSync, statSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { execFileSync } from 'child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const AUDIO_DIR = join(ROOT, 'blog-audio')
const MANIFEST_TS = join(ROOT, 'src/blog/lib/audio-manifest.ts')
const R2_BUCKET = 'kaleidoswap-blog-audio'

function manifestSlugs() {
  const src = readFileSync(MANIFEST_TS, 'utf-8')
  return [...src.matchAll(/^ {2}"([a-z0-9-]+)":/gm)].map((m) => m[1])
}

function wrangler(args) {
  execFileSync('npx', ['wrangler', ...args], { stdio: 'pipe' })
}

function main() {
  const [direction, only] = process.argv.slice(2)
  if (direction !== 'pull' && direction !== 'push') {
    console.error('usage: sync-blog-audio.mjs <pull|push> [slug]')
    process.exit(1)
  }

  const slugs = manifestSlugs().filter((s) => !only || s === only)
  if (!slugs.length) {
    console.error(only ? `No manifest entry for "${only}".` : 'Manifest is empty.')
    process.exit(1)
  }

  mkdirSync(AUDIO_DIR, { recursive: true })
  let failed = 0

  for (const slug of slugs) {
    const file = join(AUDIO_DIR, `${slug}.mp3`)
    const key = `${R2_BUCKET}/${slug}.mp3`
    try {
      if (direction === 'pull') {
        if (existsSync(file)) {
          console.log(`skip   ${slug} (already cached)`)
          continue
        }
        wrangler(['r2', 'object', 'get', key, '--file', file, '--remote'])
        console.log(`pull   ${slug}.mp3 (${(statSync(file).size / 1024).toFixed(0)} KB)`)
      } else {
        if (!existsSync(file)) {
          console.warn(`miss   ${slug}.mp3 not in blog-audio/ — skipping`)
          continue
        }
        wrangler([
          'r2', 'object', 'put', key,
          '--file', file,
          '--content-type', 'audio/mpeg',
          '--remote',
        ])
        console.log(`push   ${slug}.mp3 (${(statSync(file).size / 1024).toFixed(0)} KB)`)
      }
    } catch (err) {
      failed++
      const detail = (err.stderr?.toString() || err.message).trim().split('\n').slice(-3).join('\n')
      console.error(`✗ ${slug}:\n  ${detail}`)
    }
  }

  if (failed) {
    console.error(`\n${failed} of ${slugs.length} failed. Check wrangler auth (CLOUDFLARE_API_TOKEN or \`wrangler login\`).`)
    process.exit(1)
  }
  console.log(`\n${direction} complete — ${slugs.length} file(s).`)
}

main()
