// src/constants/features.ts
import { Zap, Repeat, Shield, Wallet, History, Network } from 'lucide-react';
import type { Feature, SupportedNetwork } from '@/types/features';

export const features: Feature[] = [
  {
    icon: Repeat,
    title: "Trustless Multi-Asset Trading",
    description: "Trade BTC and RGB assets directly over Lightning Network with no intermediaries. Your keys, your coins, your trades—always."
  },
  {
    icon: Network,
    title: "Seamless Lightning Integration",
    description: "Request custom channels with RGB assets from trusted LSPs to kickstart your trading journey with optimal liquidity."
  },
  {
    icon: Zap,
    title: "Complete Channel Control",
    description: "Manage your Lightning channels with precision—open, close, and configure with RGB assets for maximum flexibility."
  },
  {
    icon: Wallet,
    title: "Unified Asset Management",
    description: "Deposit and withdraw both Bitcoin and RGB assets seamlessly, whether on-chain or via Lightning Network, all from one interface."
  },
  {
    icon: History,
    title: "Transparent Transaction History",
    description: "Track every movement with a comprehensive history of all your deposits, withdrawals, and swaps in a clean, intuitive dashboard."
  },
  {
    icon: Shield,
    title: "True Self-Custody Security",
    description: "Rest easy with robust security features including encrypted backups, open-source code, and complete control over your private keys."
  }
];

export const supportedNetworks: SupportedNetwork[] = [
  'Regtest',
  'Signet',
  'Testnet3'
];