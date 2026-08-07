// Single source of truth for digital business cards, served at /contact/:slug
// and consumed by both the client (src/pages/BusinessCard.tsx) and the
// Cloudflare Worker (worker/vcard.ts), which generates the downloadable
// .vcf from the same record — the page and the vCard can never drift apart.
//
// To add or edit a card: just add/edit an entry below, keyed by slug
// (the URL segment after /contact/). Nothing else needs to change.
//
// Photos are the optimized `-preview.webp` avatars produced by
// `npm run images:previews` — never point at the multi-MB originals, since
// this page is opened on mobile data from a printed QR code.

export interface BusinessCard {
  slug: string
  fullName: string
  firstName: string
  lastName: string
  role: string
  company: string
  /** E.164 format, e.g. "+393317655377" — used for the tel: link and the vCard */
  phone: string
  /** How the phone number is displayed on the page, e.g. "+39 331 765 5377" */
  phoneDisplay: string
  email: string
  website?: string
  linkedin?: string
  github?: string
  x?: string
  /** Path under /public. Falls back to the KaleidoSwap pictogram when omitted. */
  photo?: string
}

export const BUSINESS_CARDS: Record<string, BusinessCard> = {
  walter: {
    slug: 'walter',
    fullName: 'Walter Maffione',
    firstName: 'Walter',
    lastName: 'Maffione',
    role: 'Founder & CEO',
    company: 'KaleidoSwap',
    phone: '+393317655377',
    phoneDisplay: '+39 331 765 5377',
    email: 'walter@kaleidoswap.com',
    website: 'https://kaleidoswap.com',
    linkedin: 'https://www.linkedin.com/in/walter-maffione/',
    github: 'https://github.com/bitwalt',
    x: 'https://x.com/bit_walt',
    photo: '/images/contact/walter-maffione-pfp-preview.webp',
  },
  emile: {
    slug: 'emile',
    fullName: 'Emile Jellinek',
    firstName: 'Emile',
    lastName: 'Jellinek',
    role: 'Chief Growth Officer',
    company: 'KaleidoSwap',
    phone: '+393452452183',
    phoneDisplay: '+39 345 245 2183',
    email: 'emile@kaleidoswap.com',
    website: 'https://kaleidoswap.com',
    linkedin: 'https://www.linkedin.com/in/emilejellinek/',
    github: 'https://github.com/jelleml',
    x: 'https://x.com/emilejellinek',
    photo: '/images/contact/emile-jellinek-pfp-preview.webp',
  },
  manuel: {
    slug: 'manuel',
    fullName: 'Manuel Cumerlato',
    firstName: 'Manuel',
    lastName: 'Cumerlato',
    role: 'Chief Operations Officer',
    company: 'KaleidoSwap',
    phone: '+393493600809',
    phoneDisplay: '+39 349 360 0809',
    email: 'manuel@kaleidoswap.com',
    website: 'https://kaleidoswap.com',
    linkedin: 'https://www.linkedin.com/in/manuel-cumerlato/',
    x: 'https://x.com/Mannysb_',
    photo: '/images/contact/manuel-cumerlato-pfp-preview.webp',
  },
}

export function getBusinessCard(slug: string): BusinessCard | null {
  return BUSINESS_CARDS[slug] ?? null
}
