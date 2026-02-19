import { useTranslation } from 'react-i18next'
import { liveProtocols, comingProtocols } from '@/constants/protocols'
import { AnimateIn } from '@/components/animations/AnimateIn'

export const ProblemSolution = () => {
  const { t } = useTranslation()

  return (
    <section className="py-24 bg-gray-950/50 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual */}
          <AnimateIn variant="fade-right" className="order-2 lg:order-1 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-xl blur-2xl opacity-50" />
            <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl glass-panel p-8">
              {/* Supported Protocols */}
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-slate-400 mb-4">{t('Supported Protocols')}</p>
                  <div className="flex flex-wrap gap-3">
                    {liveProtocols.map((protocol) => (
                      <div
                        key={protocol.name}
                        className="flex items-center gap-2.5 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                      >
                        {protocol.icon ? (
                          <img src={protocol.icon} alt={protocol.name} className="h-6 w-6 object-contain" />
                        ) : protocol.lucideIcon ? (
                          <protocol.lucideIcon className="w-6 h-6 text-yellow-500" />
                        ) : null}
                        <span className="text-white font-medium">{protocol.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <p className="text-sm text-slate-500 mb-3">{t('Coming Soon')}</p>
                  <div className="flex flex-wrap gap-3">
                    {comingProtocols.map((protocol) => (
                      <div
                        key={protocol.name}
                        className="flex items-center gap-2.5 px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl opacity-70"
                      >
                        {protocol.icon && (
                          <img src={protocol.icon} alt={protocol.name} className="h-6 w-6 object-contain" />
                        )}
                        <span className="text-slate-400 font-medium">{protocol.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">{t('Network Status')}</p>
                    <p className="text-primary-400 font-bold">{t('Unified & Interoperable')}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400">
                    <span className="material-symbols-outlined">hub</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Content */}
          <div className="order-1 lg:order-2 flex flex-col gap-6">
            <AnimateIn variant="fade-left">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                {t('Bitcoin Layers Are')}{' '}
                <span className="text-slate-500 line-through decoration-red-500">{t('Fragmented')}</span>
              </h2>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-primary-400 mt-2">
                {t('We Unite Them.')}
              </h2>
            </AnimateIn>

            <AnimateIn variant="fade-left" delay={150}>
              <p className="text-slate-400 text-lg leading-relaxed">
                {t('Moving assets between Lightning, RGB, and sidechains usually requires trusted intermediaries or complex peg-in/peg-out mechanisms.')}
              </p>
            </AnimateIn>

            <AnimateIn variant="fade-left" delay={250}>
              <p className="text-slate-400 text-lg leading-relaxed">
                {t('KaleidoSwap introduces the first protocol for true P2P interoperability using')}{' '}
                <strong className="text-white">{t('HTLCs and atomic swaps')}</strong>
                {t('. No centralized exchange. No counterparty risk.')}
              </p>
            </AnimateIn>

            <AnimateIn variant="fade-up" delay={350}>
              <ul className="space-y-4 mt-4">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary-400 mt-1">layers</span>
                  <div>
                    <h4 className="font-bold text-white">{t('Cross-Layer Liquidity')}</h4>
                    <p className="text-sm text-slate-400">{t('Access liquidity across all Bitcoin scaling solutions instantly.')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary-400 mt-1">lock</span>
                  <div>
                    <h4 className="font-bold text-white">{t('Cryptographic Security')}</h4>
                    <p className="text-sm text-slate-400">{t('Powered by math, enforced by the Bitcoin blockchain.')}</p>
                  </div>
                </li>
              </ul>
            </AnimateIn>
          </div>
        </div>
      </div>
    </section>
  )
}
