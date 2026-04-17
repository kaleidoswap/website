import { ExternalLink, Zap, Trophy, Handshake, Medal } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { backers } from '@/constants/home'
import { AnimateIn } from '@/components/animations/AnimateIn'

export const BuiltInPublic = () => {
  const { t } = useTranslation()

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <AnimateIn variant="fade-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* Backed By */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">
                {t('Backed By')}
              </p>
              <div className="flex flex-col gap-3">
                {backers.map((backer) => (
                  <a
                    key={backer.name}
                    href={backer.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 py-2 text-slate-400 hover:text-slate-200 transition-colors group"
                  >
                    {backer.logo && (
                      <div className="w-12 shrink-0 flex items-center justify-start">
                        <img
                          src={backer.logo}
                          alt=""
                          className="h-12 w-12 object-contain object-left opacity-60 group-hover:opacity-80 transition-opacity"
                        />
                      </div>
                    )}
                    <span className="font-medium">
                      {backer.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Accomplishments */}
            <div className="flex flex-col items-end">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">
                {t('Accomplishments')}
              </p>
              <div className="flex flex-col gap-3 w-full">
                <a
                  href="https://kaleidoswap.medium.com/%EF%B8%8F-the-first-ever-rgb-asset-swap-on-lightning-mainnet-1b940dcd0efd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-slate-300 glass-card px-6 py-4 rounded-xl hover:border-white/20 hover:text-white transition-colors group w-full"
                >
                  <Zap className="w-5 h-5 shrink-0 text-primary-400 group-hover:text-white transition-colors" />
                  <span>{t('Pioneer — First RGB swap on Lightning')}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-colors shrink-0 ml-auto" />
                </a>
                <a
                  href="https://x.com/kaleidoswap/status/1950561318144217201"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-slate-300 glass-card px-6 py-4 rounded-xl hover:border-white/20 hover:text-white transition-colors group w-full"
                >
                  <Trophy className="w-5 h-5 shrink-0 text-primary-400 group-hover:text-white transition-colors" />
                  <span>{t('Winner — PlanB Lugano Hackathon')}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-colors shrink-0 ml-auto" />
                </a>
                <a
                  href="https://www.rgbprotocol.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-slate-300 glass-card px-6 py-4 rounded-xl hover:border-white/20 hover:text-white transition-colors group w-full"
                >
                  <Handshake className="w-5 h-5 shrink-0 text-primary-400 group-hover:text-white transition-colors" />
                  <span>{t('Founding Partner — RGB Protocol Association')}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-colors shrink-0 ml-auto" />
                </a>
                <a
                  href="https://x.com/kaleidoswap/status/2027780906757276109"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-slate-300 glass-card px-6 py-4 rounded-xl hover:border-white/20 hover:text-white transition-colors group w-full"
                >
                  <Medal className="w-5 h-5 shrink-0 text-primary-400 group-hover:text-white transition-colors" />
                  <span>{t('Winner — CypherTank 1st Edition')}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-colors shrink-0 ml-auto" />
                </a>
              </div>
            </div>

          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
