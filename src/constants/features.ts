// src/constants/features.ts
import { Zap, Repeat, Database } from 'lucide-react';
import type { Feature, SupportedNetwork } from '@/types/features';

export const features: Feature[] = [
  {
    icon: Repeat,
    title: "Asset Trading & Swapping",
    description: "Trade assets trustlessly using the RGB Lightning DEX API with integrated market makers"
  },
  {
    icon: Zap,
    title: "Lightning Channel Management",
    description: "Easily open, close, and manage channels with optional RGB assets"
  },
  {
    icon: Database,
    title: "Complete Asset Control",
    description: "Handle both on-chain and Lightning Network transactions"
  }
];

export const supportedNetworks: SupportedNetwork[] = [
  'Regtest',
  'Signet',
  'Testnet3'
];