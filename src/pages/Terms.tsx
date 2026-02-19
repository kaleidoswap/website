// src/pages/terms.tsx
import { Link } from 'react-router-dom'
import { SEO } from '@/components/common/SEO'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/footer/Footer'
import { footerConfig } from '@/constants/footer'
import { GITHUB } from '@/constants/urls'
import { Scale, AlertTriangle, Server, Shield, FileText, Mail, Code, ChevronLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Section = ({
  icon: Icon,
  title,
  children,
  accent = 'border-primary-500',
  iconColor = 'text-primary-400',
}: {
  icon: React.ElementType
  title: string
  children: React.ReactNode
  accent?: string
  iconColor?: string
}) => (
  <section className={`glass-card rounded-2xl p-4 sm:p-6 border-l-4 ${accent}`}>
    <div className="flex items-start gap-3">
      <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0 mt-0.5`} />
      <div className="min-w-0 flex-1">
        <h2 className="text-lg font-bold text-white mb-3">{title}</h2>
        {children}
      </div>
    </div>
  </section>
)

const BulletList = ({ items, color = 'text-primary-400' }: { items: string[]; color?: string }) => (
  <ul className="space-y-1.5 text-sm text-slate-300">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-2">
        <span className={`${color} mt-0.5 flex-shrink-0`}>•</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
)

export const Terms = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background-dark text-white font-display">
      <SEO
        title="Terms of Service"
        description="KaleidoSwap Terms of Service. Understand the terms and conditions for using our Bitcoin DEX platform."
        url="/terms"
        keywords={['terms', 'service', 'conditions', 'legal', 'bitcoin', 'dex']}
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
            <Scale className="w-7 h-7 text-primary-400 flex-shrink-0" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient leading-tight">
              {t('Terms of Service')}
            </h1>
          </div>
          <p className="text-slate-500 text-sm ml-10">{t('Last updated: December 13, 2024')}</p>
        </div>

        {/* Intro */}
        <div className="glass-card rounded-2xl p-4 sm:p-6 mb-6">
          <p className="text-slate-200 leading-relaxed text-sm sm:text-base">
            {t('KaleidoSwap is an open-source desktop application for decentralized, trustless trading of digital assets over the Bitcoin Lightning Network using the RGB protocol. By using our application, you agree to the following terms and conditions.')}
          </p>
        </div>

        <div className="space-y-4">
          <Section icon={FileText} title={t('1. Acceptance of Terms')}>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              {t('By accessing and using KaleidoSwap, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our application.')}
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              {t('These Terms of Service apply to all users of the application, including without limitation users who are contributors to the content of the application.')}
            </p>
          </Section>

          <Section icon={Server} title={t('2. Description of Service')}>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              {t('KaleidoSwap is a decentralized trading application that leverages:')}
            </p>
            <BulletList items={[
              t('Bitcoin Protocol for security'),
              t('Lightning Network for scalability'),
              t('RGB Protocol for programmability'),
            ]} />
            <p className="text-slate-300 text-sm leading-relaxed mt-3">
              {t('Our desktop application enables multi-asset trading without intermediaries, giving you sovereignty over your funds. The application connects to an RGB Lightning Node to facilitate trustless trading of digital assets.')}
            </p>
          </Section>

          <Section
            icon={AlertTriangle}
            title={t('3. Alpha Software Warning')}
            accent="border-bitcoin-500"
            iconColor="text-bitcoin-500"
          >
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              {t('KaleidoSwap is currently in alpha testing:')}
            </p>
            <BulletList items={[
              t('Use only on test networks (regtest, signet, testnet3)'),
              t('Do not use with real funds on mainnet'),
              t('Features and interfaces may change without notice'),
              t('Swaps may fail or get stuck'),
              t('The software is provided "as is" without warranty of any kind'),
            ]} color="text-bitcoin-400" />
            <p className="text-bitcoin-400 text-sm font-medium mt-3 leading-relaxed">
              {t('By using KaleidoSwap, you acknowledge that you understand the risks associated with alpha software and accept full responsibility for any potential loss of funds.')}
            </p>
          </Section>

          <Section icon={Shield} title={t('4. User Responsibilities')}>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              {t('Users are responsible for:')}
            </p>
            <BulletList items={[
              t('Maintaining the security of their private keys'),
              t('Ensuring their node remains online when required'),
              t('Understanding the risks of alpha software'),
              t('Following security best practices'),
              t('Backing up their node data regularly'),
              t('Keeping their software updated to the latest version'),
            ]} />
            <p className="text-slate-300 text-sm leading-relaxed mt-3">
              {t('KaleidoSwap is designed to give you full control over your assets, which also means you have full responsibility for their security.')}
            </p>
          </Section>

          <Section icon={Code} title={t('5. Open Source License')}>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              {t('KaleidoSwap is open-source software released under the MIT License. This means:')}
            </p>
            <BulletList items={[
              t('You can freely use, modify, and distribute the software'),
              t('The software is provided "as is" without warranty'),
              t('The authors are not liable for any damages arising from the use of the software'),
              t('You must include the original copyright notice in any copy of the software'),
            ]} />
            <p className="text-slate-300 text-sm leading-relaxed mt-3">
              {t('We encourage contributions to the codebase to help improve KaleidoSwap for everyone.')}
            </p>
          </Section>

          <Section icon={AlertTriangle} title={t('6. Disclaimer of Warranties')}>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              {t('KaleidoSwap is provided "as is" without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement.')}
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              {t('We do not guarantee uninterrupted or error-free operation. The entire risk as to the quality and performance of the application is with you.')}
            </p>
          </Section>

          <Section icon={AlertTriangle} title={t('7. Limitation of Liability')}>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              {t('In no event shall KaleidoSwap or its contributors be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the application.')}
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              {t('This limitation applies even if KaleidoSwap or its representatives have been advised of the possibility of such damages.')}
            </p>
          </Section>

          <Section icon={FileText} title={t('8. Changes to Terms')}>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              {t('We reserve the right to modify these terms at any time. We will notify users of any changes by updating the date at the top of this page.')}
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              {t('Your continued use of the application after any such changes constitutes your acceptance of the new Terms of Service.')}
            </p>
          </Section>

          <Section icon={Mail} title={t('9. Contact')}>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              {t('For any questions regarding these terms, please contact us via:')}
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
