import { createHmac } from 'node:crypto'
import { describe, expect, it, vi } from 'vitest'
import {
  EMAIL_EVENT_TYPES,
  handleEmailWebhook,
  handleUnsubscribe,
  normalizeEmail,
  unsubscribeToken,
  verifyUnsubscribeToken,
  verifyWebhookSignature,
  type EmailEnv,
} from './email'

// Minimal D1 stand-in: records every statement plus its bound parameters, and
// replays canned rows for .first().
interface Executed {
  sql: string
  params: unknown[]
}

function fakeDb(firstRow: unknown = null) {
  const executed: Executed[] = []
  const db = {
    prepare(sql: string) {
      return {
        bind(...params: unknown[]) {
          return {
            run: async () => {
              executed.push({ sql, params })
              return { success: true }
            },
            first: async () => {
              executed.push({ sql, params })
              return firstRow
            },
          }
        },
      }
    },
  }
  return { db: db as unknown as D1Database, executed }
}

const SECRET = 'unsubscribe-test-secret'

describe('unsubscribe tokens', () => {
  it('matches the mailer recipe: first 32 hex chars of HMAC-SHA256 over the lowercased address', async () => {
    const email = 'Someone@Example.com'
    const expected = createHmac('sha256', SECRET)
      .update(normalizeEmail(email))
      .digest('hex')
      .slice(0, 32)
    expect(await unsubscribeToken(email, SECRET)).toBe(expected)
    expect(expected).toHaveLength(32)
  })

  it('is case- and whitespace-insensitive on the address', async () => {
    expect(await unsubscribeToken('  USER@Example.com ', SECRET)).toBe(
      await unsubscribeToken('user@example.com', SECRET)
    )
  })

  it('accepts a token minted with the same secret and rejects everything else', async () => {
    const email = 'user@example.com'
    const token = await unsubscribeToken(email, SECRET)
    expect(await verifyUnsubscribeToken(email, token, SECRET)).toBe(true)
    expect(await verifyUnsubscribeToken(email, token, 'other-secret')).toBe(false)
    expect(await verifyUnsubscribeToken('other@example.com', token, SECRET)).toBe(false)
    expect(await verifyUnsubscribeToken(email, '', SECRET)).toBe(false)
    expect(await verifyUnsubscribeToken(email, token.slice(0, 31), SECRET)).toBe(false)
    expect(await verifyUnsubscribeToken(email, token.toUpperCase(), SECRET)).toBe(false)
  })
})

describe('GET /unsubscribe', () => {
  const url = async (email: string, secret = SECRET) =>
    `https://example.com/unsubscribe?email=${encodeURIComponent(email)}&token=${await unsubscribeToken(email, secret)}`

  it('records the opt-out and confirms with an HTML page', async () => {
    const { db, executed } = fakeDb()
    const env: EmailEnv = { DB: db, UNSUBSCRIBE_SECRET: SECRET }
    const res = await handleUnsubscribe(new Request(await url('User@Example.com')), env)

    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toContain('text/html')
    await expect(res.text()).resolves.toContain('user@example.com')
    expect(executed).toHaveLength(1)
    expect(executed[0].sql).toContain('INSERT OR IGNORE INTO unsubscribes')
    expect(executed[0].params).toEqual(['user@example.com', 'link'])
  })

  it('answers 400 and stores nothing for a bad, missing or foreign token', async () => {
    const cases = [
      'https://example.com/unsubscribe',
      'https://example.com/unsubscribe?email=user@example.com',
      'https://example.com/unsubscribe?email=user@example.com&token=deadbeef',
      await url('user@example.com', 'a-different-secret'),
    ]
    for (const target of cases) {
      const { db, executed } = fakeDb()
      const res = await handleUnsubscribe(new Request(target), { DB: db, UNSUBSCRIBE_SECRET: SECRET })
      expect(res.status).toBe(400)
      await expect(res.text()).resolves.toContain('invalid or has expired')
      expect(executed).toHaveLength(0)
    }
  })

  it('escapes the address it echoes back', async () => {
    const { db } = fakeDb()
    const evil = '<script>@example.com'
    const res = await handleUnsubscribe(
      new Request(await url(evil)),
      { DB: db, UNSUBSCRIBE_SECRET: SECRET }
    )
    const body = await res.text()
    expect(body).not.toContain('<script>')
    expect(body).toContain('&lt;script&gt;')
  })

  it('answers 503 when no signing secret is configured', async () => {
    const { db, executed } = fakeDb()
    const res = await handleUnsubscribe(new Request('https://example.com/unsubscribe'), { DB: db })
    expect(res.status).toBe(503)
    expect(executed).toHaveLength(0)
  })

  it('serves the one-click POST path as JSON', async () => {
    const { db, executed } = fakeDb()
    const env: EmailEnv = { DB: db, UNSUBSCRIBE_SECRET: SECRET }
    const target = await url('user@example.com')

    const ok = await handleUnsubscribe(new Request(target, { method: 'POST' }), env)
    expect(ok.status).toBe(200)
    await expect(ok.json()).resolves.toEqual({ ok: true })
    expect(executed).toHaveLength(1)

    const bad = await handleUnsubscribe(
      new Request('https://example.com/unsubscribe?email=user@example.com&token=x', { method: 'POST' }),
      env
    )
    expect(bad.status).toBe(400)
    await expect(bad.json()).resolves.toEqual({ error: 'invalid' })
  })

  it('rejects other methods', async () => {
    const { db } = fakeDb()
    const res = await handleUnsubscribe(
      new Request('https://example.com/unsubscribe', { method: 'DELETE' }),
      { DB: db, UNSUBSCRIBE_SECRET: SECRET }
    )
    expect(res.status).toBe(405)
  })
})

