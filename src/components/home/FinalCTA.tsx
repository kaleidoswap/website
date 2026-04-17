import { BookOpen, Send } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { DOCS, SOCIALS } from '@/constants/urls'
import { useTranslation } from 'react-i18next'
import { useAppNavigation } from '@/hooks/useNavigation'
import { AnimateIn } from '@/components/animations/AnimateIn'

export const FinalCTA = () => {
  const { t } = useTranslation()
  const { handleNavigation } = useAppNavigation()

  return (
    <section className="py-16 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border-t border-white/5">
      <AnimateIn variant="scale" className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('Build on KaleidoSwap')}</h2>
        <p className="text-xl text-slate-400 mb-10">
          {t('Join other builders shaping the future of Bitcoin-based finance. Live on Mutinynet and Regtest, Mainnet Q2 2026.')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => handleNavigation(DOCS.sdk, true)}
            className="h-12 px-8 btn-glow flex items-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            {t('Read SDK Docs')}
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => handleNavigation(SOCIALS.telegram, true)}
            className="h-12 px-8 border-slate-600 hover:border-slate-500 flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
            {t('Join Telegram Community')}
          </Button>
        </div>
      </AnimateIn>
    </section>
  )
}
