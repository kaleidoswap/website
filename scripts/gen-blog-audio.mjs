#!/usr/bin/env node
/**
 * Blog audio narration generator.
 *
 * Converts blog post Markdown into a narrated MP3 via the ElevenLabs TTS API,
 * writes public/blog/audio/<slug>.mp3, and regenerates the typed manifest at
 * src/blog/lib/audio-manifest.ts that the app imports.
 *
 * Runs offline at authoring time — no API key or network is needed at build or
 * runtime. Unchanged posts are skipped (content-hashed) so re-runs are cheap.
 *
 * Usage:
 *   node scripts/gen-blog-audio.mjs                   # all posts, skip unchanged
 *   node scripts/gen-blog-audio.mjs introducing-rate  # only this slug
 *   node scripts/gen-blog-audio.mjs --force           # regenerate everything
 *
 * Requires ELEVENLABS_API_KEY in the environment or the repo-root .env.
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync, rmSync, statSync } from 'fs'
import { join, dirname, basename } from 'path'
import { fileURLToPath } from 'url'
import { createHash } from 'crypto'
import { execFileSync } from 'child_process'
import fm from 'front-matter'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const POSTS_DIR = join(ROOT, 'src/blog/posts')
const AUDIO_DIR = join(ROOT, 'public/blog/audio')
const MANIFEST_TS = join(ROOT, 'src/blog/lib/audio-manifest.ts')
const ENV_FILE = join(ROOT, '..', '.env')

const API = 'https://api.elevenlabs.io/v1'
const MODEL = 'eleven_multilingual_v2'
const OUTPUT_FORMAT = 'mp3_44100_128'
const VOICE_PREFERENCE = ['George', 'Daniel', 'Brian', 'Adam']
const MAX_CHUNK = 2200 // chars/request (model cap is 10k; stay low for latency + retries)
const VOICE_SETTINGS = { stability: 0.5, similarity_boost: 0.75, style: 0.0, speed: 1.03 }
const AUDIO_BITRATE = '64k' // mono voice — transparent at 64k, ~half the size of 128k stereo

function loadApiKey() {
  if (process.env.ELEVENLABS_API_KEY) return process.env.ELEVENLABS_API_KEY.trim()
  try {
    const m = readFileSync(ENV_FILE, 'utf-8').match(/^ELEVENLABS_API_KEY=(.+)$/m)
    if (m) return m[1].trim()
  } catch {
    /* fall through */
  }
  throw new Error('ELEVENLABS_API_KEY not set (export it or add it to the repo-root .env)')
}