// Signs a payload exactly the way the provider does, so the verifier is tested
// against an independent implementation rather than itself.
const WEBHOOK_SECRET = `whsec_${Buffer.from('webhook-signing-key').toString('base64')}`

function sign(payload: string, id: string, timestamp: string, secret = WEBHOOK_SECRET): string {
  const key = Buffer.from(secret.replace(/^whsec_/, ''), 'base64')
  return `v1,${createHmac('sha256', key).update(`${id}.${timestamp}.${payload}`).digest('base64')}`
}

describe('webhook signature verification', () => {
  const payload = '{"type":"email.delivered"}'
  const id = 'msg_123'
  const now = 1_700_000_000
  const ts = String(now)

  it('accepts a correctly signed delivery', async () => {
    const headers = { id, timestamp: ts, signature: sign(payload, id, ts) }
    expect(await verifyWebhookSignature(WEBHOOK_SECRET, headers, payload, now)).toBe(true)
  })

  it('accepts when any of several space-separated v1 entries matches', async () => {
    const signature = `v1,${Buffer.from('nope').toString('base64')} ${sign(payload, id, ts)}`
    expect(await verifyWebhookSignature(WEBHOOK_SECRET, { id, timestamp: ts, signature }, payload, now)).toBe(true)
  })

  it('ignores entries of an unknown version', async () => {
    const signature = sign(payload, id, ts).replace('v1,', 'v2,')
    expect(await verifyWebhookSignature(WEBHOOK_SECRET, { id, timestamp: ts, signature }, payload, now)).toBe(false)
  })

  it('rejects a tampered payload, id or timestamp', async () => {
    const signature = sign(payload, id, ts)
    expect(await verifyWebhookSignature(WEBHOOK_SECRET, { id, timestamp: ts, signature }, `${payload} `, now)).toBe(false)
    expect(await verifyWebhookSignature(WEBHOOK_SECRET, { id: 'msg_other', timestamp: ts, signature }, payload, now)).toBe(false)
    expect(
      await verifyWebhookSignature(WEBHOOK_SECRET, { id, timestamp: String(now - 1), signature }, payload, now - 1)
    ).toBe(false)
  })

  it('rejects a signature made with a different secret', async () => {
    const other = `whsec_${Buffer.from('another-key').toString('base64')}`
    const signature = sign(payload, id, ts, other)
    expect(await verifyWebhookSignature(WEBHOOK_SECRET, { id, timestamp: ts, signature }, payload, now)).toBe(false)
  })

  it('enforces the +/-5 minute skew window', async () => {
    const at = (offset: number) => {
      const stamp = String(now + offset)
      return verifyWebhookSignature(
        WEBHOOK_SECRET,
        { id, timestamp: stamp, signature: sign(payload, id, stamp) },
        payload,
        now
      )
    }
    expect(await at(299)).toBe(true)
    expect(await at(-299)).toBe(true)
    expect(await at(301)).toBe(false)
    expect(await at(-301)).toBe(false)
  })

  it('rejects missing headers and unparsable timestamps', async () => {
    const signature = sign(payload, id, ts)
    expect(await verifyWebhookSignature(WEBHOOK_SECRET, { timestamp: ts, signature }, payload, now)).toBe(false)
    expect(await verifyWebhookSignature(WEBHOOK_SECRET, { id, signature }, payload, now)).toBe(false)
    expect(await verifyWebhookSignature(WEBHOOK_SECRET, { id, timestamp: ts }, payload, now)).toBe(false)
    expect(
      await verifyWebhookSignature(WEBHOOK_SECRET, { id, timestamp: 'later', signature }, payload, now)
    ).toBe(false)
  })
})

