// src/pages/privacy.tsx
import { Link } from 'react-router-dom'

export const Privacy = () => {
  return (
    <div className="min-h-screen bg-[#1C1D26] py-24">
      <div className="container mx-auto px-6">
        <nav className="mb-8">
          <Link to="/" className="text-primary-400 hover:text-primary-300">
            ← Back to home
          </Link>
        </nav>
        
        <div className="prose prose-invert max-w-3xl">
          <h1>Privacy Policy</h1>
          <p className="text-gray-400">Last updated: December 13, 2024</p>

          <section className="mt-8">
            <h2>1. Information We Collect</h2>
            <p>
              KaleidoSwap is committed to protecting your privacy. Our application is designed to minimize data collection:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>We do not collect personal information</li>
              <li>No IP addresses are stored</li>
              <li>No tracking or analytics are implemented</li>
              <li>Email addresses are only collected if you choose to subscribe to updates</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2>2. How We Use Information</h2>
            <p>
              If you choose to provide your email address for updates:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>We only use it to send you KaleidoSwap updates and announcements</li>
              <li>We never share or sell your email address</li>
              <li>You can unsubscribe at any time</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2>3. Security</h2>
            <p>
              KaleidoSwap employs industry standard security measures:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>All network traffic is encrypted</li>
              <li>No sensitive data is stored on our servers</li>
              <li>Regular security audits are performed</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2>4. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the date at the top of this policy.
            </p>
          </section>

          <section className="mt-8">
            <h2>5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>GitHub: <a href="https://github.com/kaleidoswap" className="text-primary-400 hover:text-primary-300">github.com/kaleidoswap</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}