#!/usr/bin/env node
/**
 * Blog audio narration generator.
 *
 * Converts blog post Markdown into a narrated MP3 via the ElevenLabs TTS API,
 * writes blog-audio/<slug>.mp3, uploads it to R2, and regenerates the typed
 * manifest at src/blog/lib/audio-manifest.ts that the app imports.
 *
 * Runs offline at authoring time — no API key or network is needed at build or
 * runtime. Unchanged posts are skipped (content-hashed) so re-runs are cheap.
 *
 * ElevenLabs bills per character, so the target set must be explicit and every
 * run prints its billable character count before calling the API.
 *
 * Usage:
 *   node scripts/gen-blog-audio.mjs introducing-rate  # these slugs only
 *   node scripts/gen-blog-audio.mjs --plan            # dry run: costs, bills nothing
 *   node scripts/gen-blog-audio.mjs --all             # every missing or stale post
 *   node scripts/gen-blog-audio.mjs --all --force     # re-narrate everything
 *
 * The hash covers model + voice ID + narration text, so switching voice or
 * model correctly invalidates every post.
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
// Gitignored local cache. The MP3s are far too large to commit and are NOT
// part of the asset bundle — production streams them from R2 via the Worker
// (see worker/index.ts). Keep this outside public/ so Vite cannot copy them
// into dist/ and silently reintroduce them to the deploy.
const AUDIO_DIR = join(ROOT, 'blog-audio')
const R2_BUCKET = 'kaleidoswap-blog-audio'
const MANIFEST_TS = join(ROOT, 'src/blog/lib/audio-manifest.ts')
const ENV_FILE = join(ROOT, '..', '.env')

const API = 'https://api.elevenlabs.io/v1'
const MODEL = 'eleven_v3'
const OUTPUT_FORMAT = 'mp3_44100_128'
// Pinned by ID, not by name. The names the /voices endpoint returns are full
// display strings ("Brian - Deep, Resonant..."), so matching on a bare first
// name silently fell through to voices[0] and narrated everything in whichever
// voice happened to sort first.
const VOICE_ID = 'nPczCjzI2devNBz1zQrb'
const VOICE_LABEL = 'Brian'
// eleven_v3 caps a request at 5000 chars and does NOT support previous_text /
// next_text, so there is no prosody carry-over across a seam. Chunk as large as
// the cap safely allows: fewer requests means fewer seams to hear.
const MAX_CHUNK = 4500
const SUPPORTS_STITCHING = MODEL !== 'eleven_v3'
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

/** Confirm the pinned voice is actually on this account — fail loudly rather than substituting one. */
async function resolveVoiceId(key) {
  const res = await fetch(`${API}/voices`, { headers: { 'xi-api-key': key } })
  if (!res.ok) throw new Error(`GET /voices -> ${res.status}`)
  const { voices = [] } = await res.json()
  const match = voices.find((v) => v.voice_id === VOICE_ID)
  if (!match) {
    throw new Error(
      `voice ${VOICE_ID} (${VOICE_LABEL}) is not available on this account. ` +
        `Available: ${voices.map((v) => `${v.name} [${v.voice_id}]`).join(', ')}`
    )
  }
  return match.voice_id
}

