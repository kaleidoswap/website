import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { coreFeatures } from '@/constants/home'
import { AnimateIn } from '@/components/animations/AnimateIn'

export const CoreFeatures = () => {
  const { t } = useTranslation()

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-primary-900/10 via-transparent to-transparent -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <AnimateIn variant="fade-up" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('Core Protocol Features')}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">{t('Built for sovereigns who demand security, speed, and privacy.')}</p>
        </AnimateIn>

        <div className="grid md:grid-cols-3 gap-6">
          {coreFeatures.map((feature, index) => (
            <AnimateIn key={feature.title} variant="fade-up" delay={index * 120}>
              <motion.div
                className="glass-card p-8 rounded-2xl flex flex-col gap-6 group h-full"
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
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
