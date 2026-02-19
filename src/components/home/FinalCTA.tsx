import { Download } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { PRODUCTS } from '@/constants/urls'
import { useTranslation } from 'react-i18next'
import { useAppNavigation } from '@/hooks/useNavigation'
import { AnimateIn } from '@/components/animations/AnimateIn'

export const FinalCTA = () => {
  const { t } = useTranslation()
  const { handleNavigation } = useAppNavigation()

  return (
    <section className="py-24 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border-t border-white/5">
      <AnimateIn variant="scale" className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('Try KaleidoSwap')}</h2>
        <p className="text-xl text-slate-400 mb-10">
          {t('Live on Signet and Testnet. Mainnet coming soon.')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => handleNavigation(PRODUCTS.app, true)}
            className="h-12 px-8 btn-glow flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
            {t('Launch Web App')}
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => handleNavigation('/downloads', false)}
            className="h-12 px-8 border-slate-600 hover:border-white flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            {t('Download Desktop')}
          </Button>
        </div>
      </AnimateIn>
    </section>
  )
}
