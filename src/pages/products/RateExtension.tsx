import {
  Shield,
  Zap,
  Globe,
  ArrowRight,
  Check,
  Wallet,
  ArrowLeftRight,
  Key,
  Layers,
  QrCode,
  Clock,
  BookOpen,
  Bot,
  Copy,
  LockOpen,
} from 'lucide-react'
import { useState } from 'react'
import rgbLogo from '@/assets/icons/rgb/rgb-logo.svg'
import sparkAsterisk from '@/assets/icons/spark/Asterisk/Spark Asterisk White.svg'
import arkadeLogo from '@/assets/icons/arkade/arkade-icon.svg'
import { SEO } from '@/components/common/SEO'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/footer/Footer'
import { Button } from '@/components/common/Button'
import { AnimateIn } from '@/components/animations/AnimateIn'
import { FinalCTA } from '@/components/home/FinalCTA'
import { footerConfig } from '@/constants/footer'
import { DOCS, SOCIALS } from '@/constants/urls'
import { useTranslation } from 'react-i18next'

const features = [
  {
    icon: Layers,
    title: 'Multi-Protocol',
    description: 'RGB Lightning, Spark, and Arkade in one unified wallet interface.',
  },
  {
    icon: Shield,
    title: 'Self-Custody',
    description: 'Argon2id password hashing, AES-GCM encrypted mnemonic. Your keys never leave your device.',
  },
  {
    icon: Zap,
    title: 'WebLN & Nostr',
    description: 'Built-in window.rgbwebln provider and NIP-07 signer for seamless dApp connectivity.',
  },
  {
    icon: Bot,
    title: 'AI Agent',
    description: 'Built-in conversational agent for wallet operations — send, receive, and query balances via chat.',
  },
]

const capabilities = [
  {
    icon: Wallet,
    title: 'Unified Dashboard',
    description: 'Aggregated balances across all connected protocols with real-time fiat conversion.',
  },
  {
    icon: QrCode,
    title: 'Send & Receive',
    description: 'Multi-network deposit and withdraw with smart route resolution. Auto-detect addresses and generate invoices.',
  },
  {
    icon: ArrowLeftRight,
    title: 'Atomic Swaps',
    description: 'Swap between RGB assets with live quotes powered by the Kaleido SDK. Price impact warnings included.',
  },
  {
    icon: Globe,
    title: 'dApp Connector',
    description: 'Injects window.rgbwebln into every page. Permission-based access control for every dApp interaction.',
  },
  {
    icon: Key,
    title: 'Nostr Identity',
    description: 'Built-in keypair management with NIP-07 signing. Your decentralized identity, right in the browser.',
  },
  {
    icon: Clock,
    title: 'Activity Feed',
    description: 'Unified transaction history across all protocols, with filtering by type and network.',
  },
]

const protocols = [
  {
    name: 'RGB',
    description: 'Smart contracts and token issuance on Bitcoin with client-side validation.',
    color: 'text-red-400',
    border: 'hover:border-red-500/30',
    logo: rgbLogo as string,
  },
  {
    name: 'Lightning',
    description: 'Instant, low-fee Bitcoin payments over the Lightning Network.',
    color: 'text-yellow-400',
    border: 'hover:border-yellow-500/30',
    logo: null,
  },
  {
    name: 'Spark',
    description: 'Bitcoin payments via the Spark protocol with Flashnet integration.',
    color: 'text-white',
    border: 'hover:border-white/20',
    logo: sparkAsterisk as string,
  },
  {
    name: 'Arkade',
    description: 'Virtual UTXO-based Bitcoin transactions with automatic boarding.',
    color: 'text-violet-500',
    border: 'hover:border-violet-500/30',
    logo: arkadeLogo as string,
  },
]

const webApiCode = `// Wait for the provider to be ready
window.addEventListener('rgbWebLNReady', async () => {
  await window.rgbwebln.enable();

  // Get node info
  const info = await window.rgbwebln.getInfo();

  // Create an RGB invoice
  const { invoice } = await window.rgbwebln.rgbInvoice({
    asset_id: 'rgb:...',
    duration_seconds: 3600,
  });

  // Send an asset
  const { txid } = await window.rgbwebln.sendAsset({
    asset_id: 'rgb:...',
    amount: 100,
    recipient_id: '...',
  });

  // Get BTC balance
  const balance = await window.rgbwebln.getBalance();
});`

