// src/types/features.ts
import { LucideIcon } from 'lucide-react';

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export interface FeatureCardProps extends Feature {
  index: number;
}

export interface FeaturesGridProps {
  title: string;
  description: string;
  features: Feature[];
}

export type SupportedNetwork = 'Regtest' | 'Signet' | 'Testnet3';