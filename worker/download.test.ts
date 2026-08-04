import { createHmac } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { companionKeys, DEFAULT_RELEASE_KEY, handleBetaDownload, type Env } from './index'

const SECRET = 'test-download-secret'

const token = (signupId: number): string =>
  `${signupId}.${createHmac('sha256', SECRET).update(String(signupId)).digest('hex')}`

// Minimal R2 stand-in: only the keys handed in exist, and each returns a body
// plus the size/metadata surface handleBetaDownload actually touches.
function fakeBucket(objects: Record<string, string>) {
  return {
    async get(key: string) {
      const value = objects[key]
      if (value === undefined) return null
      return {
        body: value,
        size: value.length,
        httpEtag: `"${key}"`,
        httpMetadata: { contentType: key.endsWith('.zip') ? 'application/zip' : undefined },
        writeHttpMetadata: () => {},
      }
    },
  }
}

const fakeDb = {
  prepare: () => ({
    bind: () => ({
      run: async () => ({ success: true }),
      first: async () => ({ campaign_id: 'beta' }),
    }),
  }),
}

function env(objects: Record<string, string>, overrides: Partial<Env> = {}): Env {
  return {
    DB: fakeDb,
    BETA_RELEASES: fakeBucket(objects),
    DOWNLOAD_SECRET: SECRET,
    ...overrides,
  } as unknown as Env
}

const get = (query: string) => new Request(`https://kaleidoswap.com/dl?${query}`)

const companions = companionKeys(DEFAULT_RELEASE_KEY)
const bucket = {
  [DEFAULT_RELEASE_KEY]: 'zip-bytes',
  [companions.sha256]: `76a8d309  ${DEFAULT_RELEASE_KEY}\n`,
  [companions.asc]: '-----BEGIN PGP SIGNATURE-----\n',
}

describe('companionKeys', () => {
  it('derives the checksum and signature keys the release jobs upload', () => {
    expect(companions.sha256).toBe('kaleidoswap-extension-beta-latest.sha256')
    expect(companions.asc).toBe('kaleidoswap-extension-beta-latest.zip.asc')
  })

  it('follows a BETA_RELEASE_KEY override', () => {
    expect(companionKeys('kaleidoswap-extension-v0.2.0.zip')).toEqual({
      sha256: 'kaleidoswap-extension-v0.2.0.sha256',
      asc: 'kaleidoswap-extension-v0.2.0.zip.asc',
    })
  })
})

describe('handleBetaDownload', () => {
  it('serves the zip as an attachment for a valid token', async () => {
    const res = await handleBetaDownload(get(`t=${token(42)}`), env(bucket))
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toBe('application/zip')
    expect(res.headers.get('content-disposition')).toContain(DEFAULT_RELEASE_KEY)
    expect(res.headers.get('cache-control')).toBe('no-store')
  })

  it('serves the checksum inline as text', async () => {
    const res = await handleBetaDownload(get(`t=${token(42)}&file=sha256`), env(bucket))
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toBe('text/plain;charset=UTF-8')
    expect(res.headers.get('content-disposition')).toBeNull()
  })

  it('serves the detached signature inline as text', async () => {
    const res = await handleBetaDownload(get(`t=${token(42)}&file=asc`), env(bucket))
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toBe('text/plain;charset=UTF-8')
  })

  it('rejects an unknown file kind', async () => {
    const res = await handleBetaDownload(get(`t=${token(42)}&file=exe`), env(bucket))
    expect(res.status).toBe(400)
  })

  it('404s a missing companion instead of falling back to the zip', async () => {
    const res = await handleBetaDownload(
      get(`t=${token(42)}&file=asc`),
      env({ [DEFAULT_RELEASE_KEY]: 'zip-bytes' }, { FALLBACK_DOWNLOAD_URL: 'https://example.com/z' })
    )
    expect(res.status).toBe(404)
  })

  it('rejects a forged token', async () => {
    const res = await handleBetaDownload(get(`t=42.${'0'.repeat(64)}`), env(bucket))
    expect(res.status).toBe(403)
  })

  it('falls back when no secret is provisioned', async () => {
    const res = await handleBetaDownload(
      get(`t=${token(42)}`),
      env(bucket, { DOWNLOAD_SECRET: undefined, FALLBACK_DOWNLOAD_URL: 'https://example.com/z' })
    )
    expect(res.status).toBe(302)
  })
})
