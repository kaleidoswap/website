// src/pages/terms.tsx
import { Link } from 'react-router-dom'

export const Terms = () => {
  return (
    <div className="min-h-screen bg-[#1C1D26] py-24">
      <div className="container mx-auto px-6">
        <nav className="mb-8">
          <Link to="/" className="text-primary-400 hover:text-primary-300">
            ← Back to home
          </Link>
        </nav>

        <div className="prose prose-invert max-w-3xl">
          <h1>Terms of Service</h1>
          <p className="text-gray-400">Last updated: December 13, 2024</p>

          <section className="mt-8">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using KaleidoSwap, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="mt-8">
            <h2>2. Description of Service</h2>
            <p>
              KaleidoSwap is a decentralized trading application that leverages:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Bitcoin Protocol for security</li>
              <li>Lightning Network for scalability</li>
              <li>RGB Protocol for programmability</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2>3. Alpha Software Warning</h2>
            <p>
              KaleidoSwap is currently in alpha testing:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Use only on test networks (regtest, signet, testnet3)</li>
              <li>Do not use with real funds on mainnet</li>
              <li>Features and interfaces may change without notice</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2>4. User Responsibilities</h2>
            <p>
              Users are responsible for:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Maintaining the security of their private keys</li>
              <li>Ensuring their node remains online when required</li>
              <li>Understanding the risks of alpha software</li>
              <li>Following security best practices</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2>5. Disclaimer of Warranties</h2>
            <p>
              KaleidoSwap is provided "as is" without warranty of any kind. We do not guarantee uninterrupted or error-free operation.
            </p>
          </section>

          <section className="mt-8">
            <h2>6. Limitation of Liability</h2>
            <p>
              In no event shall KaleidoSwap be liable for any damages arising out of the use or inability to use the application.
            </p>
          </section>

          <section className="mt-8">
            <h2>7. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of any changes by updating the date at the top of this page.
            </p>
          </section>

          <section className="mt-8">
            <h2>8. Contact</h2>
            <p>
              For any questions regarding these terms, please contact us via:
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