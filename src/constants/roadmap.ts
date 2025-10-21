// src/constants/roadmap.ts
import type { Milestone } from '@/types/roadmap'
import { Rocket, Package, Smartphone, Globe, Network, Users } from 'lucide-react'

export const milestones: Milestone[] = [
  {
    id: 'alpha-launch',
    title: 'Alpha v0.1 Launch',
    description: 'Initial alpha release for early adopters and testers',
    status: 'completed',
    date: 'March 2025',
    icon: Rocket,
    highlights: [
      'Core trading functionality',
      'Lightning integration',
      'RGB asset support'
    ]
  },
  {
    id: 'desktop-v3',
    title: 'Desktop App v0.3.0',
    description: 'Major desktop application update with enhanced features',
    status: 'completed',
    date: 'October 2025',
    icon: Package,
    highlights: [
      'Improved UI/UX',
      'Enhanced stability',
      'Multi-platform support'
    ]
  },
  {
    id: 'sdk-release',
    title: 'SDK v0.1.0',
    description: 'Developer SDK for building on KaleidoSwap',
    status: 'completed',
    date: 'October 2025',
    icon: Package,
    highlights: [
      'Comprehensive API',
      'Full documentation',
      'Code examples'
    ]
  },
  {
    id: 'p2p-marketplace',
    title: 'P2P Marketplace',
    description: 'Decentralized peer-to-peer trading marketplace',
    status: 'in-progress',
    date: 'Q4 2025',
    icon: Users,
    highlights: [
      'Direct P2P trading',
      'Advanced order types',
      'Liquidity pools'
    ]
  },
  {
    id: 'mobile-app',
    title: 'Mobile App',
    description: 'Native mobile applications for iOS and Android',
    status: 'upcoming',
    date: 'Q1 2026',
    icon: Smartphone,
    highlights: [
      'Mobile-first design',
      'Biometric security',
      'Push notifications'
    ]
  },
  {
    id: 'web-app',
    title: 'Web App',
    description: 'Browser-based trading platform',
    status: 'upcoming',
    date: 'Q1 2026',
    icon: Globe,
    highlights: [
      'No installation required',
      'WebLN integration',
      'Cross-platform access'
    ]
  },
  {
    id: 'mainnet-launch',
    title: 'Mainnet Launch',
    description: 'Production-ready mainnet deployment',
    status: 'upcoming',
    date: 'Q2 2026',
    icon: Network,
    highlights: [
      'Full mainnet support',
      'Production-grade security',
      'Enterprise features'
    ]
  }
]
