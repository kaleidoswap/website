import type { MouseEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { coreFeatures } from '@/constants/home'
import { AnimateIn } from '@/components/animations/AnimateIn'

const glowColors: Record<string, string> = {
  primary: 'rgba(34, 197, 94, 0.08)',
  purple: 'rgba(168, 85, 247, 0.08)',
  green: 'rgba(74, 222, 128, 0.08)',
}

export const CoreFeatures = () => {
  const { t } = useTranslation()

  const handleGlowMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--glow-x', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--glow-y', `${e.clientY - rect.top}px`)
  }

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <AnimateIn variant="fade-up" className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('Trade Bitcoin Assets Privately')}</h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">{t('Built for sovereigns who demand security, speed, and privacy.')}</p>
        </AnimateIn>

        <div className="grid md:grid-cols-3 gap-6">
          {coreFeatures.map((feature, index) => (
            <AnimateIn key={feature.title} variant="fade-up" delay={index * 120}>
              <motion.div
                className="glass-card p-8 rounded-2xl flex flex-col gap-6 group h-full relative overflow-hidden"
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onMouseMove={handleGlowMove}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(240px circle at var(--glow-x, 50%) var(--glow-y, 50%), ${glowColors[feature.color] ?? glowColors.primary}, transparent 70%)`,
                  }}
                />
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors ${feature.color === 'primary'
                  ? 'bg-primary-500/10 text-primary-400 group-hover:bg-primary-500 group-hover:text-white'
                  : feature.color === 'purple'
                    ? 'bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-white'
                    : 'bg-green-500/10 text-green-400 group-hover:bg-green-500 group-hover:text-white'
                  }`}>
                  <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t(feature.title)}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {t(feature.description)}
                  </p>
                </div>
                <div className="mt-auto pt-6 border-t border-white/5">
                  <a
                    href={feature.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all ${feature.color === 'primary'
                      ? 'text-primary-400'
                      : feature.color === 'purple'
                        ? 'text-purple-400'
                        : 'text-green-400'
                      }`}
                  >
                    {t(feature.link.label)}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
