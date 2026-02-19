// src/constants/products.ts
import type { Product } from '@/types/products'
import { Code, Globe, Zap, Network } from 'lucide-react'

export const products: Product[] = [
  {
    id: 'lightning',
    name: 'Lightning Network',
    status: 'latest-release',
    badge: 'Live',
    description: 'Instant BTC payments. The base layer for fast, cheap Bitcoin transactions.',
    features: [
      'Instant settlement',
      'Low fees',
      'Global reach',
      'Bitcoin security'
    ],
    icon: Zap,
    platforms: ['Layer 2'],
    color: 'bitcoin'
  },
  {
    id: 'rgb',
    name: 'RGB Protocol',
    status: 'latest-release',
    badge: 'Live',
    description: 'Smart contracts on Bitcoin. Asset issuance and scalable client-side validation.',
    features: [
      'Client-side validation',
      'Scalable smart contracts',
      'Asset issuance',
      'Privacy'
    ],
    icon: Code,
    platforms: ['Layer 2', 'Layer 3'],
    color: 'primary'
  },
  {
    id: 'spark',
    name: 'Spark',
    status: 'latest-release',
    badge: 'Live',
    description: 'Statechains for scalability. manage UTXOs off-chain without on-chain fees.',
    features: [
      'UTXO management',
      'Off-chain scaling',
      'Instant transfer',
      'Cheaper than on-chain'
    ],
    icon: Network, // Using Network icon for Spark
    platforms: ['Layer 2'],
    color: 'secondary'
  },
  {
    id: 'arkade',
    name: 'Arkade',
    status: 'latest-release',
    badge: 'Live',
    description: 'Virtual UTXOs for enhanced liquidity and seamless swaps.',
    features: [
      'Virtual UTXOs',
      'Liquidity pools',
      'Atomic swaps',
      'Trustless'
    ],
    icon: Globe, // Using Globe icon for Arkade
    platforms: ['Layer 2'],
    color: 'green'
  },
  {
    id: 'taproot-assets',
    name: 'Taproot Assets',
    status: 'coming-soon',
    badge: 'Coming Q4 2026',
    description: 'Assets on Bitcoin blockchain using Taproot transactions.',
    features: [],
    icon: Code,
    platforms: ['Layer 1'],
    color: 'gray'
  },
  {
    id: 'liquid',
    name: 'Liquid Network',
    status: 'coming-soon',
    badge: 'Coming Q4 2026',
    description: 'Sidechain for Bitcoin with faster settlement and asset issuance.',
    features: [],
    icon: Globe,
    platforms: ['Sidechain'],
    color: 'gray'
  }
]