/** Flatten Markdown to clean, speakable prose. */
function mdToNarration(title, body) {
  let t = body
  t = t.replace(/```[\s\S]*?```/g, ' ') // fenced code blocks
  t = t.replace(/`([^`]+)`/g, '$1') // inline code
  t = t.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
  t = t.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links -> text
  t = t.replace(/^\s{0,3}>\s?/gm, '') // blockquotes
  t = t.replace(/^\s*#{1,6}\s+(.*)$/gm, (_, h) => h.trim().replace(/[.:]?\s*$/, '.')) // headings -> sentence
  t = t.replace(/^\s*[-*+]\s+/gm, '') // bullets
  t = t.replace(/^\s*\d+\.\s+/gm, '') // ordered lists
  t = t.replace(/^\s*\|(.*)\|\s*$/gm, (_, row) => row.replace(/\|/g, ', ').trim()) // table rows
  t = t.replace(/^[-*_]{3,}\s*$/gm, '') // horizontal rules
  t = t.replace(/(\*\*|__|\*|_|~~)/g, '') // emphasis markers
  t = t.replace(/<!--[\s\S]*?-->/g, ' ') // html comments
  t = t.replace(/<[^>]+>/g, ' ') // html tags
  t = t.replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}\u{FE0F}]/gu, '') // emoji/symbols
  t = t.replace(/[ \t]+/g, ' ')
  t = t.replace(/ ?\n ?/g, '\n')
  t = t.replace(/\n{3,}/g, '\n\n')
  t = t.trim()
  return `${title.trim().replace(/[.:]?\s*$/, '.')}\n\n${t}`
}

/** Split narration into <= MAX_CHUNK char chunks on paragraph, then sentence, boundaries. */
function chunkText(text, max = MAX_CHUNK) {
  const paras = text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean)
  const chunks = []
  let cur = ''
  const push = () => {
    if (cur.trim()) chunks.push(cur.trim())
    cur = ''
  }
  for (const p of paras) {
    if (p.length > max) {
      push()
      const sentences = p.match(/[^.!?]+[.!?]+(?:\s|$)|\S[\s\S]*$/g) || [p]
      for (const s of sentences) {
        if ((cur + ' ' + s).trim().length > max) push()
        cur = cur ? `${cur} ${s.trim()}` : s.trim()
      }
      push()
    } else if ((cur + '\n\n' + p).length > max) {
      push()
      cur = p
    } else {
      cur = cur ? `${cur}\n\n${p}` : p
    }
  }
  push()
  return chunks
}

async function resolveVoiceId(key) {
  const res = await fetch(`${API}/voices`, { headers: { 'xi-api-key': key } })
  if (!res.ok) throw new Error(`GET /voices -> ${res.status}`)
  const { voices = [] } = await res.json()
  const byName = new Map(voices.map((v) => [v.name, v.voice_id]))
  for (const p of VOICE_PREFERENCE) if (byName.has(p)) return byName.get(p)
  if (!voices.length) throw new Error('no voices available on this account')
  return voices[0].voice_id
}

async function tts(key, voiceId, text, prev, next) {
  const res = await fetch(`${API}/text-to-speech/${voiceId}?output_format=${OUTPUT_FORMAT}`, {
    method: 'POST',
    headers: { 'xi-api-key': key, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text,
      model_id: MODEL,
      voice_settings: VOICE_SETTINGS,
      previous_text: prev || undefined, // prosody continuity across chunk seams
      next_text: next || undefined,
    }),
  })
  if (!res.ok) throw new Error(`POST /text-to-speech -> ${res.status}: ${await res.text()}`)
  return Buffer.from(await res.arrayBuffer())
}

/**
 * Re-encode the concatenated chunk MP3s into a single clean mono stream at
 * AUDIO_BITRATE. Returns the final byte size. Falls back to the raw concatenated
 * bytes (still playable) if ffmpeg is unavailable.
 */
function encodeMono(buffer, outPath) {
  const tmp = `${outPath}.raw`
  writeFileSync(tmp, buffer)
  try {
    execFileSync(
      'ffmpeg',
      ['-y', '-loglevel', 'error', '-i', tmp, '-ac', '1', '-b:a', AUDIO_BITRATE, outPath],
      { stdio: ['ignore', 'ignore', 'ignore'] }
    )
  } catch {
    console.warn('  (ffmpeg not available — keeping raw 128k mp3; install ffmpeg for smaller mono files)')
    writeFileSync(outPath, buffer)
  } finally {
    rmSync(tmp, { force: true })
  }
  return statSync(outPath).size
}

function loadManifest() {
  try {
    const m = readFileSync(MANIFEST_TS, 'utf-8').match(/audioManifest\s*=\s*(\{[\s\S]*\})\s*as const/)
    if (m) return JSON.parse(m[1])
  } catch {
    /* first run */
  }
  return {}
}

function writeManifest(manifest) {
  const sorted = Object.fromEntries(Object.keys(manifest).sort().map((k) => [k, manifest[k]]))
  const ts =
    '// AUTO-GENERATED by scripts/gen-blog-audio.mjs — do not edit by hand.\n' +
    '// Run `npm run blog:audio` to (re)generate narration audio + this file.\n' +
    'export type BlogAudioEntry = { src: string; hash: string; bytes: number }\n' +
    `export const audioManifest = ${JSON.stringify(sorted, null, 2)} as const satisfies Record<string, BlogAudioEntry>\n`
  writeFileSync(MANIFEST_TS, ts)
}

async function main() {
  const argv = process.argv.slice(2)
  const force = argv.includes('--force')
  const only = argv.filter((a) => !a.startsWith('--'))

  const files = readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .filter((f) => only.length === 0 || only.includes(basename(f, '.md')))

  if (!files.length) {
    console.error(only.length ? `No matching post(s): ${only.join(', ')}` : 'No posts found.')
    process.exit(1)
  }

  const key = loadApiKey()
  mkdirSync(AUDIO_DIR, { recursive: true })
  const manifest = loadManifest()
  let voiceId

  for (const file of files) {
    const raw = readFileSync(join(POSTS_DIR, file), 'utf-8')
    const { attributes, body } = fm(raw)
    const slug = attributes.slug || basename(file, '.md')
    const narration = mdToNarration(attributes.title || slug, body)
    const hash = createHash('sha1').update(`${MODEL}|${VOICE_PREFERENCE[0]}|${narration}`).digest('hex').slice(0, 12)
    const outPath = join(AUDIO_DIR, `${slug}.mp3`)

    if (!force && manifest[slug]?.hash === hash && existsSync(outPath)) {
      console.log(`skip   ${slug} (unchanged)`)
      continue
    }

    if (!voiceId) {
      voiceId = await resolveVoiceId(key)
      console.log(`voice  ${voiceId}   model ${MODEL}\n`)
    }

    const chunks = chunkText(narration)
    console.log(`gen    ${slug} — ${narration.length} chars in ${chunks.length} chunk(s)`)
    const buffers = []
    for (let i = 0; i < chunks.length; i++) {
      process.stdout.write(`  [${i + 1}/${chunks.length}] ${chunks[i].length}c … `)
      buffers.push(await tts(key, voiceId, chunks[i], chunks[i - 1], chunks[i + 1]))
      console.log('ok')
    }

    const bytes = encodeMono(Buffer.concat(buffers), outPath)
    manifest[slug] = { src: `/blog/audio/${slug}.mp3`, hash, bytes }
    console.log(`write  public/blog/audio/${slug}.mp3 (${(bytes / 1024).toFixed(0)} KB)\n`)
  }

  writeManifest(manifest)
  console.log(`manifest → src/blog/lib/audio-manifest.ts (${Object.keys(manifest).length} entr${Object.keys(manifest).length === 1 ? 'y' : 'ies'})`)
}

main().catch((err) => {
  console.error(`\n✗ ${err.message}`)
  process.exit(1)
})