const CodeBlock = ({ code, language }: { code: string; language: string }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative bg-gray-900 rounded-xl overflow-hidden w-full max-w-full">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-white/5">
        <span className="text-xs text-slate-500">{language}</span>
        <button onClick={handleCopy} className="text-slate-500 hover:text-white transition-colors">
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm max-w-full">
        <code className="text-slate-300 text-xs sm:text-sm">{code}</code>
      </pre>
    </div>
  )
}

export const RateExtension = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background-dark text-white font-display overflow-x-hidden">
      <SEO
        title="Extension"
        description="Rate is a multi-protocol Bitcoin browser extension wallet for RGB Lightning, Spark, and Arkade. Manage assets, swap, and connect to dApps — all from your browser toolbar."
        url="/products/rate-extension"
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
                    {t('A multi-protocol Bitcoin wallet, right in your browser. Manage assets across RGB Lightning, Spark, and Arkade — and connect to dApps — from a single extension.')}
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
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>{t('Non-custodial')}</span>
                  </div>
                  <div className="w-1 h-1 bg-slate-700 rounded-full" />
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>{t('Chrome & Firefox')}</span>
                  </div>
                  <div className="w-1 h-1 bg-slate-700 rounded-full" />
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>{t('WebLN & NIP-07')}</span>
                  </div>
                </div>
              </AnimateIn>
            </div>

            {/* Right — extension popup mockup */}
            <AnimateIn variant="scale" delay={200} duration={800} className="hidden lg:block min-w-0">
              <div className="relative group min-w-0">
                <div className="relative max-w-[360px] mx-auto">
                  <div
                    className="absolute inset-0 rounded-2xl blur-2xl opacity-60 group-hover:opacity-75 transition-opacity duration-500"
                    style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.55) 0%, rgba(99,102,241,0.35) 50%, rgba(168,85,247,0.45) 100%)' }}
                  />

                  <div className="relative bg-[#0d1f14] rounded-2xl shadow-2xl overflow-hidden">

                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <svg viewBox="0 0 208 208" className="w-5 h-5 shrink-0">
                          <path d="M69.7 207.3H0.9L35.3 172.9L69.7 207.3Z" fill="#6F32FF"/>
                          <path d="M138.4 1V69.8L104.1 35.4L138.4 1Z" fill="#17B581"/>
                          <path d="M138.4 138.5V207.4L104.1 172.9L138.4 138.5Z" fill="#17B581"/>
                          <path d="M138.4 69.7V1L172.8 35.4L138.4 69.8V69.7Z" fill="#17B581"/>
                          <path d="M69.7 138.5V69.7L104 104.1L69.7 138.5Z" fill="#15E99A"/>
                          <path d="M69.7 69.7V138.5L35.3 104.1L69.7 69.7Z" fill="#15E99A"/>
                          <path d="M138.5 207.4V138.6L172.8 173L138.5 207.4Z" fill="#17B581"/>
                          <path d="M0.9 0.9H69.7L35.3 35.3L0.9 0.9Z" fill="#6F32FF"/>
                          <path d="M207.2 207.3H138.4L172.8 172.9L207.2 207.3Z" fill="#17B581"/>
                          <path d="M138.4 1H207.2L172.8 35.4L138.4 1Z" fill="#17B581"/>
                          <path d="M138.5 69.7H69.7L104.1 35.4L138.5 69.7Z" fill="#17B581"/>
                          <path d="M69.6 138.5H138.4L104 172.9L69.6 138.5Z" fill="#17B581"/>
                          <path d="M138.4 138.5H69.6L104 104.2L138.4 138.5Z" fill="#15E99A"/>
                          <path d="M138.4 69.7L104.1 104.1L69.7 69.7H138.4Z" fill="#15E99A"/>
                        </svg>
                        <span className="text-[10px] font-bold tracking-widest text-white/80 uppercase">Kaleidoswap</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                          <img src={sparkAsterisk} className="w-3.5 h-3.5 object-contain" alt="Spark" />
                        </div>
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                        <div className="w-6 h-6 rounded-full bg-violet-600/60 flex items-center justify-center">
                          <img src={arkadeLogo} className="w-3.5 h-3.5 object-contain" alt="Arkade" />
                        </div>
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                      </div>
                    </div>

                    {/* Balance */}
                    <div className="px-4 pb-4">
                      <p className="text-[9px] font-semibold tracking-widest text-slate-500 uppercase mb-1">Total Balance</p>
                      <div className="flex items-baseline gap-2 mb-0.5">
                        <span className="text-3xl font-bold text-white">531.124</span>
                        <span className="text-[10px] font-semibold bg-white/10 text-white/70 px-1.5 py-0.5 rounded">SATS</span>
                      </div>
                      <p className="text-xs text-slate-500">432,37 USD</p>
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-3 gap-2 px-4 pb-4">
                      {[
                        { label: 'Deposit', path: 'M12 3v14M5 10l7 7 7-7' },
                        { label: 'Swap', path: 'M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4' },
                        { label: 'Withdraw', path: 'M12 21V7M5 14l7-7 7 7' },
                      ].map((btn) => (
                        <div key={btn.label} className="flex items-center justify-center gap-1.5 bg-green-500/15 border border-green-500/25 rounded-xl py-2 px-2">
                          <svg viewBox="0 0 24 24" className="w-3 h-3 text-green-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d={btn.path} />
                          </svg>
                          <span className="text-[10px] font-semibold text-green-300">{btn.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Your Assets */}
                    <div className="px-4 pb-2">
                      <p className="text-[9px] font-bold tracking-widest text-slate-500 uppercase mb-2">Your Assets</p>
                      <div className="flex gap-2 mb-3">
                        <div className="flex items-center gap-1 bg-white/5 border border-white/8 rounded-lg px-2 py-1">
                          <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide">Network</span>
                          <div className="flex gap-0.5">
                            <div className="w-3.5 h-3.5 rounded-full bg-[#EF4444]/20 flex items-center justify-center">
                              <img src={rgbLogo} className="w-2.5 h-2.5 object-contain" alt="RGB" />
                            </div>
                            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#fbbf24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                          </div>
                          <span className="text-[9px] text-slate-500">+1</span>
                          <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                        </div>
                        <div className="flex items-center gap-1 bg-white/5 border border-white/8 rounded-lg px-2 py-1">
                          <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide">Asset</span>
                          <div className="flex gap-0.5">
                            <div className="w-3.5 h-3.5 rounded-full bg-[#F7931A]/20 flex items-center justify-center text-[#F7931A] text-[7px] font-bold">₿</div>
                            <img src={sparkAsterisk} className="w-3.5 h-3.5 object-contain" alt="Spark" />
                          </div>
                          <span className="text-[9px] text-slate-500">+1</span>
                          <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                        </div>
                      </div>

                      {/* Bitcoin row */}
                      <div className="rounded-xl overflow-hidden mb-2" style={{ background: 'linear-gradient(135deg, rgba(247,147,26,0.18) 0%, rgba(247,147,26,0.06) 100%)' }}>
                        <div className="flex items-center justify-between p-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#F7931A] flex items-center justify-center text-white text-sm font-bold shrink-0">₿</div>
                            <div>
                              <p className="text-sm font-bold text-white">Bitcoin</p>
                              <div className="flex gap-1 mt-0.5">
                                <div className="w-3.5 h-3.5 rounded-full bg-[#EF4444]/20 flex items-center justify-center">
                                  <img src={rgbLogo} className="w-2.5 h-2.5 object-contain" alt="RGB" />
                                </div>
                                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#fbbf24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-base font-bold text-white">531.124</p>
                            <p className="text-[10px] text-slate-400">BTC</p>
                          </div>
                        </div>
                      </div>

                      {/* Test token row */}
                      <div className="rounded-xl overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.18) 0%, rgba(239,68,68,0.06) 100%)' }}>
                        <div className="flex items-center justify-between p-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                              <span className="text-[6px] font-black text-center leading-tight text-white/60">TEST<br/>TOKEN</span>
                            </div>
                            <div>
                              <p className="text-sm font-bold text-white">Test</p>
                              <div className="flex gap-1 mt-0.5">
                                <div className="w-3.5 h-3.5 rounded-full bg-[#EF4444]/20 flex items-center justify-center">
                                  <img src={rgbLogo} className="w-2.5 h-2.5 object-contain" alt="RGB" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-base font-bold text-white">0.00000010</p>
                            <p className="text-[10px] text-slate-400">TEST</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom nav */}
                    <div className="flex justify-around px-4 py-3 mt-1">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 9V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2v-3"/>
                            <path d="M14 12h8m0 0l-3-3m3 3l-3 3"/>
                          </svg>
                        </div>
                        <span className="text-[9px] text-green-400 font-semibold">Wallet</span>
                      </div>
                      {['Swap', 'Activity', 'Settings'].map((tab) => (
                        <div key={tab} className="flex flex-col items-center gap-1">
                          <div className="w-7 h-7 flex items-center justify-center">
                            <svg viewBox="0 0 24 24" className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              {tab === 'Swap' && <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/>}
                              {tab === 'Activity' && <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>}
                              {tab === 'Settings' && <><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></>}
                            </svg>
                          </div>
                          <span className="text-[9px] text-slate-500">{tab}</span>
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
                <feature.icon className="w-10 h-10 text-green-400 mb-4" />
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
          <h2 className="text-3xl font-bold text-center mb-4">{t('Four Protocols, One Extension')}</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            {t('Rate connects to RGB, Lightning, Spark, and Arkade through a pluggable protocol adapter architecture. No switching between wallets.')}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {protocols.map((protocol) => (
              <div
                key={protocol.name}
                className={`glass-card p-6 rounded-xl text-center transition-colors ${protocol.border}`}
              >
                {protocol.logo
                  ? <img src={protocol.logo} alt={protocol.name} className="w-10 h-10 mx-auto mb-4 object-contain" />
                  : (
                    <svg viewBox="0 0 24 24" className="w-10 h-10 mx-auto mb-4">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="#fbbf24" stroke="#fbbf24" strokeWidth="0.5" />
                    </svg>
                  )
                }
                <h3 className={`text-lg font-bold mb-2 ${protocol.color}`}>{protocol.name}</h3>
                <p className="text-slate-500 text-sm">{t(protocol.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-gray-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">{t('Everything You Need')}</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            {t('A full-featured wallet packed into a lightweight browser extension. Built with React, TypeScript, and the Kaleido SDK.')}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap) => (
              <div key={cap.title} className="glass-card p-6 rounded-xl">
                <cap.icon className="w-8 h-8 text-green-400 mb-4" />
                <h3 className="text-lg font-bold mb-2">{t(cap.title)}</h3>
                <p className="text-slate-400 text-sm">{t(cap.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Web API */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h2 className="text-4xl font-bold mb-3">{t('Web API')}</h2>
              <p className="text-slate-400 max-w-xl">
                {t('Rate injects window.rgbwebln into every page — a WebLN-compatible provider backed by the Kaleido SDK, ready for your dApp.')}
              </p>
            </div>
            <a
              href={DOCS.rateExtension}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 flex items-center gap-1 shrink-0"
            >
              {t('Full API reference')}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6 mt-4">
              {[
                { title: 'Enable & connect', desc: 'Request permission from the user to access the wallet.' },
                { title: 'Create invoices', desc: 'Generate RGB invoices with asset ID and duration. Returns a Lightning-compatible invoice string.' },
                { title: 'Send assets', desc: 'Transfer RGB-20 tokens or BTC to any recipient with a single call.' },
                { title: 'Balance & signing', desc: 'Query balances and sign Nostr events or messages via NIP-07 compatible interface.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-white">{t(item.title)}</p>
                    <p className="text-slate-400 text-sm">{t(item.desc)}</p>
                  </div>
                </div>
              ))}
            </div>
            <CodeBlock code={webApiCode} language="javascript" />
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-20 bg-gray-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">{t('Security First')}</h2>
                <p className="text-slate-400 mb-6">
                  {t('Your mnemonic is AES-GCM encrypted at rest and session-cached with an ephemeral key. Passwords are hashed with Argon2id. Nothing sensitive ever leaves the extension.')}
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    'Argon2id password hashing',
                    'AES-GCM encrypted mnemonic at rest',
                    'Session-cached with ephemeral key',
                    'Origin-scoped dApp permissions',
                    'Sensitive operations require confirmation popup',
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
                  <Shield className="w-8 h-8 text-green-400 mb-3" />
                  <h3 className="text-lg font-bold mb-1">{t('Non-Custodial')}</h3>
                  <p className="text-slate-400 text-sm">{t('You hold your private keys. No third party ever has access to your funds.')}</p>
                </div>
                <div className="glass-card p-5 rounded-xl">
                  <Key className="w-8 h-8 text-green-400 mb-3" />
                  <h3 className="text-lg font-bold mb-1">{t('Nostr Identity')}</h3>
                  <p className="text-slate-400 text-sm">{t('NIP-07 compatible key management. Sign events and authenticate across the Nostr ecosystem without exposing your private key.')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">{t('Get Started')}</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            {t('From install to first transaction — quick and secure.')}
          </p>

          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { step: '01', title: 'Join Early Access', desc: 'Request access via our Telegram community to get the extension build.' },
              { step: '02', title: 'Load Extension', desc: 'Enable Developer mode in Chrome, then load the unpacked dist/ folder.' },
              { step: '03', title: 'Create Wallet', desc: 'Set a password and connect to your RGB Lightning Node.' },
              { step: '04', title: 'Start Using', desc: 'Send, receive, swap, and connect your wallet to any WebLN-compatible dApp.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
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

      <FinalCTA />

      <Footer {...footerConfig} />
    </div>
  )
}
