// src/constants/features.ts
import { Zap, Repeat, Shield, Wallet, History, Network } from 'lucide-react';
import type { Feature, SupportedNetwork } from '@/types/features';

export const features: Feature[] = [
  {
    icon: Repeat,
    title: "Multi-Asset Trading",
    description: "Connect to market makers over Lightning Network to trade BTC and RGB assets with complete control over your funds"
  },
  {
    icon: Network,
    title: "Lightning Service Providers",
    description: "Request channels with custom capacity and RGB assets from trusted LSPs to kickstart your trading journey"
  },
  {
    icon: Zap,
    title: "Advanced Channel Management",
    description: "Open, close, and manage Lightning channels with optional RGB assets"
  },
  {
    icon: Wallet,
    title: "Seamless Asset Operations",
    description: "Handle deposits and withdrawals for both Bitcoin and RGB assets, on-chain and via Lightning Network"
  },
  {
    icon: History,
    title: "Complete Transaction History",
    description: "Track all your deposits, withdrawals, and swap history in one place"
  },
  {
    icon: Shield,
    title: "Security-First Design",
    description: "Built with robust security features including secure node data backups and comprehensive security considerations"
  }
];

export const supportedNetworks: SupportedNetwork[] = [
  'Regtest',
  'Signet',
  'Testnet3'
];