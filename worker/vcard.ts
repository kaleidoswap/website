// Generates the vCard (.vcf) served at GET /contact/:slug.vcf, straight from
// the same BusinessCard record the React page renders — see
// src/constants/businessCards.ts for the single source of truth.

import { getBusinessCard, type BusinessCard } from '../src/constants/businessCards'

// vCard 3.0 escaping: backslash and newline first (so a literal backslash
// introduced by escaping ',' or ';' isn't re-escaped), then the structural
// delimiters.
function escapeVCardValue(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
}

export function buildVCard(card: BusinessCard, siteUrl: string): string {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${escapeVCardValue(card.lastName)};${escapeVCardValue(card.firstName)};;;`,
    `FN:${escapeVCardValue(card.fullName)}`,
    `ORG:${escapeVCardValue(card.company)}`,
    `TITLE:${escapeVCardValue(card.role)}`,
    `TEL;TYPE=CELL,VOICE:${card.phone}`,
    `EMAIL;TYPE=INTERNET,PREF:${escapeVCardValue(card.email)}`,
  ]

  if (card.website) lines.push(`URL;TYPE=WORK:${card.website}`)

  // Labelled URLs use vCard item groups. The counter only advances for links
  // that exist, so a card without (say) GitHub still emits item1/item2 rather
  // than skipping a number.
  let item = 0
  for (const [label, url] of [
    ['LinkedIn', card.linkedin],
    ['GitHub', card.github],
    ['X', card.x],
  ] as const) {
    if (!url) continue
    item++
    lines.push(`item${item}.URL:${url}`, `item${item}.X-ABLabel:${label}`)
  }

  if (card.photo) lines.push(`PHOTO;VALUE=URI:${siteUrl}${card.photo}`)

  lines.push('END:VCARD')

  // vCard requires CRLF line endings.
  return lines.join('\r\n') + '\r\n'
}

export async function handleVCardRequest(request: Request, slug: string, siteUrl: string): Promise<Response> {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response('Method not allowed', { status: 405, headers: { allow: 'GET, HEAD' } })
  }

  const card = getBusinessCard(slug)
  if (!card) return new Response('Not found', { status: 404 })

  const body = buildVCard(card, siteUrl)
  const headers = new Headers({
    'content-type': 'text/vcard;charset=utf-8',
    // 'inline' (not 'attachment') so mobile Safari/Chrome offer the native
    // "Add Contact" sheet immediately instead of just downloading a file.
    'content-disposition': `inline; filename="${slug}.vcf"`,
    'cache-control': 'no-store',
  })

  if (request.method === 'HEAD') return new Response(null, { status: 200, headers })
  return new Response(body, { status: 200, headers })
}
