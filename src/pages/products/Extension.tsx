import {
  Shield,
  Globe,
  Check,
  ArrowLeftRight,
  Layers,
  BookOpen,
  LockOpen,
  Server,
} from 'lucide-react'
import { Link } from 'react-router-dom'
const rgbLogo = '/logos/protocol-logos/rgb/rgb-logo.png'
const lightningLogo = '/logos/protocol-logos/lightning/lightning-logo.svg'
const sparkLogo = '/logos/protocol-logos/spark/Asterisk/Spark Asterisk White.svg'
const arkadeLogo = '/logos/protocol-logos/arkade/arkade-logo.svg'
const nostrLogo = '/logos/protocol-logos/nostr/nostr-logo.svg'
import { SEO } from '@/components/common/SEO'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/footer/Footer'
import { Button } from '@/components/common/Button'
import { AnimateIn } from '@/components/animations/AnimateIn'
import { TiltCard } from '@/components/common/TiltCard'
import { footerConfig } from '@/constants/footer'
import { DOCS } from '@/constants/urls'
import { useTranslation } from 'react-i18next'

const features = [
  {
    icon: Layers,
    title: 'Multi-Protocol',
    description: 'Supports Spark, Arkade, Nostr, and optional RGB Lightning Node accounts.',
  },
  {
    icon: ArrowLeftRight,
    title: 'Built-in Swaps',
    description: 'Routes through KaleidoSwap maker pairs and supported Spark/Flashnet venues.',
  },
  {
    icon: Globe,
    title: 'DApp Integration',
    description: 'Exposes window.rgbwebln for trusted DApp wallet requests.',
  },
  {
    icon: Shield,
    title: 'Locally Encrypted',
    description: 'Argon2id password checks, AES-GCM encrypted mnemonic, and auto-lock.',
  },
]

type Protocol = {
  name: string
  description: string
  color: string
  border: string
  logo: string
}

const protocols: Protocol[] = [
  {
    name: 'RGB',
    description: 'Smart contracts and token issuance on Bitcoin with client-side validation.',
    color: 'text-red-400',
    border: 'hover:border-red-500/30',
    logo: rgbLogo,
  },
  {
    name: 'Lightning',
    description: 'Instant, low-fee Bitcoin payments over the Lightning Network.',
    color: 'text-yellow-400',
    border: 'hover:border-yellow-500/30',
    logo: lightningLogo,
  },
  {
    name: 'Spark',
    description: 'Bitcoin payments via the Spark protocol with Flashnet integration.',
    color: 'text-white',
    border: 'hover:border-white/20',
    logo: sparkLogo,
  },
  {
    name: 'Arkade',
    description: 'Virtual UTXO-based Bitcoin transactions with automatic boarding.',
    color: 'text-violet-500',
    border: 'hover:border-violet-500/30',
    logo: arkadeLogo,
  },
  {
    name: 'Nostr',
    description: 'Decentralized identity and event signing via NIP-07 compatible interface.',
    color: 'text-[#7B50C2]',
    border: 'hover:border-[#7B50C2]/30',
    logo: nostrLogo,
  },
]

