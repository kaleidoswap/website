import { Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import bitcoinLogo from '@/assets/icons/bitcoin/bitcoin-logo.svg'
import rgbLogo from '@/assets/icons/rgb/rgb-logo.svg'
import sparkAsterisk from '@/assets/icons/spark/Asterisk/Spark Asterisk White.svg'
import arkadeLogo from '@/assets/icons/arkade/arkade-icon.svg'
import liquidLogo from '@/assets/icons/liquid/logo-liquid.svg'
import taprootLogo from '@/assets/icons/taproot-assets/tapass-logo.png'

export interface Protocol {
  name: string
  icon: string | null
  lucideIcon?: LucideIcon
  status: 'live' | 'coming-soon'
  url?: string
}

export const protocols: Protocol[] = [
  { name: 'Bitcoin', icon: bitcoinLogo, status: 'live', url: 'https://bitcoin.org' },
  { name: 'Lightning', icon: null, lucideIcon: Zap, status: 'live', url: 'https://lightning.network' },
  { name: 'RGB', icon: rgbLogo, status: 'live', url: 'https://rgb.info' },
  { name: 'Spark', icon: sparkAsterisk, status: 'live', url: 'https://www.spark.money' },
  { name: 'Arkade', icon: arkadeLogo, status: 'coming-soon', url: 'https://arkade.money' },
  { name: 'Liquid', icon: liquidLogo, status: 'coming-soon', url: 'https://liquid.net' },
  { name: 'Taproot Assets', icon: taprootLogo, status: 'coming-soon', url: 'https://docs.lightning.engineering/the-lightning-network/taproot-assets' },
]

export const liveProtocols = protocols.filter(p => p.status === 'live')
export const comingProtocols = protocols.filter(p => p.status === 'coming-soon')
