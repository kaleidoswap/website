import { Code, ExternalLink, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { GITHUB } from '@/constants/urls'
import { backers, partners } from '@/constants/home'
import { AnimateIn } from '@/components/animations/AnimateIn'

export const BuiltInPublic = () => {
  const { t } = useTranslation()

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Open Source */}
        <AnimateIn variant="fade-up" className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('Built in Public')}</h2>
          <p className="text-xl text-slate-400 mb-8">
            {t('100% open source. Audit the code, contribute, or fork it.')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={GITHUB.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 glass-card rounded-xl text-white hover:border-primary-500/30 transition-colors"
            >
              <Code className="w-5 h-5" />
              <span>{t('Desktop App')}</span>
              <ExternalLink className="w-4 h-4 text-slate-500" />
            </a>
            <a
              href="https://github.com/RGB-Tools/rgb-lightning-node"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 glass-card rounded-xl text-white hover:border-primary-500/30 transition-colors"
            >
              <Code className="w-5 h-5" />
              <span>{t('RGB Lightning Node')}</span>
              <span className="text-xs text-slate-500 ml-1">{t('contributor')}</span>
              <ExternalLink className="w-4 h-4 text-slate-500" />
            </a>
          </div>
        </AnimateIn>

        {/* Achievements */}
        <AnimateIn variant="blur">
          <div className="flex flex-col sm:flex-row justify-center gap-6 text-center mb-16">
            <div className="flex items-center justify-center gap-2 text-slate-300 glass-card px-6 py-4 rounded-xl">
              <span className="text-yellow-500 text-xl" role="img" aria-label="Trophy">🏆</span>
              <span>{t('Winner — PlanB Lugano Hackathon')}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-slate-300 glass-card px-6 py-4 rounded-xl">
              <Zap className="w-5 h-5 text-primary-400" />
              <span>{t('First RGB swap on Lightning')}</span>
            </div>
          </div>
        </AnimateIn>

        {/* Backers */}
        <AnimateIn variant="fade-up" delay={100}>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-10">
              {t('Backed By')}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {backers.map((backer) => (
                <a
                  key={backer.name}
                  href={backer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl px-6 py-4 hover:scale-105 transition-transform"
                  title={backer.name}
                >
                  <img
                    src={backer.logo}
                    alt={backer.name}
                    className="h-8 md:h-10 w-auto object-contain"
                  />
                </a>
              ))}
            </div>
          </div>
        </AnimateIn>

        {/* Partners */}
        <AnimateIn variant="fade-up" delay={200}>
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-10">
              {t('Partners')}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {partners.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:scale-105 transition-transform"
                  title={partner.name}
                >
                  <img
                    src={partner.logo}
                    alt={partner.showName ? '' : partner.name}
                    className="h-10 md:h-12 w-auto object-contain"
                  />
                  {partner.showName && (
                    <span className="text-white font-semibold text-lg hover:text-primary-400 transition-colors">
                      {t(partner.name)}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