export const Extension = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background-dark text-white font-display overflow-x-hidden">
      <SEO
        title="Browser Extension"
        description="Multi-protocol Bitcoin wallet for Lightning, RGB, Spark, and Arkade. Private Bitcoin swaps, no KYC, non-custodial. Manage BTC, stablecoins, and RGB assets from your browser."
        url="/products/extension"
      />

      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-green-500/20 rounded-full blur-[120px] -z-10 opacity-40" />
        <div className="absolute bottom-0 left-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-green-500/10 rounded-full blur-[100px] -z-10 opacity-30" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-gray-950/50 -z-10" />

        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* Left — text & CTAs */}
            <div className="min-w-0">
              <AnimateIn variant="fade-down" duration={500}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 mb-6 w-fit">
                  <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
                  <span className="text-xs font-semibold text-green-400 uppercase tracking-wider">
                    {t('Live on Mainnet')}
                  </span>
                </div>
              </AnimateIn>

              <AnimateIn variant="fade-up" delay={100}>
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                    {t('Extension')}
                  </h1>
                  <p className="text-base sm:text-xl text-slate-400 leading-relaxed">
                    {t('A multi-protocol Bitcoin wallet, right in your browser. Connect to dApps and manage assets across RGB, Lightning, Spark, Arkade, and Nostr from a single extension.')}
                  </p>
                </div>
              </AnimateIn>

              <AnimateIn variant="fade-up" delay={250}>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <Link to="/products/extension/beta" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="bg-green-500 hover:bg-green-600 flex items-center justify-center gap-2 w-full"
                    >
                      <LockOpen className="w-4 h-4" />
                      {t('Apply for Beta Access')}
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => window.open(DOCS.extensionDocs, '_blank')}
                    className="flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                    <BookOpen className="w-4 h-4" />
                    {t('Read the Docs')}
                  </Button>
                </div>
              </AnimateIn>

              <AnimateIn variant="fade-up" delay={350}>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-green-400 shrink-0" />
                    <span className="whitespace-nowrap">{t('Non-custodial')}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-green-400 shrink-0" />
                    <span className="whitespace-nowrap">{t('All Browsers')}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-green-400 shrink-0" />
                    <span className="whitespace-nowrap">{t('WebLN & NIP-07')}</span>
                  </div>
                </div>
              </AnimateIn>
            </div>

            {/* Right — extension screenshot with 3D tilt */}
            <AnimateIn variant="scale" delay={200} duration={800} className="min-w-0 mt-4 lg:mt-0 flex justify-center">
              <TiltCard
                src="/images/extension-screenshot.png"
                alt="KaleidoSwap Extension"
                className="w-full max-w-[300px] sm:max-w-[380px]"
              />
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-14 sm:py-20 bg-gray-950/50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="glass-card p-4 sm:p-6 rounded-xl">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center mb-3 sm:mb-4">
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold mb-1.5 sm:mb-2">{t(feature.title)}</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{t(feature.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Protocols */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3 sm:mb-4">{t('Five Protocols, One Extension')}</h2>
          <p className="text-slate-400 text-sm sm:text-base text-center mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('The KaleidoSwap Extension connects to RGB, Lightning, Spark, Arkade, and Nostr through a pluggable protocol adapter architecture. No switching between wallets.')}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-6 max-w-5xl mx-auto">
            {protocols.map((protocol) => (
              <div
                key={protocol.name}
                className={`glass-card p-4 sm:p-6 rounded-xl text-center transition-colors ${protocol.border} last:col-span-2 last:max-w-[calc(50%-6px)] last:mx-auto md:last:col-span-1 md:last:max-w-none md:last:mx-0`}
              >
                <img src={protocol.logo} alt={protocol.name} className="w-9 h-9 sm:w-10 sm:h-10 mx-auto mb-3 sm:mb-4 object-contain" />
                <h3 className={`text-base sm:text-lg font-bold mb-1.5 sm:mb-2 ${protocol.color}`}>{protocol.name}</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{t(protocol.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sovereignty */}
      <section className="py-14 sm:py-20 bg-gray-950/50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="glass-card rounded-2xl p-6 sm:p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">{t('Sovereignty First')}</h2>
                <p className="text-slate-400 text-sm sm:text-base mb-5 sm:mb-6 leading-relaxed">
                  {t('The KaleidoSwap Extension is self-custodial by design. Your seed never leaves the extension, your traffic never leaves your machine, and your funds never sit on our servers — because there are none.')}
                </p>
                <ul className="space-y-2.5 sm:space-y-3 mb-2 sm:mb-6">
                  {[
                    'Self-custody by default — no accounts, no KYC',
                    'No tracking, no telemetry, no analytics',
                    'Connect to your own RGB Lightning Node',
                    'Open-source and independently auditable',
                    'Local-first — no servers in the payment path',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-slate-300 text-sm sm:text-base">
                      <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5 sm:mt-1" />
                      <span>{t(item)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-4">
                <div className="glass-card p-4 sm:p-5 rounded-xl">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center mb-2.5 sm:mb-3">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold mb-1">{t('Non-Custodial')}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{t('You hold your private keys. No third party — including KaleidoSwap — can access, freeze, or move your funds.')}</p>
                </div>
                <div className="glass-card p-4 sm:p-5 rounded-xl">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center mb-2.5 sm:mb-3">
                    <Server className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold mb-1">{t('Bring Your Own Node')}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{t('Point the extension at your own RGB Lightning Node for full sovereignty over routing, channels, and asset issuance.')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">{t('Get Started')}</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {[
              { step: '01', title: 'Join Early Access', desc: 'Request access via our Telegram community to get the extension build.' },
              { step: '02', title: 'Load Extension', desc: 'Enable Developer mode in Chrome, then load the unpacked dist/ folder.' },
              { step: '03', title: 'Create Wallet', desc: 'Create or import a seed, set a password, and connect to your RGB Lightning Node.' },
              { step: '04', title: 'Start Using', desc: 'Send, receive, swap, and connect your wallet to any WebLN-compatible dApp.' },
            ].map((item) => (
              <div key={item.step} className="text-center max-w-none mx-auto">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-lg sm:text-2xl font-bold text-green-400">{item.step}</span>
                </div>
                <h3 className="text-sm sm:text-lg font-bold mb-1.5 sm:mb-2">{t(item.title)}</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{t(item.desc)}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10 sm:mt-12 px-5 sm:px-0">
            <Link to="/products/extension/beta" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-green-500 hover:bg-green-600 flex items-center justify-center gap-2 w-full"
              >
                <LockOpen className="w-4 h-4" />
                {t('Apply for Beta Access')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer {...footerConfig} />
    </div>
  )
}
