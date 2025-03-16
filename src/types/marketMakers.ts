// src/types/marketMakers.ts
export interface AssetPair {
  baseAsset: string;
  quoteAsset: string;
  pairId: string;
}

export interface MarketMaker {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  website?: string;
  registryUrl: string;
  supportedNetworks: string[];
  supportedAssets: string[];
  tradingPairs: AssetPair[];
}

export interface MarketMakersPageProps {
  title: string;
  description: string;
  marketMakers: MarketMaker[];
} 