// src/constants/features.ts
import { Zap, Repeat, Shield, Wallet, Network } from 'lucide-react';
import type { Feature, SupportedNetwork } from '@/types/features';

export const features: Feature[] = [
  {
    icon: Repeat,
    title: "Atomic Swaps",
    description: "All-or-nothing execution. Your funds never sit in limbo. Either the swap completes or nothing moves."
  },
  {
    icon: Network,
    title: "Multi-Protocol",
    description: "Lightning, RGB, Spark, Arkade — swap across any Bitcoin L2 from one interface. More protocols coming."
  },
  {
    icon: Shield,
    title: "Non-Custodial",
    description: "Your keys, your coins. We never touch your funds. Swaps execute peer-to-peer using HTLCs."
  },
  {
    icon: Zap,
    title: "Instant Settlement",
    description: "Lightning-speed finality. Swaps complete in seconds, not minutes or hours."
  },
  {
    icon: Shield, // Re-using Shield for Privacy as well, or maybe generic Lock if available, but Shield is fine.
    title: "Privacy by Design",
    description: "No accounts. No KYC. No tracking. Connect a wallet, swap, done."
  },
  {
    icon: Wallet,
    title: "1% Fee",
    description: "Simple, transparent pricing. What you see is what you pay."
  }
];

export const supportedNetworks: SupportedNetwork[] = [
  'Regtest',
  'Signet',
  'Testnet3'
];