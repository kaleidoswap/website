// src/pages/terms.tsx
import { Link } from 'react-router-dom'
import { SEO } from '@/components/common/SEO'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/footer/Footer'
import { footerConfig } from '@/constants/footer'
import { GITHUB } from '@/constants/urls'
import { Scale, AlertTriangle, Server, Shield, FileText, Mail, Code } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const Terms = () => {
  const { t } = useTranslation()
  return (
    <div className="min-h-screen bg-gray-950">
      <SEO
        title="Terms of Service"
        description="KaleidoSwap Terms of Service. Understand the terms and conditions for using our Bitcoin DEX platform."
        url="/terms"
        keywords={['terms', 'service', 'conditions', 'legal', 'bitcoin', 'dex']}
      />
      {/* Fixed background gradient */}
      <div
        className="fixed inset-0 bg-gradient-to-br from-primary-500/5 via-secondary-500/5 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      
      {/* Grid background */}
      <div className="absolute inset-0 grid-background opacity-10" aria-hidden="true" />
      
      <Navbar />
      
      <div className="container mx-auto px-6 py-24 md:py-32 relative z-10">
        <nav className="mb-8 animate-fadeIn">
          <Link to="/" className="text-primary-400 hover:text-primary-300 flex items-center gap-2 w-fit">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            {t('Back to home')}
          </Link>
        </nav>
        
        <div className="prose prose-invert max-w-4xl mx-auto animate-fadeIn">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="w-8 h-8 text-primary-400" />
            <h1 className="text-gradient m-0">{t('Terms of Service')}</h1>
          </div>
          <p className="text-gray-400">{t('Last updated: December 13, 2024')}</p>

          <div className="my-8 p-6 glass-card">
            <p className="text-lg text-gray-200 mb-0">
              {t('KaleidoSwap is an open-source desktop application for decentralized, trustless trading of digital assets over the Bitcoin Lightning Network using the RGB protocol. By using our application, you agree to the following terms and conditions.')}
            </p>
          </div>

          <section className="mt-12 glass-card p-6 border-l-4 border-primary-500">
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-primary-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="mt-0 mb-4">{t('1. Acceptance of Terms')}</h2>
                <p>
                  {t('By accessing and using KaleidoSwap, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our application.')}
                </p>
                <p className="mt-4">
                  {t('These Terms of Service apply to all users of the application, including without limitation users who are contributors to the content of the application.')}
                </p>
              </div>
            </div>
          </section>

          <section className="mt-8 glass-card p-6 border-l-4 border-primary-500">
            <div className="flex items-start gap-4">
              <Server className="w-6 h-6 text-primary-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="mt-0 mb-4">{t('2. Description of Service')}</h2>
                <p>
                  {t('KaleidoSwap is a decentralized trading application that leverages:')}
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>{t('Bitcoin Protocol for security')}</li>
                  <li>{t('Lightning Network for scalability')}</li>
                  <li>{t('RGB Protocol for programmability')}</li>
                </ul>
                <p className="mt-4">
                  {t('Our desktop application enables multi-asset trading without intermediaries, giving you sovereignty over your funds. The application connects to an RGB Lightning Node to facilitate trustless trading of digital assets.')}
                </p>
              </div>
            </div>
          </section>

          <section className="mt-8 glass-card p-6 border-l-4 border-bitcoin-500">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-bitcoin-500 flex-shrink-0 mt-1" />
              <div>
                <h2 className="mt-0 mb-4">{t('3. Alpha Software Warning')}</h2>
                <p>
                  {t('KaleidoSwap is currently in alpha testing:')}
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>{t('Use only on test networks (regtest, signet, testnet3)')}</li>
                  <li>{t('Do not use with real funds on mainnet')}</li>
                  <li>{t('Features and interfaces may change without notice')}</li>
                  <li>{t('Swaps may fail or get stuck')}</li>
                  <li>{t('The software is provided "as is" without warranty of any kind')}</li>
                </ul>
                <p className="mt-4 text-bitcoin-400 font-medium">
                  {t('By using KaleidoSwap, you acknowledge that you understand the risks associated with alpha software and accept full responsibility for any potential loss of funds.')}
                </p>
              </div>
            </div>
          </section>

          <section className="mt-8 glass-card p-6 border-l-4 border-primary-500">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-primary-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="mt-0 mb-4">{t('4. User Responsibilities')}</h2>
                <p>
                  {t('Users are responsible for:')}
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>{t('Maintaining the security of their private keys')}</li>
                  <li>{t('Ensuring their node remains online when required')}</li>
                  <li>{t('Understanding the risks of alpha software')}</li>
                  <li>{t('Following security best practices')}</li>
                  <li>{t('Backing up their node data regularly')}</li>
                  <li>{t('Keeping their software updated to the latest version')}</li>
                </ul>
                <p className="mt-4">
                  {t('KaleidoSwap is designed to give you full control over your assets, which also means you have full responsibility for their security.')}
                </p>
              </div>
            </div>
          </section>

          <section className="mt-8 glass-card p-6 border-l-4 border-primary-500">
            <div className="flex items-start gap-4">
              <Code className="w-6 h-6 text-primary-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="mt-0 mb-4">{t('5. Open Source License')}</h2>
                <p>
                  {t('KaleidoSwap is open-source software released under the MIT License. This means:')}
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>{t('You can freely use, modify, and distribute the software')}</li>
                  <li>{t('The software is provided "as is" without warranty')}</li>
                  <li>{t('The authors are not liable for any damages arising from the use of the software')}</li>
                  <li>{t('You must include the original copyright notice in any copy of the software')}</li>
                </ul>
                <p className="mt-4">
                  {t('We encourage contributions to the codebase to help improve KaleidoSwap for everyone.')}
                </p>
              </div>
            </div>
          </section>

          <section className="mt-8 glass-card p-6 border-l-4 border-primary-500">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-primary-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="mt-0 mb-4">{t('6. Disclaimer of Warranties')}</h2>
                <p>
                  {t('KaleidoSwap is provided "as is" without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement.')}
                </p>
                <p className="mt-4">
                  {t('We do not guarantee uninterrupted or error-free operation. The entire risk as to the quality and performance of the application is with you.')}
                </p>
              </div>
            </div>
          </section>

          <section className="mt-8 glass-card p-6 border-l-4 border-primary-500">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-primary-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="mt-0 mb-4">{t('7. Limitation of Liability')}</h2>
                <p>
                  {t('In no event shall KaleidoSwap or its contributors be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the application.')}
                </p>
                <p className="mt-4">
                  {t('This limitation applies even if KaleidoSwap or its representatives have been advised of the possibility of such damages.')}
                </p>
              </div>
            </div>
          </section>

          <section className="mt-8 glass-card p-6 border-l-4 border-primary-500">
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-primary-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="mt-0 mb-4">{t('8. Changes to Terms')}</h2>
                <p>
                  {t('We reserve the right to modify these terms at any time. We will notify users of any changes by updating the date at the top of this page.')}
                </p>
                <p className="mt-4">
                  {t('Your continued use of the application after any such changes constitutes your acceptance of the new Terms of Service.')}
                </p>
              </div>
            </div>
          </section>

          <section className="mt-8 glass-card p-6 border-l-4 border-primary-500">
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-primary-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="mt-0 mb-4">{t('9. Contact')}</h2>
                <p>
                  {t('For any questions regarding these terms, please contact us via:')}
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>{t('GitHub:')} <a href={GITHUB.orgUrl} className="text-primary-400 hover:text-primary-300">github.com/kaleidoswap</a></li>
                  <li>{t('Open an issue on our')} <a href={GITHUB.issuesUrl} className="text-primary-400 hover:text-primary-300">{t('GitHub repository')}</a></li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
      
      <Footer {...footerConfig} />
    </div>
  )
}
