// src/components/footer/Footer.tsx
import { Button } from '@/components/common/Button'
import { Link } from 'react-router-dom'
import type { FooterProps } from '@/types/footer'
import kaleidoFullLogo from '@/assets/kaleidoswap-full-logo.svg'
import kaleidoPictogram from '@/assets/kaleidoswap-pictogram.svg'
import { useTranslation } from 'react-i18next'

const currentYear = new Date().getFullYear()

export const Footer = ({ sections, socials }: FooterProps) => {
  const { t } = useTranslation()

  return (
    <footer className="bg-gray-800/50 border-t border-gray-700/50">
      <div className="container py-16 md:py-16">
        <div className="flex flex-col items-center lg:flex-row lg:items-center gap-6 lg:gap-12 text-center lg:text-left">
          {/* Brand */}
          <div className="space-y-3 lg:w-56 shrink-0 order-2 lg:order-1">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              {/* Pictogram su mobile, full logo su desktop */}
              <img src={kaleidoPictogram} alt="Kaleidoswap" className="h-10 sm:hidden" />
              <img src={kaleidoFullLogo} alt="Kaleidoswap" className="h-10 hidden sm:block" />
            </div>
            <p className="text-gray-400 hidden sm:block">
              {t('The universal swap protocol for Bitcoin L2.')}
            </p>
          </div>

          {/* Sections */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 flex-wrap flex-1 sm:justify-center order-1 lg:order-2">
            {sections.map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold mb-3">{t(section.title)}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      {link.external ? (
                        <a
                          href={link.href}
                          className="text-gray-400 hover:text-white flex items-center justify-center lg:justify-start gap-1"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {t(link.label)}
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="text-gray-400 hover:text-white flex items-center justify-center lg:justify-start gap-1"
                        >
                          {t(link.label)}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA — desktop only */}
          <div className="shrink-0 hidden sm:block order-3">
            <Button
              variant="default"
              size="default"
              onClick={() => window.open('https://forms.gle/e1RR26RURF8qwGou5', '_blank')}
            >
              {t('Get Support')}
            </Button>
          </div>
        </div>

        {/* Bottom — social + copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 mt-6 md:mt-12 pt-6 md:pt-8 border-t border-gray-700/50">
          <div className="text-gray-400 text-sm text-center md:text-left order-2 md:order-1">
            {t('© {{year}} KaleidoSwap. All rights reserved.', { year: currentYear })}
          </div>

          <div className="flex items-center gap-3 order-1 md:order-2">
            {socials.map(({ platform, href, icon: Icon }) => (
              <a
                key={platform}
                href={href}
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={platform}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