describe('POST /api/resend-webhook', () => {
  const post = (payload: string, headers: Record<string, string>) =>
    new Request('https://example.com/api/resend-webhook', { method: 'POST', body: payload, headers })

  const signed = (payload: string) => {
    const id = 'msg_abc'
    const timestamp = String(Math.floor(Date.now() / 1000))
    return post(payload, {
      'svix-id': id,
      'svix-timestamp': timestamp,
      'svix-signature': sign(payload, id, timestamp),
    })
  }

  it('stores a handled event with the prefix stripped and the campaign hint attached', async () => {
    const { db, executed } = fakeDb({ campaign_id: 'beta-wave-2' })
    const payload = JSON.stringify({
      type: 'email.delivered',
      created_at: '2026-01-02T03:04:05.000Z',
      data: { email_id: 'e_1', to: ['User@Example.com'] },
    })

    const res = await handleEmailWebhook(signed(payload), {
      DB: db,
      RESEND_WEBHOOK_SECRET: WEBHOOK_SECRET,
    })

    expect(res.status).toBe(200)
    await expect(res.json()).resolves.toEqual({ ok: true })
    expect(executed[0].sql).toContain('SELECT campaign_id FROM beta_signups')
    expect(executed[0].params).toEqual(['user@example.com'])
    expect(executed[1].sql).toContain('INSERT INTO email_events')
    expect(executed[1].params).toEqual([
      'user@example.com',
      'delivered',
      'e_1',
      'beta-wave-2',
      '2026-01-02T03:04:05.000Z',
    ])
  })

  it('stores a null campaign hint when no signup matches', async () => {
    const { db, executed } = fakeDb(null)
    const payload = JSON.stringify({ type: 'email.bounced', data: { email_id: 'e_2', to: ['x@example.com'] } })
    await handleEmailWebhook(signed(payload), { DB: db, RESEND_WEBHOOK_SECRET: WEBHOOK_SECRET })
    expect(executed[1].params).toEqual(['x@example.com', 'bounced', 'e_2', null, null])
  })

  it('handles all six event types and drops anything else', async () => {
    expect([...EMAIL_EVENT_TYPES]).toEqual([
      'email.sent',
      'email.delivered',
      'email.opened',
      'email.clicked',
      'email.bounced',
      'email.complained',
    ])

    const { db, executed } = fakeDb()
    const payload = JSON.stringify({ type: 'contact.updated', data: { to: ['x@example.com'] } })
    const res = await handleEmailWebhook(signed(payload), {
      DB: db,
      RESEND_WEBHOOK_SECRET: WEBHOOK_SECRET,
    })
    expect(res.status).toBe(200)
    await expect(res.json()).resolves.toEqual({ ok: true, ignored: 'contact.updated' })
    expect(executed).toHaveLength(0)
  })

  it('answers 401 on an invalid signature and stores nothing', async () => {
    const { db, executed } = fakeDb()
    const payload = JSON.stringify({ type: 'email.sent', data: { to: ['x@example.com'] } })
    const res = await handleEmailWebhook(
      post(payload, {
        'svix-id': 'msg_abc',
        'svix-timestamp': String(Math.floor(Date.now() / 1000)),
        'svix-signature': 'v1,AAAA',
      }),
      { DB: db, RESEND_WEBHOOK_SECRET: WEBHOOK_SECRET }
    )
    expect(res.status).toBe(401)
    await expect(res.json()).resolves.toEqual({ error: 'invalid_signature' })
    expect(executed).toHaveLength(0)
  })

  it('answers 503 when no webhook secret is configured', async () => {
    const { db } = fakeDb()
    const res = await handleEmailWebhook(signed('{}'), { DB: db })
    expect(res.status).toBe(503)
    await expect(res.json()).resolves.toEqual({ error: 'webhook_not_configured' })
  })

  it('answers 400 on a signed but unparsable body', async () => {
    const { db } = fakeDb()
    const res = await handleEmailWebhook(signed('not json'), {
      DB: db,
      RESEND_WEBHOOK_SECRET: WEBHOOK_SECRET,
    })
    expect(res.status).toBe(400)
    await expect(res.json()).resolves.toEqual({ error: 'invalid_json' })
  })

  it('acknowledges when the event cannot be stored, so the provider stops retrying', async () => {
    const db = {
      prepare: () => ({
        bind: () => ({
          first: async () => null,
          run: async () => {
            throw new Error('no such table: email_events')
          },
        }),
      }),
    } as unknown as D1Database
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const payload = JSON.stringify({ type: 'email.opened', data: { email_id: 'e_3', to: ['x@example.com'] } })
    const res = await handleEmailWebhook(signed(payload), { DB: db, RESEND_WEBHOOK_SECRET: WEBHOOK_SECRET })
    expect(res.status).toBe(200)
    await expect(res.json()).resolves.toEqual({ ok: true, stored: false })
    spy.mockRestore()
  })

  it('rejects non-POST methods', async () => {
    const { db } = fakeDb()
    const res = await handleEmailWebhook(
      new Request('https://example.com/api/resend-webhook'),
      { DB: db, RESEND_WEBHOOK_SECRET: WEBHOOK_SECRET }
    )
    expect(res.status).toBe(405)
  })
})
