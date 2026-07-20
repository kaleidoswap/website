// src/pages/products/AITools.tsx
import {
  Bot, Brain, Server, Sparkles, Download, ExternalLink, ArrowRight, ArrowUp, Check, Copy,
  MessageSquare, Mic, Github, Zap, CalendarClock, Sliders,
  UserCheck, Layers, Wallet, Coins, PieChart, Activity, ArrowLeftRight, FileText,
  Lock, Terminal, Repeat, ChevronDown,
} from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { SEO } from '@/components/common/SEO'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/footer/Footer'
import { Button } from '@/components/common/Button'
import { AnimateIn } from '@/components/animations/AnimateIn'
import { footerConfig } from '@/constants/footer'
import { STATIC_PAGE_META } from '@/constants/pageMeta'
import { FinalCTA } from '@/components/home/FinalCTA'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const KALEIDO_AGENT_REPO = 'https://github.com/kaleidoswap/kaleido-agent'

const heroAnchors = [
  { label: 'KaleidoAgent', href: '#kaleido-agent', icon: Bot },
  { label: 'KaleidoMind', href: '#kaleido-mind', icon: Brain },
  { label: 'MCP Servers', href: '#mcp-servers', icon: Server },
  { label: 'Skills', href: '#skills', icon: Sparkles },
]

const agentFeatures = [
  {
    icon: ArrowLeftRight,
    title: 'Trade & Transfer',
    text: 'Sends funds, swaps assets, runs DCA, and places limit orders.',
  },
  {
    icon: Sliders,
    title: 'Manage Liquidity',
    text: 'Rebalances and manages Lightning channel liquidity automatically.',
  },
  {
    icon: Zap,
    title: 'Pay for Tools',
    text: 'Pays for tools and API calls using the L402 protocol.',
  },
  {
    icon: Lock,
    title: 'Non-Custodial',
    text: 'Acts on your behalf without ever taking custody.',
  },
]

const mindPoints = [
  { icon: Mic, text: 'Voice mode for hands-free interaction' },
  { icon: Sliders, text: 'Configurable AI model selection' },
  { icon: UserCheck, text: 'Approval required for critical actions' },
]

const mcpServers = [
  {
    id: 'kaleido-mcp',
    name: 'KaleidoMCP',
    tag: '78 tools',
    icon: Layers,
    description: 'The unified gateway: DEX swaps, RLN wallet, Spark wallet, MPP/L402 payments, and market data behind a single MCP connection.',
    repo: 'https://github.com/kaleidoswap/kaleido-mcp',
    config: `{
  "mcpServers": {
    "kaleido": {
      "command": "npx",
      "args": ["-y", "kaleido-mcp"],
      "env": { "WDK_SEED": "your twelve word seed phrase" }
    }
  }
}`,
  },
  {
    id: 'wdk-wallet-mcp',
    name: 'WDK Wallet MCP',
    tag: '17 tools',
    icon: Wallet,
    description: 'Full control of an RGB Lightning Node wallet: balances, invoices, payments, channels, atomic swap execution.',
    repo: 'https://github.com/kaleidoswap/wdk-wallet-mcp',
    config: `{
  "mcpServers": {
    "wdk_wallet": {
      "command": "node",
      "args": ["/path/to/wdk-wallet-mcp/dist/index.js"],
      "env": { "RLN_NODE_URL": "http://localhost:3001" }
    }
  }
}`,
  },
  {
    id: 'wdk-wallet-spark-mcp',
    name: 'WDK Wallet Spark MCP',
    tag: '13 tools',
    icon: Coins,
    description: 'Same wallet control for Spark: balances, Lightning, token transfers, bridge deposits/withdrawals.',
    repo: 'https://github.com/kaleidoswap/wdk-wallet-spark-mcp',
    config: `{
  "mcpServers": {
    "wdk_wallet_spark": {
      "command": "node",
      "args": ["/path/to/wdk-wallet-spark-mcp/dist/index.js"],
      "env": { "WDK_SPARK_SEED": "your twelve word seed phrase" }
    }
  }
}`,
  },
]

const SKILLS_REPO_BASE = 'https://raw.githubusercontent.com/kaleidoswap/kaleido-agent/main/skills'
const SKILLS_GITHUB_BASE = 'https://github.com/kaleidoswap/kaleido-agent/blob/main/skills'

