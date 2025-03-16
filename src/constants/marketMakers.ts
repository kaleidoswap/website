// src/constants/marketMakers.ts
import type { MarketMaker } from '@/types/marketMakers';

export const marketMakers: MarketMaker[] = [
  {
    id: 'kaleidoTestMaker',
    name: 'KaleidoTest Maker',
    description: 'Official test market maker for Kaleidoswap, providing liquidity for RGB assets on signet.',
    logoUrl: '/assets/logo.svg',
    website: 'https://kaleidoswap.com',
    registryUrl: 'https://registry.kaleidoswap.com/signet',
    supportedNetworks: ['signet', 'regtest'],
    supportedAssets: [
      'RGB20',
      ],
    tradingPairs: [
      {
        baseAsset: 'BTC',
        quoteAsset: 'USDT',
        pairId: 'BTC/USDT'
      },
      {
        baseAsset: 'BTC',
        quoteAsset: 'XAUT',
        pairId: 'BTC/XAUT'
      },
      {
        baseAsset: 'XAUT',
        quoteAsset: 'USDT',
        pairId: 'XAUT/USDT'
      }
    ]
  },
  
];

export const marketMakersPageConfig = {
  title: "Market Makers Registry",
  description: "Connect to these verified market makers to access liquidity for RGB assets on Lightning Network",
  marketMakers: marketMakers
}; 