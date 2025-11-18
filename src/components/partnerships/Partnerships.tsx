// src/components/partnerships/Partnerships.tsx
import type { PartnershipsProps } from '@/types/partnerships'
import { Reveal, Gradient, Aurora } from '@/components/animations/ReactBitsFallbacks'
import bitfinexLogo from '@/assets/BrandLogo.org-Bitfinex-Logo.png'
import fulgurLogo from '@/assets/fulgur-logo.svg'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()

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
              {t(title)}
            </h2>
            {description && (
              <p className="text-lg text-gray-400 mb-6">
                {t(description)}
              </p>
            )}

            {/* Logo Carousel */}
            <div className="relative py-4">
              {/* Mobile: User-scrollable horizontal carousel */}
              <div className="md:hidden overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                <div className="flex gap-12 px-4 min-w-max">
                  {partners.map((partner) => (
                    <a
                      key={partner.name}
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 transition-all duration-300 active:scale-95 snap-center"
                    >
                      <img
                        src={getPartnerLogo(partner.name)}
                        alt={partner.name}
                        className="h-12 w-auto max-w-[200px] object-contain"
                        style={{ filter: 'brightness(0) invert(1)' }}
                      />
                    </a>
                  ))}
                </div>
              </div>

              {/* Desktop: Static centered layout */}
              <div className="hidden md:flex items-center justify-center gap-12 md:gap-16 animate-fadeIn">
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
                      className="h-12 md:h-14 w-auto max-w-[200px] object-contain transition-all duration-300"
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
