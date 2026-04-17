// src/pages/NotFound.tsx
import { useNavigate } from 'react-router-dom'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/footer/Footer'
import { Button } from '@/components/common/Button'
import { ArrowLeft, Home } from 'lucide-react'
import { footerConfig } from '@/constants/footer'
import { useTranslation } from 'react-i18next'

export const NotFound = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background-dark text-white font-display">
      <Navbar />

      <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden pt-24">
        {/* Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary-500/10 rounded-full blur-[100px] -z-10" />

        <div className="container mx-auto px-6 text-center">
          <div className="max-w-lg mx-auto">
            {/* Big 404 */}
            <h1 className="text-[120px] md:text-[180px] font-bold leading-none text-gradient mb-2">
              404
            </h1>

            <p className="text-lg text-slate-400 mb-10">
              {t("The page you're looking for doesn't exist or has been moved.")}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate(-1)}
                className="border-slate-600 hover:border-slate-500 hover:text-gray-200 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('Go Back')}
              </Button>

              <Button
                size="lg"
                onClick={() => navigate('/')}
                className="btn-glow flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                {t('Return Home')}
              </Button>
            </div>

            {/* Helpful Links */}
            <div className="glass-card rounded-xl p-5 group">
              <p className="text-sm text-slate-500 mb-4">{t('Looking for something?')}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/downloads"
                  className="text-sm text-slate-400 hover:text-gray-200 transition-colors"
                >
                  {t('Downloads')}
                </a>
                <span className="text-slate-700">•</span>
                <a
                  href="/products/sdk"
                  className="text-sm text-slate-400 hover:text-gray-200 transition-colors"
                >
                  {t('SDK')}
                </a>
                <span className="text-slate-700">•</span>
                <a
                  href="https://docs.kaleidoswap.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-400 hover:text-gray-200 transition-colors"
                >
                  {t('Docs')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer {...footerConfig} />
    </div>
  )
}
