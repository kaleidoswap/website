import { memo, useCallback, useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { AnimateIn } from '@/components/animations/AnimateIn'

// Static translation keys — defined outside any component so the array is
// never recreated. `t()` is applied once inside the component via useMemo.
const FAQ_KEYS = [
  { question: 'faq.q1', answer: 'faq.a1' },
  { question: 'faq.q2', answer: 'faq.a2' },
  { question: 'faq.q3', answer: 'faq.a3' },
  { question: 'faq.q4', answer: 'faq.a4' },
  { question: 'faq.q5', answer: 'faq.a5' },
  { question: 'faq.q6', answer: 'faq.a6' },
  { question: 'faq.q7', answer: 'faq.a7' },
  { question: 'faq.q8', answer: 'faq.a8' },
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
    className="rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-colors"
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
    <section className="pt-16 pb-32 relative">
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
