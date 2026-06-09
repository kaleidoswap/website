const bitcoinLogo = '/logos/protocol-logos/bitcoin/bitcoin-logo-orange.svg'
const rgbLogo = '/logos/protocol-logos/rgb/rgb-logo.png'
const sparkAsterisk = '/logos/protocol-logos/spark/Asterisk/Spark Asterisk White.svg'
const arkadeLogo = '/logos/protocol-logos/arkade/arkade-logo.svg'
const liquidLogo = '/logos/protocol-logos/liquid/logo-liquid.svg'
const lightningLogo = '/logos/protocol-logos/lightning/lightning-logo.svg'
const taprootLogo = '/logos/protocol-logos/taproot-assets/tapass-logo.svg'

export interface Protocol {
  name: string
  icon: string | null
  status: 'live' | 'coming-soon'
  url?: string
}

export const protocols: Protocol[] = [
  { name: 'Bitcoin', icon: bitcoinLogo, status: 'live', url: 'https://bitcoin.org' },
  { name: 'Lightning', icon: lightningLogo, status: 'live', url: 'https://lightning.network' },
  { name: 'RGB', icon: rgbLogo, status: 'live', url: 'https://rgb.info' },
  { name: 'Spark', icon: sparkAsterisk, status: 'live', url: 'https://www.spark.money' },
  { name: 'Arkade', icon: arkadeLogo, status: 'live', url: 'https://arkade.money' },
  { name: 'Liquid', icon: liquidLogo, status: 'coming-soon', url: 'https://liquid.net' },
  { name: 'Taproot Assets', icon: taprootLogo, status: 'coming-soon', url: 'https://docs.lightning.engineering/the-lightning-network/taproot-assets' },
]

export const liveProtocols = protocols.filter(p => p.status === 'live')
export const comingProtocols = protocols.filter(p => p.status === 'coming-soon')
