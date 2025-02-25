// src/pages/privacy.tsx
import { Link } from 'react-router-dom'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/footer/Footer'
import { footerConfig } from '@/constants/footer'
import { Shield, Lock, Eye, FileText, Mail } from 'lucide-react'

export const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-950">
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
            Back to home
          </Link>
        </nav>
        
        <div className="prose prose-invert max-w-4xl mx-auto animate-fadeIn">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-primary-400" />
            <h1 className="text-gradient m-0">Privacy Policy</h1>
          </div>
          <p className="text-gray-400">Last updated: December 13, 2024</p>

          <div className="my-8 p-6 glass-card">
            <p className="text-lg text-gray-200 mb-0">
              At KaleidoSwap, we prioritize your privacy and data sovereignty. Our open-source desktop application is designed with privacy-first principles, minimizing data collection and ensuring you maintain control over your information.
            </p>
          </div>

          <section className="mt-12 glass-card p-6 border-l-4 border-primary-500">
            <div className="flex items-start gap-4">
              <Eye className="w-6 h-6 text-primary-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="mt-0 mb-4">1. Information We Collect</h2>
                <p>
                  KaleidoSwap is committed to protecting your privacy. Our application is designed to minimize data collection:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>We do not collect personal information</li>
                  <li>No IP addresses are stored</li>
                  <li>No tracking or analytics are implemented</li>
                  <li>Email addresses are only collected if you choose to subscribe to updates</li>
                  <li>All data is stored locally on your device, not on our servers</li>
                  <li>Node connection information is only stored locally</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mt-8 glass-card p-6 border-l-4 border-primary-500">
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-primary-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="mt-0 mb-4">2. How We Use Information</h2>
                <p>
                  If you choose to provide your email address for updates:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>We only use it to send you KaleidoSwap updates and announcements</li>
                  <li>We never share or sell your email address</li>
                  <li>You can unsubscribe at any time</li>
                  <li>Email subscription is entirely optional</li>
                </ul>
                <p className="mt-4">
                  As an open-source project, we prioritize transparency in all our operations, including how we handle any information you choose to share with us.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-8 glass-card p-6 border-l-4 border-primary-500">
            <div className="flex items-start gap-4">
              <Lock className="w-6 h-6 text-primary-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="mt-0 mb-4">3. Security</h2>
                <p>
                  KaleidoSwap employs industry standard security measures:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>All network traffic is encrypted</li>
                  <li>No sensitive data is stored on our servers</li>
                  <li>Regular security audits are performed</li>
                  <li>Our code is open-source and available for public review</li>
                  <li>We follow security best practices for desktop application development</li>
                  <li>Private keys never leave your device</li>
                </ul>
                <p className="mt-4">
                  As a decentralized application, KaleidoSwap is designed to give you full control over your assets and data. Your private keys and sensitive information remain on your device at all times.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-8 glass-card p-6 border-l-4 border-primary-500">
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-primary-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="mt-0 mb-4">4. Changes to This Policy</h2>
                <p>
                  We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the date at the top of this policy.
                </p>
                <p className="mt-4">
                  We encourage you to review this privacy policy periodically for any changes. Changes to this privacy policy are effective when they are posted on this page.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-8 glass-card p-6 border-l-4 border-primary-500">
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-primary-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="mt-0 mb-4">5. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>GitHub: <a href="https://github.com/kaleidoswap" className="text-primary-400 hover:text-primary-300">github.com/kaleidoswap</a></li>
                  <li>Open an issue on our <a href="https://github.com/kaleidoswap/desktop-app/issues" className="text-primary-400 hover:text-primary-300">GitHub repository</a></li>
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