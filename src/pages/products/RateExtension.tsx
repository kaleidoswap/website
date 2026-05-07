import {
  Shield,
  Globe,
  Check,
  ArrowLeftRight,
  Layers,
  BookOpen,
  LockOpen,
  Zap,
  AtSign,
  Server,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SEO } from '@/components/common/SEO'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/footer/Footer'
import { Button } from '@/components/common/Button'
import { AnimateIn } from '@/components/animations/AnimateIn'
import { footerConfig } from '@/constants/footer'
import { DOCS, SOCIALS } from '@/constants/urls'
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
  logo?: string
  icon?: LucideIcon
}

const protocols: Protocol[] = [
  {
    name: 'RGB',
    description: 'Smart contracts and token issuance on Bitcoin with client-side validation.',
    color: 'text-red-400',
    border: 'hover:border-red-500/30',
    logo: '/icons/rgb/rgb-logo.svg',
  },
  {
    name: 'Lightning',
    description: 'Instant, low-fee Bitcoin payments over the Lightning Network.',
    color: 'text-yellow-400',
    border: 'hover:border-yellow-500/30',
    icon: Zap,
  },
  {
    name: 'Spark',
    description: 'Bitcoin payments via the Spark protocol with Flashnet integration.',
    color: 'text-white',
    border: 'hover:border-white/20',
    logo: '/icons/spark/Asterisk/Spark Asterisk White.svg',
  },
  {
    name: 'Arkade',
    description: 'Virtual UTXO-based Bitcoin transactions with automatic boarding.',
    color: 'text-violet-500',
    border: 'hover:border-violet-500/30',
    logo: '/icons/arkade/arkade-icon.svg',
  },
  {
    name: 'Nostr',
    description: 'Decentralized identity and event signing via NIP-07 compatible interface.',
    color: 'text-[#7B50C2]',
    border: 'hover:border-[#7B50C2]/30',
    icon: AtSign,
  },
]

