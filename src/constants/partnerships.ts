// src/constants/partnerships.ts
import type { Partner } from '@/types/partnerships'

export const partners: Partner[] = [
  {
    name: 'Fulgur Ventures',
    description: 'Leading Bitcoin venture capital firm focused on Lightning Network and Layer 2 solutions',
    logo: '/partners/fulgur-ventures-logo.svg',
    website: 'https://fulgur.ventures',
    type: 'investor'
  },
  {
    name: 'Bitfinex Ventures',
    description: 'Investment arm of Bitfinex supporting Bitcoin ecosystem innovation and early-stage projects',
    logo: '/partners/bitfinex-ventures-logo.svg',
    website: 'https://bitfinex.com',
    type: 'investor'
  },
  {
    name: 'RGB Protocol Association',
    description: 'Non-profit organization advancing the RGB protocol ecosystem and Bitcoin Layer 2 innovation',
    logo: '/partners/rgb-protocol-logo.svg',
    website: 'https://rgbprotocol.org/',
    type: 'strategic'
  }
]
