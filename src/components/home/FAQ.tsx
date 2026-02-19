import { memo, useCallback, useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { AnimateIn } from '@/components/animations/AnimateIn'

// Static translation keys — defined outside any component so the array is
// never recreated. `t()` is applied once inside the component via useMemo.
const FAQ_KEYS = [
  {
    question: 'What is KaleidoSwap?',
    answer: 'KaleidoSwap is a decentralized exchange (DEX) that enables trustless, non-custodial swaps across Bitcoin layer 2 protocols. You can swap BTC, USDT, stablecoins, and other assets between Lightning, RGB, and Spark networks without intermediaries.',
  },
  {
    question: 'How do atomic swaps work?',
    answer: 'Atomic swaps use Hash Time-Locked Contracts (HTLCs) to ensure that either both parties receive their funds, or nobody does. This cryptographic mechanism eliminates counterparty risk. There is no way for one party to cheat the other.',
  },
  {
    question: 'Is KaleidoSwap custodial?',
    answer: 'No. KaleidoSwap is 100% non-custodial. Your private keys never leave your device, and we never take possession of your funds. You maintain full control throughout the entire swap process.',
  },
  {
    question: 'Is KaleidoSwap available on mainnet?',
    answer: 'KaleidoSwap is currently live on Signet and Testnet. Mainnet launch is coming soon. Join our community channels to stay updated on the launch date.',
  },
  {
    question: 'What fees does KaleidoSwap charge?',
    answer: 'KaleidoSwap charges a 1% protocol fee on successful swaps. There are no hidden fees. You also pay standard Lightning Network routing fees, which are typically a fraction of a cent. Failed swaps incur no fees at all.',
  },
  {
    question: 'What assets can I swap?',
    answer: 'You can swap BTC, USDT, and any RGB-issued asset on the Lightning Network. As new protocols are integrated — including Spark, Taproot Assets, Arkade, and the Liquid Network — the supported asset list will expand significantly.',
  },
  {
    question: 'Which Bitcoin layers does KaleidoSwap support?',
    answer: 'KaleidoSwap currently supports Lightning Network and RGB Protocol, with Spark already integrated. Support for Taproot Assets, Arkade, and Liquid Network is on the roadmap. The goal is to unify every major Bitcoin layer under a single swap interface.',
  },
  {
    question: 'Do I need to run my own node?',
    answer: 'The Desktop App bundles a full RGB Lightning node, giving you maximum sovereignty and privacy. The Web App lets you connect without running your own node, making it ideal for getting started quickly. Both options are fully non-custodial.',
  },
] as const

// Passing `isOpen: boolean` instead of the full `openIndex` means React.memo
// only re-renders the two items that actually changed open state.
const FaqItem = memo(({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: { question: string; answer: string }
  index: number
  isOpen: boolean
  onToggle: (index: number) => void
}) => (
  <AnimateIn
    variant="fade-up"
    delay={index * 60}
    className="glass-card rounded-xl overflow-hidden"
  >
    <button
      onClick={() => onToggle(index)}
      className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
      aria-expanded={isOpen}
    >
      <span className="font-semibold text-white pr-4">
        {item.question}
      </span>
      <ChevronDown
        className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
          isOpen ? 'rotate-180' : ''
        }`}
      />
    </button>
    <div
      className={`grid transition-all duration-300 ease-in-out ${
        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      }`}
    >
      <div className="overflow-hidden">
        <p className="px-6 pb-5 text-slate-400 leading-relaxed">
          {item.answer}
        </p>
      </div>
    </div>
  </AnimateIn>
))
FaqItem.displayName = 'FaqItem'

export const FAQ = () => {
  const { t } = useTranslation()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // Stable callback — never recreated, so React.memo on FaqItem is effective
  const toggleItem = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }, [])

  // Translate once per language change, not on every render
  const faqItems = useMemo(
    () => FAQ_KEYS.map((k) => ({ question: t(k.question), answer: t(k.answer) })),
    [t]
  )

  const faqJsonLd = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }), [faqItems])

  // Split at midpoint — direct slice keeps indices clean
  const mid = Math.ceil(faqItems.length / 2)

  return (
    <section className="py-16 relative">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqJsonLd)}
        </script>
      </Helmet>
      <div className="max-w-7xl mx-auto px-6">
        <AnimateIn variant="fade-up" className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('Frequently Asked Questions')}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            {t('Everything you need to know about KaleidoSwap.')}
          </p>
        </AnimateIn>

        <div className="grid md:grid-cols-2 gap-4 items-start">
          <div className="space-y-4">
            {faqItems.slice(0, mid).map((item, i) => (
              <FaqItem
                key={i}
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={toggleItem}
              />
            ))}
          </div>
          <div className="space-y-4">
            {faqItems.slice(mid).map((item, i) => (
              <FaqItem
                key={mid + i}
                item={item}
                index={mid + i}
                isOpen={openIndex === mid + i}
                onToggle={toggleItem}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
