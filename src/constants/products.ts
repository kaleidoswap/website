// src/constants/products.ts
import type { Product } from '@/types/products'
import { Download, Code, Smartphone, Globe } from 'lucide-react'

export const products: Product[] = [
  {
    id: 'desktop-app',
    name: 'Desktop App',
    version: '0.3.0',
    status: 'latest-release',
    badge: 'Latest Release',
    description: 'Open-source desktop application for Linux and macOS. Trade RGB assets with complete self-custody and privacy.',
    features: [
      'Unified asset management',
      'Full Lightning channel control',
      'Transparent transaction history',
      'Secure node backups'
    ],
    icon: Download,
    platforms: ['Linux', 'macOS'],
    primaryCTA: {
      label: 'Download Now',
      href: '/downloads',
      external: false
    },
    secondaryCTA: {
      label: 'View on GitHub',
      href: 'https://github.com/kaleidoswap/desktop-app',
      external: true
    },
    color: 'green'
  },
  {
    id: 'sdk',
    name: 'SDK',
    version: '0.1.0',
    status: 'latest-release',
    badge: 'Latest Release',
    description: 'Build on KaleidoSwap. Integrate RGB asset trading into your applications with our developer SDK.',
    features: [
      'Easy integration',
      'Comprehensive documentation',
      'RGB protocol support',
      'Lightning Network ready'
    ],
    icon: Code,
    platforms: ['Node.js', 'TypeScript'],
    primaryCTA: {
      label: 'Documentation',
      href: 'https://docs.kaleidoswap.com/sdk',
      external: true
    },
    secondaryCTA: {
      label: 'GitHub Repository',
      href: 'https://github.com/kaleidoswap/sdk',
      external: true
    },
    color: 'primary'
  },
  {
    id: 'mobile-app',
    name: 'Mobile App',
    status: 'coming-soon',
    badge: 'Coming Soon',
    description: 'Trade RGB assets on-the-go with the KaleidoSwap mobile experience. Native apps for iOS and Android.',
    features: [
      'Mobile-optimized trading',
      'Push notifications',
      'Biometric security',
      'Sync with desktop'
    ],
    icon: Smartphone,
    platforms: ['iOS', 'Android'],
    color: 'secondary'
  },
  {
    id: 'web-app',
    name: 'Web App',
    status: 'coming-soon',
    badge: 'Coming Soon',
    description: 'Access KaleidoSwap directly from your browser. No downloads required.',
    features: [
      'Browser-based trading',
      'Cross-platform compatibility',
      'WebLN integration',
      'No installation needed'
    ],
    icon: Globe,
    platforms: ['Web'],
    color: 'bitcoin'
  }
]
