import { describe, expect, it } from 'vitest'
import { buildVCard, handleVCardRequest } from './vcard'
import { BUSINESS_CARDS, type BusinessCard } from '../src/constants/businessCards'

const SITE_URL = 'https://kaleidoswap.com'

const card: BusinessCard = {
  slug: 'test-person',
  fullName: 'Test Person',
  firstName: 'Test',
  lastName: 'Person',
  role: 'Software Developer, Bitcoin',
  company: 'KaleidoSwap',
  phone: '+391234567890',
  phoneDisplay: '+39 123 456 7890',
  email: 'test@kaleidoswap.com',
  website: 'https://kaleidoswap.com',
  linkedin: 'https://linkedin.com/in/test-person',
  github: 'https://github.com/test-person',
  x: 'https://x.com/test_person',
}

describe('buildVCard', () => {
  it('produces a well-formed vCard 3.0 with CRLF line endings', () => {
    const vcard = buildVCard(card, SITE_URL)
    expect(vcard.startsWith('BEGIN:VCARD\r\n')).toBe(true)
    expect(vcard.endsWith('END:VCARD\r\n')).toBe(true)
    expect(vcard).toContain('VERSION:3.0\r\n')
    expect(vcard).toContain('N:Person;Test;;;\r\n')
    expect(vcard).toContain('FN:Test Person\r\n')
    expect(vcard).toContain('ORG:KaleidoSwap\r\n')
    // role contains a comma, which vCard requires escaped as \,
    expect(vcard).toContain('TITLE:Software Developer\\, Bitcoin\r\n')
    expect(vcard).toContain('TEL;TYPE=CELL,VOICE:+391234567890\r\n')
    expect(vcard).toContain('EMAIL;TYPE=INTERNET,PREF:test@kaleidoswap.com\r\n')
    expect(vcard).toContain('item1.URL:https://linkedin.com/in/test-person\r\n')
    expect(vcard).toContain('item1.X-ABLabel:LinkedIn\r\n')
  })

  it('numbers item groups consecutively when a social link is missing', () => {
    // Manuel has no GitHub: the X link must still land on item2, not item3.
    const vcard = buildVCard({ ...card, github: undefined }, SITE_URL)
    expect(vcard).toContain('item1.X-ABLabel:LinkedIn\r\n')
    expect(vcard).toContain('item2.URL:https://x.com/test_person\r\n')
    expect(vcard).toContain('item2.X-ABLabel:X\r\n')
    expect(vcard).not.toContain('item3')
  })

  it('omits optional fields that are not set', () => {
    const minimal: BusinessCard = {
      slug: 'minimal',
      fullName: 'Minimal Person',
      firstName: 'Minimal',
      lastName: 'Person',
      role: 'Role',
      company: 'Company',
      phone: '+10000000000',
      phoneDisplay: '+1 000 000 0000',
      email: 'minimal@example.com',
    }
    const vcard = buildVCard(minimal, SITE_URL)
    expect(vcard).not.toContain('URL')
    expect(vcard).not.toContain('PHOTO')
    expect(vcard).not.toContain('item1')
  })

  it('references the photo as an absolute URI when present', () => {
    const vcard = buildVCard({ ...card, photo: '/images/business-card/test-person.jpg' }, SITE_URL)
    expect(vcard).toContain('PHOTO;VALUE=URI:https://kaleidoswap.com/images/business-card/test-person.jpg\r\n')
  })
})

describe('handleVCardRequest', () => {
  it('404s for an unknown slug', async () => {
    const res = await handleVCardRequest(new Request('https://kaleidoswap.com/contact/nobody.vcf'), 'nobody', SITE_URL)
    expect(res.status).toBe(404)
  })

  it('rejects non-GET/HEAD methods', async () => {
    const res = await handleVCardRequest(
      new Request('https://kaleidoswap.com/contact/test-person.vcf', { method: 'POST' }),
      'test-person',
      SITE_URL
    )
    expect(res.status).toBe(405)
  })

  it('serves the vCard with the correct content-type and inline disposition', async () => {
    const res = await handleVCardRequest(new Request('https://kaleidoswap.com/contact/emile.vcf'), 'emile', SITE_URL)
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toBe('text/vcard;charset=utf-8')
    expect(res.headers.get('content-disposition')).toBe('inline; filename="emile.vcf"')
    const body = await res.text()
    expect(body).toContain('BEGIN:VCARD')
    expect(body).toContain('FN:Emile Jellinek')
  })
})

// Guards the data itself, not the code: a typo in a phone number or a photo
// pointing at a multi-MB original would ship silently otherwise.
describe('BUSINESS_CARDS data', () => {
  const cards = Object.entries(BUSINESS_CARDS)

  it('has at least one card', () => {
    expect(cards.length).toBeGreaterThan(0)
  })

  it.each(cards)('%s: slug matches its key and URL shape', (key, card) => {
    expect(card.slug).toBe(key)
    expect(key).toMatch(/^[a-z0-9-]+$/)
  })

  it.each(cards)('%s: phone is E.164 and matches the displayed number', (_key, card) => {
    expect(card.phone).toMatch(/^\+[1-9]\d{7,14}$/)
    // The pretty version must be the same digits, just spaced.
    expect(card.phoneDisplay.replace(/\s/g, '')).toBe(card.phone)
  })

  it.each(cards)('%s: email is well-formed', (_key, card) => {
    expect(card.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  })

  it.each(cards)('%s: uses an optimized avatar, not a raw original', (_key, card) => {
    if (!card.photo) return
    expect(card.photo.startsWith('/')).toBe(true)
    expect(card.photo).toMatch(/-preview\.webp$/)
  })

  it.each(cards)('%s: social links are absolute https URLs', (_key, card) => {
    for (const url of [card.website, card.linkedin, card.github, card.x]) {
      if (url) expect(url).toMatch(/^https:\/\//)
    }
  })
})
