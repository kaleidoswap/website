// src/constants/partnerships.ts
import type { Partner } from '@/types/partnerships'

export const partners: Partner[] = [
  {
    name: 'Fulgur Ventures',
    description: 'Leading Bitcoin venture capital firm focused on Lightning Network and Layer 2 solutions',
    logo: '/logos/partner-logos/fulgur ventures/fulgur-pictogram-white.svg',
    website: 'https://fulgur.ventures',
    type: 'investor'
  },
  {
    name: 'Bitfinex Ventures',
    description: 'Investment arm of Bitfinex supporting Bitcoin ecosystem innovation and early-stage projects',
    logo: '/logos/partner-logos/bitfinex/bitfinex-logo-white.svg',
    website: 'https://bitfinex.com',
    type: 'investor'
  },
  {
    name: 'Plan B VC',
    description: 'Venture capital firm supporting Bitcoin-native startups and infrastructure builders',
    logo: '/logos/partner-logos/planbvc-logo.svg',
    website: 'https://planbvc.fund/',
    type: 'investor'
  },
  {
    name: 'RGB Protocol Association',
    description: 'Non-profit organization advancing the RGB protocol ecosystem and Bitcoin Layer 2 innovation',
    logo: '/logos/partner-logos/rgb-association.png',
    website: 'https://rgbprotocol.org/',
    type: 'strategic'
  }
]
