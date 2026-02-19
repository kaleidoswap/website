// src/pages/privacy.tsx
import { Link } from 'react-router-dom'
import { SEO } from '@/components/common/SEO'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/footer/Footer'
import { footerConfig } from '@/constants/footer'
import { GITHUB } from '@/constants/urls'
import { Shield, Lock, Eye, FileText, Mail, ChevronLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Section = ({
  icon: Icon,
  title,
  children,
  accent = 'border-primary-500',
}: {
  icon: React.ElementType
  title: string
  children: React.ReactNode
  accent?: string
}) => (
  <section className={`glass-card rounded-2xl p-4 sm:p-6 border-l-4 ${accent}`}>
    <div className="flex items-start gap-3">
      <Icon className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
      <div className="min-w-0 flex-1">
        <h2 className="text-lg font-bold text-white mb-3">{title}</h2>
        {children}
      </div>
    </div>
  </section>
)

export const Privacy = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background-dark text-white font-display">
      <SEO
        title="Privacy Policy"
        description="KaleidoSwap Privacy Policy. Learn how we protect your data and maintain your privacy while using our Bitcoin DEX."
        url="/privacy"
        keywords={['privacy', 'policy', 'data protection', 'bitcoin', 'dex']}
      />

      <div className="fixed inset-0 bg-gradient-to-br from-primary-500/5 via-secondary-500/5 to-transparent pointer-events-none" aria-hidden="true" />

      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-16 relative z-10">

        <nav className="mb-8">
          <Link to="/" className="text-primary-400 hover:text-primary-300 inline-flex items-center gap-1.5 text-sm transition-colors">
            <ChevronLeft className="w-4 h-4" />
            {t('Back to home')}
          </Link>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-7 h-7 text-primary-400 flex-shrink-0" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient leading-tight">
              {t('Privacy Policy')}
            </h1>
          </div>
          <p className="text-slate-500 text-sm ml-10">{t('Last updated: December 13, 2024')}</p>
        </div>

        {/* Intro */}
        <div className="glass-card rounded-2xl p-4 sm:p-6 mb-6">
          <p className="text-slate-200 leading-relaxed">
            {t('At KaleidoSwap, we prioritize your privacy and data sovereignty. Our open-source desktop application is designed with privacy-first principles, minimizing data collection and ensuring you maintain control over your information.')}
          </p>
        </div>

        <div className="space-y-4">
          <Section icon={Eye} title={t('1. Information We Collect')}>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              {t('KaleidoSwap is committed to protecting your privacy. Our application is designed to minimize data collection:')}
            </p>
            <ul className="space-y-1.5 text-sm text-slate-300">
              {[
                t('We do not collect personal information'),
                t('No IP addresses are stored'),
                t('No tracking or analytics are implemented'),
                t('Email addresses are only collected if you choose to subscribe to updates'),
                t('All data is stored locally on your device, not on our servers'),
                t('Node connection information is only stored locally'),
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-primary-400 mt-0.5 flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section icon={FileText} title={t('2. How We Use Information')}>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              {t('If you choose to provide your email address for updates:')}
            </p>
            <ul className="space-y-1.5 text-sm text-slate-300 mb-3">
              {[
                t('We only use it to send you KaleidoSwap updates and announcements'),
                t('We never share or sell your email address'),
                t('You can unsubscribe at any time'),
                t('Email subscription is entirely optional'),
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-primary-400 mt-0.5 flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-slate-300 text-sm leading-relaxed">
              {t('As an open-source project, we prioritize transparency in all our operations, including how we handle any information you choose to share with us.')}
            </p>
          </Section>

          <Section icon={Lock} title={t('3. Security')}>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              {t('KaleidoSwap employs industry standard security measures:')}
            </p>
            <ul className="space-y-1.5 text-sm text-slate-300 mb-3">
              {[
                t('All network traffic is encrypted'),
                t('No sensitive data is stored on our servers'),
                t('Regular security audits are performed'),
                t('Our code is open-source and available for public review'),
                t('We follow security best practices for desktop application development'),
                t('Private keys never leave your device'),
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-primary-400 mt-0.5 flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-slate-300 text-sm leading-relaxed">
              {t('As a decentralized application, KaleidoSwap is designed to give you full control over your assets and data. Your private keys and sensitive information remain on your device at all times.')}
            </p>
          </Section>

          <Section icon={FileText} title={t('4. Changes to This Policy')}>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              {t('We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the date at the top of this policy.')}
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              {t('We encourage you to review this privacy policy periodically for any changes. Changes to this privacy policy are effective when they are posted on this page.')}
            </p>
          </Section>

          <Section icon={Mail} title={t('5. Contact Us')}>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              {t('If you have any questions about this Privacy Policy, please contact us at:')}
            </p>
            <ul className="space-y-1.5 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-primary-400 mt-0.5 flex-shrink-0">•</span>
                <span>
                  {t('GitHub:')}{' '}
                  <a href={GITHUB.orgUrl} className="text-primary-400 hover:text-primary-300 transition-colors">
                    github.com/kaleidoswap
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-400 mt-0.5 flex-shrink-0">•</span>
                <span>
                  {t('Open an issue on our')}{' '}
                  <a href={GITHUB.issuesUrl} className="text-primary-400 hover:text-primary-300 transition-colors">
                    {t('GitHub repository')}
                  </a>
                </span>
              </li>
            </ul>
          </Section>
        </div>
      </div>

      <Footer {...footerConfig} />
    </div>
  )
}
