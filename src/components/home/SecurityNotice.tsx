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
    <section className="py-24">
      <div className="container">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
          {/* Header */}
          <div className="flex items-start gap-4 mb-8">
            <div className="p-3 rounded-lg bg-yellow-500/10">
              <Shield className="w-8 h-8 text-yellow-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">{title}</h2>
              <p className="text-gray-400">{description}</p>
            </div>
          </div>

          {/* Warnings */}
          <div className="space-y-4 mb-8">
            {warnings.map((warning, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-lg"
              >
                <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">{warning.title}</h3>
                  <p className="text-gray-400 text-sm">{warning.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          {cta && (
            <div className="flex justify-start">
              <Button
                variant="outline"
                onClick={() => window.location.href = cta.href}
                className="group"
              >
                {cta.label}
                <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}