export const RateExtension = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background-dark text-white font-display overflow-x-hidden">
      <SEO
        title="Browser Extension"
        description="Rate is a multi-protocol Bitcoin browser extension wallet for RGB, Lightning, Spark, Arkade, and Nostr. Manage assets, swap, and connect to dApps — all from your browser toolbar."
        url="/products/extension"
      />

      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-green-500/20 rounded-full blur-[120px] -z-10 opacity-40" />
        <div className="absolute bottom-0 left-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-green-500/10 rounded-full blur-[100px] -z-10 opacity-30" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-gray-950/50 -z-10" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

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
                <div className="space-y-4 mb-8">
                  <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                    {t('Extension')}
                  </h1>
                  <p className="text-base sm:text-xl text-slate-400 leading-relaxed">
                    {t('A multi-protocol Bitcoin wallet, right in your browser. Connect to dApps and manage assets across RGB, Lightning, Spark, Arkade, and Nostr from a single extension.')}
                  </p>
                </div>
              </AnimateIn>

              <AnimateIn variant="fade-up" delay={250}>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button
                    size="lg"
                    onClick={() => window.open(SOCIALS.telegram, '_blank')}
                    className="bg-green-500 hover:bg-green-600 flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                    <LockOpen className="w-4 h-4" />
                    {t('Get Early Access')}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => window.open(DOCS.rateExtension, '_blank')}
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

            {/* Right — extension popup mockup */}
            <AnimateIn variant="scale" delay={200} duration={800} className="min-w-0 mt-8 lg:mt-0">
              <div className="relative group min-w-0">
                <div className="relative max-w-[360px] mx-auto">
                  <div
                    className="absolute inset-0 rounded-2xl blur-2xl opacity-60 group-hover:opacity-75 transition-opacity duration-500"
                    style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.55) 0%, rgba(99,102,241,0.35) 50%, rgba(168,85,247,0.45) 100%)' }}
                  />
                  <div className="relative bg-[#0d1f14] rounded-2xl shadow-2xl border border-white/10 overflow-hidden p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-widest text-white/80 uppercase">Rate · Kaleidoswap</span>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-green-400" />
                        <span className="text-[9px] text-green-400 font-semibold uppercase tracking-wider">Live</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[9px] font-semibold tracking-widest text-slate-500 uppercase mb-1">Total Balance</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-white">531,124</span>
                        <span className="text-[10px] font-semibold bg-white/10 text-white/70 px-1.5 py-0.5 rounded">SATS</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">$432.37</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {['Deposit', 'Swap', 'Withdraw'].map((label) => (
                        <div key={label} className="flex items-center justify-center bg-green-500/15 border border-green-500/25 rounded-xl py-2">
                          <span className="text-[10px] font-semibold text-green-300">{t(label)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      {[
                        { name: 'Bitcoin', amount: '531,124', unit: 'SATS', color: 'bg-[#F7931A]', symbol: '₿' },
                        { name: 'USDT', amount: '128.50', unit: 'USDT', color: 'bg-emerald-500', symbol: '₮' },
                      ].map((asset) => (
                        <div key={asset.name} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-3">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full ${asset.color} flex items-center justify-center text-white text-sm font-bold`}>{asset.symbol}</div>
                            <span className="text-sm font-semibold text-white">{asset.name}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-white">{asset.amount}</p>
                            <p className="text-[10px] text-slate-400">{asset.unit}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="glass-card p-6 rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">{t(feature.title)}</h3>
                <p className="text-slate-400 text-sm">{t(feature.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Protocols */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">{t('Five Protocols, One Extension')}</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            {t('Rate connects to RGB, Lightning, Spark, Arkade, and Nostr through a pluggable protocol adapter architecture. No switching between wallets.')}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {protocols.map((protocol) => (
              <div
                key={protocol.name}
                className={`glass-card p-6 rounded-xl text-center transition-colors ${protocol.border} last:col-span-2 last:max-w-[calc(50%-12px)] last:mx-auto md:last:col-span-1 md:last:max-w-none md:last:mx-0`}
              >
                {protocol.logo ? (
                  <img src={protocol.logo} alt={protocol.name} className="w-10 h-10 mx-auto mb-4 object-contain" />
                ) : protocol.icon ? (
                  <protocol.icon className={`w-10 h-10 mx-auto mb-4 ${protocol.color}`} />
                ) : null}
                <h3 className={`text-lg font-bold mb-2 ${protocol.color}`}>{protocol.name}</h3>
                <p className="text-slate-500 text-sm">{t(protocol.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sovereignty */}
      <section className="py-20 bg-gray-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">{t('Your keys. Your assets. Your network.')}</h2>
                <p className="text-slate-400 mb-6">
                  {t('Rate is self-custodial by design. Your seed never leaves the extension, your traffic never leaves your machine, and your funds never sit on our servers — because there are none.')}
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    'Self-custody by default — no accounts, no KYC',
                    'No tracking, no telemetry, no analytics',
                    'Connect to your own RGB Lightning Node',
                    'Open-source and independently auditable',
                    'Local-first — no servers in the payment path',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-slate-300">
                      <Check className="w-4 h-4 text-green-400 shrink-0" />
                      {t(item)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-4">
                <div className="glass-card p-5 rounded-xl">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center mb-3">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-1">{t('Non-Custodial')}</h3>
                  <p className="text-slate-400 text-sm">{t('You hold your private keys. No third party — including KaleidoSwap — can access, freeze, or move your funds.')}</p>
                </div>
                <div className="glass-card p-5 rounded-xl">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center mb-3">
                    <Server className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-1">{t('Bring Your Own Node')}</h3>
                  <p className="text-slate-400 text-sm">{t('Point Rate at your own RGB Lightning Node for full sovereignty over routing, channels, and asset issuance.')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">{t('Get Started')}</h2>

          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { step: '01', title: 'Join Early Access', desc: 'Request access via our Telegram community to get the extension build.' },
              { step: '02', title: 'Load Extension', desc: 'Enable Developer mode in Chrome, then load the unpacked dist/ folder.' },
              { step: '03', title: 'Create Wallet', desc: 'Create or import a seed, set a password, and connect to your RGB Lightning Node.' },
              { step: '04', title: 'Start Using', desc: 'Send, receive, swap, and connect your wallet to any WebLN-compatible dApp.' },
            ].map((item) => (
              <div key={item.step} className="text-center max-w-[220px] md:max-w-none mx-auto">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-400">{item.step}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{t(item.title)}</h3>
                <p className="text-slate-400 text-sm">{t(item.desc)}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Button
              size="lg"
              onClick={() => window.open(SOCIALS.telegram, '_blank')}
              className="bg-green-500 hover:bg-green-600 flex items-center gap-2"
            >
              <LockOpen className="w-4 h-4" />
              {t('Get Early Access')}
            </Button>
          </div>
        </div>
      </section>

      <Footer {...footerConfig} />
    </div>
  )
}
