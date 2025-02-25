// src/components/home/SecurityNotice.tsx
import { Shield, AlertTriangle, ExternalLink } from 'lucide-react'
import { Button } from '@/components/common/Button'
import type { SecurityNoticeProps } from '@/types/security'

export const SecurityNotice = ({
  title,
  description,
  warnings,
  cta
}: SecurityNoticeProps) => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background elements */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-bitcoin-500/5 to-transparent"
        aria-hidden="true"
      />
      
      {/* Grid background */}
      <div className="absolute inset-0 grid-background opacity-10" aria-hidden="true" />
      
      {/* Animated circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-bitcoin-500/10 to-transparent rounded-full blur-3xl animate-pulse-slow" aria-hidden="true" />
      
      <div className="container relative z-10">
        <div className="glass-card border-bitcoin-500/20 p-6 md:p-8 lg:p-10 shadow-glow-bitcoin animate-fadeIn">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6 mb-8">
            <div className="p-3 rounded-lg bg-bitcoin-500/10 w-fit">
              <Shield className="w-8 h-8 text-bitcoin-500" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gradient-bitcoin">{title}</h2>
              <p className="text-gray-300">{description}</p>
              <p className="text-gray-300 mt-2">We're committed to building a secure, reliable platform and value your participation in this journey.</p>
            </div>
          </div>

          {/* Warnings */}
          <div className="space-y-4 mb-8">
            {warnings.map((warning, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-4 md:p-5 bg-gray-900/70 rounded-lg border border-gray-800/50 hover:border-bitcoin-500/30 transition-all hover:shadow-glow-bitcoin animate-fadeIn"
                style={{ animationDelay: `${index * 100 + 200}ms` }}
              >
                <AlertTriangle className="w-5 h-5 text-bitcoin-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1 text-white">{warning.title}</h3>
                  <p className="text-gray-300 text-sm md:text-base">{warning.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Development Roadmap Note */}
          <div className="mb-8 p-4 md:p-5 bg-gray-900/40 rounded-lg border border-gray-800/30 animate-fadeIn" style={{ animationDelay: '500ms' }}>
            <h3 className="font-semibold mb-2 text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-bitcoin-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Active Development
            </h3>
            <p className="text-gray-300 text-sm md:text-base">
              Kaleidoswap is evolving rapidly with regular updates and new features. Our roadmap includes mainnet support, enhanced trading features, and improved user experience based on community feedback.
            </p>
          </div>

          {/* CTA */}
          {cta && (
            <div className="flex justify-start animate-fadeIn" style={{ animationDelay: '600ms' }}>
              <Button
                variant="outline"
                onClick={() => window.location.href = cta.href}
                className="group relative overflow-hidden border-bitcoin-500/50 text-bitcoin-500 hover:bg-bitcoin-500/10"
              >
                <span className="relative flex items-center">
                  {cta.label}
                  <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}