// src/pages/NotFound.tsx
import { useNavigate } from 'react-router-dom'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/footer/Footer'
import { Button } from '@/components/common/Button'
import { ArrowLeft, Home, Search } from 'lucide-react'
import { footerConfig } from '@/constants/footer'
import { useTranslation } from 'react-i18next'

export const NotFound = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background-dark text-white font-display">
      <Navbar />

      <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary-500/10 rounded-full blur-[100px] -z-10" />

        <div className="container mx-auto px-6 text-center">
          <div className="max-w-lg mx-auto">
            {/* 404 Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-500/30 bg-primary-500/10 mb-8">
              <Search className="w-4 h-4 text-primary-400" />
              <span className="text-sm font-medium text-primary-400">{t('Page Not Found')}</span>
            </div>

            {/* Big 404 */}
            <h1 className="text-[150px] md:text-[200px] font-bold leading-none text-gradient mb-4">
              404
            </h1>

            <p className="text-xl text-slate-400 mb-8">
              {t("The page you're looking for doesn't exist or has been moved.")}
            </p>

            {/* Quick Links */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate(-1)}
                className="border-slate-600 hover:border-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('Go Back')}
              </Button>

              <Button
                size="lg"
                onClick={() => navigate('/')}
                className="btn-glow"
              >
                <Home className="w-4 h-4 mr-2" />
                {t('Return Home')}
              </Button>
            </div>

            {/* Helpful Links */}
            <div className="glass-card rounded-xl p-6">
              <p className="text-sm text-slate-500 mb-4">{t('Looking for something?')}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/products/web-app"
                  className="text-sm text-slate-300 hover:text-primary-400 transition-colors"
                >
                  {t('Web App')}
                </a>
                <span className="text-slate-700">•</span>
                <a
                  href="/products/desktop"
                  className="text-sm text-slate-300 hover:text-primary-400 transition-colors"
                >
                  {t('Desktop App')}
                </a>
                <span className="text-slate-700">•</span>
                <a
                  href="/products/sdk"
                  className="text-sm text-slate-300 hover:text-primary-400 transition-colors"
                >
                  {t('SDK')}
                </a>
                <span className="text-slate-700">•</span>
                <a
                  href="/downloads"
                  className="text-sm text-slate-300 hover:text-primary-400 transition-colors"
                >
                  {t('Downloads')}
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