const downloadSkillFile = async (slug: string) => {
  try {
    const res = await fetch(`${SKILLS_REPO_BASE}/${slug}/SKILL.md`)
    const text = await res.text()
    const blob = new Blob([text], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${slug}-SKILL.md`
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  } catch {
    // Fallback if the fetch is blocked (offline, CORS): open the raw file directly
    window.open(`${SKILLS_REPO_BASE}/${slug}/SKILL.md`, '_blank')
  }
}

const skills = [
  {
    name: 'KaleidoAgent',
    description: 'The core autonomous behavior — maintains target BTC, USDT and XAUT allocations across Bitcoin L2s through a single unified MCP connection.',
    slug: 'kaleidoagent',
    icon: Bot,
  },
  {
    name: 'Portfolio Manager',
    description: 'Tracks allocations across Bitcoin, Lightning, Spark and RGB assets; rebalances with trustless atomic swaps when they drift.',
    slug: 'portfolio-manager',
    icon: PieChart,
  },
  {
    name: 'Channel Manager',
    description: 'Watches Lightning channel health and liquidity, flushes stuck transfers, buys inbound capacity via LSPS1 when it runs low.',
    slug: 'channel-manager',
    icon: Activity,
  },
  {
    name: 'Dollar Cost Averaging',
    description: 'Runs scheduled, price-aware purchases of target assets, bounded by user-set caps.',
    slug: 'dca',
    icon: CalendarClock,
  },
  {
    name: 'Wallet Assistant',
    description: 'Conversational interface for balances, invoices, payments and swaps.',
    slug: 'wallet-assistant',
    icon: MessageSquare,
  },
  {
    name: 'Cross-L2 Operator',
    description: 'Moves funds between Spark, Lightning and on-chain Bitcoin without leaving the agent.',
    slug: 'cross-l2',
    icon: ArrowLeftRight,
  },
  {
    name: 'KaleidoSwap Trading',
    description: 'Quotes and executes atomic swaps, places REST orders, and manages open positions on the KaleidoSwap DEX.',
    slug: 'kaleidoswap',
    icon: Repeat,
  },
  {
    name: 'MPP',
    description: 'Pays for HTTP 402-gated APIs and pay-per-call services over Lightning using the Machine Payments Protocol.',
    slug: 'mpp',
    icon: Lock,
  },
  {
    name: 'Node Manager',
    description: 'Starts, stops and monitors the RGB Lightning Node, unlocks the wallet, and inspects channels, balances and invoices.',
    slug: 'node-manager',
    icon: Terminal,
  },
]

const CodeBlock = ({ code, filename }: { code: string; filename: string }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative bg-gray-900 rounded-xl overflow-hidden w-full max-w-full border border-white/10">
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-950/80 border-b border-white/5">
        <div className="flex items-center gap-2 min-w-0">
          <FileText className="w-3.5 h-3.5 text-slate-600 shrink-0" />
          <span className="text-xs text-slate-500 font-mono truncate">{filename}</span>
        </div>
        <button
          onClick={handleCopy}
          className="text-slate-500 hover:text-white transition-colors shrink-0 ml-3"
          aria-label="Copy config"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm max-w-full">
        <code className="text-slate-300 text-xs sm:text-sm">{code}</code>
      </pre>
    </div>
  )
}

const SkillCard = ({ skill }: { skill: (typeof skills)[number] }) => {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div layout className="relative glass-card rounded-xl p-5" transition={{ layout: { duration: 0.25 } }}>
      <div className="flex items-center gap-4">
        <span className="w-10 h-10 rounded-lg bg-secondary-500/10 text-secondary-400 flex items-center justify-center shrink-0">
          <skill.icon className="w-5 h-5" />
        </span>
        <div className="min-w-0 flex-1">
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            className="flex items-center gap-1.5 font-bold text-white hover:text-secondary-300 transition-colors"
          >
            {t(skill.name)}
            <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex">
              <ChevronDown className="w-4 h-4" />
            </motion.span>
          </button>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <a
            href={`${SKILLS_GITHUB_BASE}/${skill.slug}/SKILL.md`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('View on GitHub')}
            title={t('View on GitHub')}
            className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-colors flex items-center justify-center"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={() => downloadSkillFile(skill.slug)}
            aria-label={t('Download SKILL.md')}
            title={t('Download SKILL.md')}
            className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-colors flex items-center justify-center"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-slate-400 text-sm leading-relaxed pt-4">{t(skill.description)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const heroChatScript = [
  { role: 'user', text: 'Swap 0.01 BTC to USDT at the best rate' },
  { role: 'thinking', text: 'Fetching quotes from market makers…' },
  { role: 'assistant', text: 'Best route: trustless atomic swap — 0.01 BTC → 974 USDT. Approve?' },
  { role: 'user', text: 'Approve' },
  { role: 'success', text: 'Swap settled — HTLC claimed, no custody.' },
] as const

const HeroChat = () => {
  const { t } = useTranslation()
  const [step, setStep] = useState(0)
  const [typed, setTyped] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    let typeInterval: ReturnType<typeof setInterval> | undefined

    if (step >= heroChatScript.length) {
      // Hold the finished conversation, then restart the loop
      timers.push(setTimeout(() => setStep(0), 3500))
    } else {
      const next = heroChatScript[step]
      if (next.role === 'user') {
        // Type into the input bar, press send, then release the bubble
        const fullText = t(next.text)
        timers.push(
          setTimeout(() => {
            let i = 0
            typeInterval = setInterval(() => {
              i += 1
              setTyped(fullText.slice(0, i))
              if (i >= fullText.length) {
                if (typeInterval) clearInterval(typeInterval)
                timers.push(
                  setTimeout(() => {
                    setSending(true)
                    timers.push(
                      setTimeout(() => {
                        setSending(false)
                        setTyped('')
                        setStep((s) => s + 1)
                      }, 220),
                    )
                  }, 450),
                )
              }
            }, 38)
          }, step === 0 ? 900 : 600),
        )
      } else {
        timers.push(
          setTimeout(() => setStep((s) => s + 1), next.role === 'thinking' ? 600 : 1500),
        )
      }
    }

    return () => {
      timers.forEach(clearTimeout)
      if (typeInterval) clearInterval(typeInterval)
    }
  }, [step, t])

  // The thinking indicator disappears once the reply lands, like a real chat
  const visible = heroChatScript
    .slice(0, step)
    .filter((message, index) => !(message.role === 'thinking' && step > index + 1))

  return (
    <div className="relative group min-w-0">
      <div className="absolute -inset-4 bg-gradient-to-br from-green-500/20 to-secondary-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
      <div className="relative bg-gray-900 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-950/80 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <span className="text-xs text-slate-500 font-mono">kaleidoswap</span>
          <span className="flex items-center gap-1.5 text-xs px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            {t('running')}
          </span>
        </div>
        <div className="p-5 h-[280px] sm:h-[300px] flex flex-col justify-end gap-3 text-sm overflow-hidden">
          <AnimatePresence mode="popLayout">
            {visible.map((message) => (
              <motion.div
                key={message.text}
                layout
                initial={
                  message.role === 'user'
                    ? { opacity: 0, y: 46, scale: 0.9 } // rises from the input bar below
                    : { opacity: 0, y: 12, scale: 0.97 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                className={message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}
              >
                {message.role === 'user' ? (
                  <div className="bg-secondary-500/20 text-secondary-100 rounded-xl rounded-br-sm px-4 py-2.5 max-w-[80%]">
                    {t(message.text)}
                  </div>
                ) : message.role === 'thinking' ? (
                  <div className="text-slate-500 italic text-xs px-1 flex items-center gap-2">
                    <span className="flex gap-1">
                      <span className="w-1 h-1 rounded-full bg-slate-500 animate-pulse" />
                      <span className="w-1 h-1 rounded-full bg-slate-500 animate-pulse [animation-delay:150ms]" />
                      <span className="w-1 h-1 rounded-full bg-slate-500 animate-pulse [animation-delay:300ms]" />
                    </span>
                    {t(message.text)}
                  </div>
                ) : message.role === 'success' ? (
                  <div className="bg-green-500/10 text-slate-200 rounded-xl rounded-bl-sm px-4 py-2.5 max-w-[80%] border border-green-500/20 flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    <span>{t(message.text)}</span>
                  </div>
                ) : (
                  <div className="bg-white/5 text-slate-200 rounded-xl rounded-bl-sm px-4 py-2.5 max-w-[80%] border border-white/5">
                    {t(message.text)}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 border-t border-white/5">
          <div className="flex-1 min-w-0 text-sm truncate">
            {typed ? (
              <span className="text-slate-200">
                {typed}
                <span className="w-0.5 h-[1.1em] bg-green-400/70 animate-pulse inline-block align-middle ml-0.5" />
              </span>
            ) : (
              <span className="text-slate-600">{t('Ask anything…')}</span>
            )}
          </div>
          <Mic className="w-4 h-4 text-secondary-400 shrink-0" />
          <motion.span
            aria-hidden="true"
            animate={{ scale: sending ? 0.8 : 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 ${
              typed ? 'bg-green-500 text-gray-950' : 'bg-white/5 text-slate-600'
            }`}
          >
            <ArrowUp className="w-4 h-4" />
          </motion.span>
        </div>
      </div>
    </div>
  )
}