async function tts(key, voiceId, text, prev, next) {
  const res = await fetch(`${API}/text-to-speech/${voiceId}?output_format=${OUTPUT_FORMAT}`, {
    method: 'POST',
    headers: { 'xi-api-key': key, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text,
      model_id: MODEL,
      voice_settings: VOICE_SETTINGS,
      // Request stitching for prosody continuity across chunk seams. Rejected
      // outright by eleven_v3 ("not yet supported"), so only send it on models
      // that accept it.
      ...(SUPPORTS_STITCHING
        ? { previous_text: prev || undefined, next_text: next || undefined }
        : {}),
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

/** Upload one MP3 to R2. Wrangler resolves auth the usual way (CLOUDFLARE_API_TOKEN or `wrangler login`). */
function uploadToR2(slug, filePath) {
  try {
    execFileSync(
      'npx',
      [
        'wrangler',
        'r2',
        'object',
        'put',
        `${R2_BUCKET}/${slug}.mp3`,
        '--file',
        filePath,
        '--content-type',
        'audio/mpeg',
        '--remote',
      ],
      { stdio: 'pipe' }
    )
    return true
  } catch (err) {
    const detail = (err.stderr?.toString() || err.message).trim().split('\n').slice(-3).join('\n')
    console.warn(`  ⚠ R2 upload failed for ${slug}:\n    ${detail}`)
    console.warn(`    Audio is cached locally; re-run \`npm run blog:audio:push\` once wrangler can authenticate.`)
    return false
  }
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
  const all = argv.includes('--all')
  const dryRun = argv.includes('--plan')
  const only = argv.filter((a) => !a.startsWith('--'))

  // ElevenLabs bills per character, so a bare `npm run blog:audio` narrating
  // every post in the directory is an expensive accident. Require an explicit
  // slug list or --all.
  if (!only.length && !all && !dryRun) {
    console.error(
      'Refusing to narrate every post implicitly — this bills per character.\n' +
        '  npm run blog:audio <slug> [<slug>…]   narrate specific posts\n' +
        '  npm run blog:audio -- --all           narrate every post missing or stale\n' +
        'Add --force to re-narrate posts whose text has not changed.'
    )
    process.exit(1)
  }

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

  // Resolve the whole work list up front so the run's cost is visible before a
  // single character is billed, rather than discovered from the log afterwards.
  const plan = files.map((file) => {
    const raw = readFileSync(join(POSTS_DIR, file), 'utf-8')
    const { attributes, body } = fm(raw)
    const slug = attributes.slug || basename(file, '.md')
    const narration = mdToNarration(attributes.title || slug, body)
    // Hash the voice actually used, not the one we asked for — the old version
    // keyed on a preference name that never matched, so the manifest recorded a
    // voice the audio was not rendered in and voice changes never invalidated.
    const hash = createHash('sha1').update(`${MODEL}|${VOICE_ID}|${narration}`).digest('hex').slice(0, 12)
    const outPath = join(AUDIO_DIR, `${slug}.mp3`)
    const stale = force || manifest[slug]?.hash !== hash || !existsSync(outPath)
    return { slug, narration, hash, outPath, stale }
  })

  const todo = plan.filter((p) => p.stale)
  const skipped = plan.length - todo.length
  const chars = todo.reduce((n, p) => n + p.narration.length, 0)

  if (dryRun) {
    for (const p of [...plan].sort((a, b) => b.narration.length - a.narration.length)) {
      console.log(`${p.stale ? 'NARRATE' : 'skip   '} ${p.narration.length.toString().padStart(6)} chars  ${p.slug}`)
    }
    console.log(
      `\ntotal  ${plan.length} posts, ${plan.reduce((n, p) => n + p.narration.length, 0).toLocaleString()} chars` +
        `\nthis run would bill ${chars.toLocaleString()} chars across ${todo.length} post(s)`
    )
    return
  }

  console.log(
    `plan   ${todo.length} to narrate, ${skipped} unchanged — ${chars.toLocaleString()} billable chars` +
      `\n       ${todo.map((p) => p.slug).join(', ') || '(nothing to do)'}\n`
  )
  if (!todo.length) return

  for (const { slug, narration, hash, outPath } of todo) {
    if (!voiceId) {
      voiceId = await resolveVoiceId(key)
      console.log(`voice  ${VOICE_LABEL} (${voiceId})   model ${MODEL}\n`)
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
    console.log(`write  blog-audio/${slug}.mp3 (${(bytes / 1024).toFixed(0)} KB)`)
    if (uploadToR2(slug, outPath)) console.log(`upload r2://${R2_BUCKET}/${slug}.mp3`)
    console.log()
  }

  writeManifest(manifest)
  console.log(`manifest → src/blog/lib/audio-manifest.ts (${Object.keys(manifest).length} entr${Object.keys(manifest).length === 1 ? 'y' : 'ies'})`)
}

main().catch((err) => {
  console.error(`\n✗ ${err.message}`)
  process.exit(1)
})
