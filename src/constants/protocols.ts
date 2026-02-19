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
}

export const protocols: Protocol[] = [
  { name: 'Bitcoin', icon: bitcoinLogo, status: 'live' },
  { name: 'Lightning', icon: null, lucideIcon: Zap, status: 'live' },
  { name: 'RGB', icon: rgbLogo, status: 'live' },
  { name: 'Spark', icon: sparkAsterisk, status: 'live' },
  { name: 'Arkade', icon: arkadeLogo, status: 'coming-soon' },
  { name: 'Liquid', icon: liquidLogo, status: 'coming-soon' },
  { name: 'Taproot Assets', icon: taprootLogo, status: 'coming-soon' },
]

export const liveProtocols = protocols.filter(p => p.status === 'live')
export const comingProtocols = protocols.filter(p => p.status === 'coming-soon')