const SectionEyebrow = ({ label, color }: { label: string; color: 'green' | 'violet' }) => (
  <span
    className={`inline-block text-xs font-semibold uppercase tracking-wider mb-3 ${
      color === 'green' ? 'text-green-400' : 'text-secondary-400'
    }`}
  >
    {label}
  </span>
)

export const AITools = () => {
  const { t } = useTranslation()
  const [activeServer, setActiveServer] = useState(0)

  return (
    <div className="min-h-screen bg-background-dark text-white font-display overflow-x-hidden">
      <SEO {...STATIC_PAGE_META['/products/ai-tools']} url="/products/ai-tools" />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'KaleidoSwap AI Tools',
            description: 'Autonomous agents, on-device AI assistance, and open source tools that bring AI to Bitcoin apps and enable agentic payments.',
            url: 'https://kaleidoswap.com/products/ai-tools',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'KaleidoAgent', url: 'https://kaleidoswap.com/products/ai-tools#kaleido-agent' },
              { '@type': 'ListItem', position: 2, name: 'KaleidoMind', url: 'https://kaleidoswap.com/products/ai-tools#kaleido-mind' },
              { '@type': 'ListItem', position: 3, name: 'MCP Servers', url: 'https://kaleidoswap.com/products/ai-tools#mcp-servers' },
              { '@type': 'ListItem', position: 4, name: 'Skills', url: 'https://kaleidoswap.com/products/ai-tools#skills' },
            ],
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kaleidoswap.com' },
              { '@type': 'ListItem', position: 2, name: 'AI Tools', item: 'https://kaleidoswap.com/products/ai-tools' },
            ],
          })}
        </script>
      </Helmet>

      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-green-500/15 rounded-full blur-[120px] -z-10 opacity-50" />
        <div className="absolute top-20 right-1/4 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-secondary-500/15 rounded-full blur-[100px] -z-10 opacity-50" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-left">
              <AnimateIn variant="fade-down" duration={500}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-secondary-500/30 bg-secondary-500/10 mb-6 w-fit">
                  <Sparkles className="w-4 h-4 text-secondary-400" />
                  <span className="text-xs font-semibold text-secondary-400 uppercase tracking-wider">
                    {t('AI Tools')}
                  </span>
                </div>
              </AnimateIn>

              <AnimateIn variant="fade-up" delay={100}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
                  {t('AI on Bitcoin Rails')}
                </h1>
                <p className="text-base sm:text-xl text-slate-400 max-w-xl leading-relaxed">
                  {t('Autonomous agents, on-device AI assistance, and open source tools that bring AI to Bitcoin apps and enable agentic payments.')}
                </p>
              </AnimateIn>

              <AnimateIn variant="fade-up" delay={250}>
                <div className="flex flex-wrap gap-3 mt-10">
                  {heroAnchors.map((anchor) => (
                    <a
                      key={anchor.href}
                      href={anchor.href}
                      className="glass-card flex items-center gap-2 px-4 py-2.5 rounded-full text-sm text-slate-300 hover:text-white transition-colors"
                    >
                      <anchor.icon className="w-4 h-4 text-green-400" />
                      {t(anchor.label)}
                    </a>
                  ))}
                </div>
              </AnimateIn>
            </div>

            <AnimateIn variant="scale" delay={300} duration={800} className="min-w-0">
              <HeroChat />
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* KaleidoAgent */}
      <section id="kaleido-agent" className="py-20 bg-gray-950/50 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateIn variant="fade-up" className="text-center">
            <SectionEyebrow label={t('Autonomous Agent')} color="green" />
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white shadow-lg shadow-green-500/30 shrink-0">
                <Bot className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">{t('KaleidoAgent')}</h2>
            </div>
            <p className="text-slate-400 mb-12 leading-relaxed max-w-2xl mx-auto">
              {t("AI portfolio manager and wallet operator. Monitors allocations and manages assets, acting on the user's behalf without ever taking custody.")}
            </p>
          </AnimateIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {agentFeatures.map((feature, index) => (
              <AnimateIn key={feature.title} variant="fade-up" delay={index * 80}>
                <div className="glass-card rounded-xl p-6 h-full flex flex-col items-center text-center">
                  <span className="w-12 h-12 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center shrink-0 mb-4">
                    <feature.icon className="w-6 h-6" />
                  </span>
                  <h3 className="font-bold text-white mb-2">{t(feature.title)}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{t(feature.text)}</p>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn variant="fade-up" className="flex justify-center">
            <Button
              size="lg"
              onClick={() => window.open(KALEIDO_AGENT_REPO, '_blank')}
              className="bg-green-500 hover:bg-green-600 flex items-center justify-center gap-2 w-fit"
            >
              <Github className="w-4 h-4" />
              {t('View on GitHub')}
              <ExternalLink className="w-4 h-4" />
            </Button>
          </AnimateIn>
        </div>
      </section>

      {/* KaleidoMind */}
      <section id="kaleido-mind" className="py-20 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Chat mockup */}
            <AnimateIn variant="scale" delay={200} duration={800} className="order-2 lg:order-1 min-w-0">
              <div className="relative group min-w-0">
                <div className="absolute -inset-4 bg-gradient-to-br from-secondary-500/20 to-green-500/10 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                <div className="relative bg-gray-900 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                  <div className="flex items-center justify-between px-4 py-3 bg-gray-950/80 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/70" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                      <div className="w-3 h-3 rounded-full bg-green-500/70" />
                    </div>
                    <span className="text-xs text-slate-500 font-mono">kaleido-mind</span>
                    <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded bg-secondary-500/10 text-secondary-300 border border-secondary-500/20 font-mono">
                      <Sliders className="w-3 h-3" />
                      {t('local model')}
                    </span>
                  </div>
                  <div className="p-5 space-y-3 text-sm">
                    <div className="flex justify-end">
                      <div className="bg-secondary-500/20 text-secondary-100 rounded-xl rounded-br-sm px-4 py-2.5 max-w-[80%]">
                        {t('Send 50k sats to Alice')}
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="text-slate-500 italic text-xs px-1 flex items-center gap-2">
                        <span className="flex gap-1">
                          <span className="w-1 h-1 rounded-full bg-slate-500 animate-pulse" />
                          <span className="w-1 h-1 rounded-full bg-slate-500 animate-pulse [animation-delay:150ms]" />
                          <span className="w-1 h-1 rounded-full bg-slate-500 animate-pulse [animation-delay:300ms]" />
                        </span>
                        {t('Checking balance… routing via Lightning…')}
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white/5 text-slate-200 rounded-xl rounded-bl-sm px-4 py-2.5 max-w-[80%] border border-white/5">
                        {t('Payment ready — 50,000 sats via Lightning. Approve?')}
                        <div className="flex gap-2 mt-3">
                          <span className="text-xs px-3 py-1 rounded-lg bg-green-500/15 text-green-400 border border-green-500/30 font-medium">
                            {t('Approve')}
                          </span>
                          <span className="text-xs px-3 py-1 rounded-lg bg-white/5 text-slate-400 border border-white/10 font-medium">
                            {t('Reject')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                      <Mic className="w-4 h-4 text-secondary-400 shrink-0" />
                      <div className="flex items-center gap-0.5 h-6">
                        {[3, 5, 8, 12, 7, 10, 14, 9, 6, 11, 8, 5, 9, 13, 7, 4, 8, 6, 10, 5].map((h, i) => (
                          <span
                            key={i}
                            className="w-0.5 rounded-full bg-secondary-400/50"
                            style={{ height: `${h * 2}px` }}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-slate-600 ml-auto font-mono">{t('voice input')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateIn>

            <AnimateIn variant="fade-up" className="order-1 lg:order-2">
              <SectionEyebrow label={t('Sovereign AI')} color="violet" />
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary-400 to-secondary-600 flex items-center justify-center text-white shadow-lg shadow-secondary-500/30 shrink-0">
                  <Brain className="w-6 h-6" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">{t('KaleidoMind')}</h2>
              </div>
              <p className="text-slate-400 mb-8 leading-relaxed">
                {t('On-device AI assistant integrated into the Desktop App. Get a quote, build a payment, find a contact, or make a swap in plain language.')}
              </p>
              <ul className="space-y-4 mb-8">
                {mindPoints.map((point) => (
                  <li key={point.text} className="flex items-start gap-3 text-slate-300">
                    <span className="w-8 h-8 rounded-lg bg-secondary-500/10 text-secondary-400 flex items-center justify-center shrink-0">
                      <point.icon className="w-4 h-4" />
                    </span>
                    <span className="pt-1.5">{t(point.text)}</span>
                  </li>
                ))}
              </ul>
              <Button
                size="lg"
                onClick={() => (window.location.href = '/downloads')}
                className="bg-secondary-500 hover:bg-secondary-600 shadow-[0_2px_8px_rgba(138,92,246,0.2)] hover:shadow-[0_4px_14px_rgba(138,92,246,0.3)] flex items-center justify-center gap-2 w-fit"
              >
                <Download className="w-4 h-4" />
                {t('Try in Desktop App')}
              </Button>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* MCP Servers */}
      <section id="mcp-servers" className="py-20 bg-gray-950/50 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateIn variant="fade-up">
            <SectionEyebrow label={t('Open Protocol')} color="green" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white shadow-lg shadow-green-500/30 shrink-0">
                <Server className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">{t('MCP Servers')}</h2>
            </div>
            <p className="text-slate-400 mb-10 md:max-w-[calc((100%-1rem)/2)] leading-relaxed">
              {t('Three open source servers expose KaleidoSwap and WDK wallet operations as typed tools for any MCP-compatible client.')}
            </p>
          </AnimateIn>

          {/* Selectable sub-cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {mcpServers.map((server, index) => {
              const isActive = activeServer === index
              return (
                <motion.button
                  key={server.id}
                  onClick={() => setActiveServer(index)}
                  whileHover={{ y: -3 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`text-left p-5 rounded-xl border transition-colors duration-200 ${
                    isActive
                      ? 'bg-green-500/10 border-green-500/30'
                      : 'glass-card border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      isActive ? 'bg-green-500/15 text-green-400' : 'bg-white/5 text-slate-400'
                    }`}>
                      <server.icon className="w-5 h-5" />
                    </span>
                    {isActive && <Check className="w-4 h-4 text-green-400" />}
                  </div>
                  <h3 className={`font-bold mb-2 ${isActive ? 'text-green-400' : 'text-white'}`}>
                    {t(server.name)}
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/10">
                    {t(server.tag)}
                  </span>
                </motion.button>
              )
            })}
          </div>

          {/* Active detail panel + config box */}
          <div className="grid md:grid-cols-2 gap-12 items-start min-w-0">
            <div className="relative h-[220px] md:h-[180px] min-w-0">
              {mcpServers.map((server, index) => (
                <div
                  key={server.id}
                  className={`absolute inset-0 flex flex-col justify-start transition-opacity duration-300 ${
                    index === activeServer ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <h3 className="text-2xl font-bold mb-3">{t(server.name)}</h3>
                  <p className="text-slate-400 mb-5 leading-relaxed">{t(server.description)}</p>
                  <a
                    href={server.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 flex items-center gap-1 w-fit"
                  >
                    {t('View source')}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
            <div className="min-w-0 overflow-hidden">
              <CodeBlock code={mcpServers[activeServer].config} filename="claude_desktop_config.json" />
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-20 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateIn variant="fade-up">
            <SectionEyebrow label={t('Extensible Behaviors')} color="violet" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary-400 to-secondary-600 flex items-center justify-center text-white shadow-lg shadow-secondary-500/30 shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">{t('Skills')}</h2>
            </div>
            <p className="text-slate-400 mb-10 md:max-w-[calc((100%-1rem)/2)] leading-relaxed">
              {t('Self-contained SKILL.md file for specific behaviors loaded at runtime, editable and extendable without touching the runtime code.')}
            </p>
          </AnimateIn>

          <div className="grid md:grid-cols-2 gap-4 items-start">
            {skills.map((skill, index) => (
              <AnimateIn key={skill.slug} variant="fade-up" delay={index * 60}>
                <SkillCard skill={skill} />
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />

      <Footer {...footerConfig} />
    </div>
  )
}
