// src/components/partnerships/Partnerships.tsx
import type { PartnershipsProps } from '@/types/partnerships'
import { Reveal, Gradient, Aurora } from '@/components/animations/ReactBitsFallbacks'
import bitfinexLogo from '@/assets/BrandLogo.org-Bitfinex-Logo.png'
import fulgurLogo from '@/assets/fulgur-logo.svg'

const getPartnerLogo = (partnerName: string) => {
  if (partnerName === 'Bitfinex Ventures') return bitfinexLogo
  if (partnerName === 'Fulgur Ventures') return fulgurLogo
  return ''
}

export const Partnerships = ({
  title,
  description,
  partners
}: PartnershipsProps) => {
  return (
    <section className="py-12 md:py-16 relative overflow-hidden bg-gray-950/30">
      {/* Aurora Background */}
      <Aurora
        className="absolute inset-0 opacity-20"
        colors={['#F7931A', '#00D4AA', '#0e9dff']}
        speed={1.2}
      />

      {/* Dynamic Gradient */}
      <Gradient
        colors={['#00D4AA', '#F7931A', '#0e9dff']}
        className="absolute inset-0 opacity-10"
        speed={2.5}
      />

      <div className="container relative z-10">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-300">
              {title}
            </h2>
            {description && (
              <p className="text-lg text-gray-400 mb-6">
                {description}
              </p>
            )}

            {/* Logo Carousel */}
            <div className="relative overflow-hidden py-4">
              <div className="flex items-center justify-center gap-12 md:gap-16 animate-fadeIn">
                {partners.map((partner) => (
                  <a
                    key={partner.name}
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 transition-all duration-300 hover:scale-110 opacity-100"
                  >
                    <img
                      src={getPartnerLogo(partner.name)}
                      alt={partner.name}
                      className="h-12 md:h-16 w-auto transition-all duration-300"
                      style={{ filter: 'brightness(0) invert(1)' }}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
