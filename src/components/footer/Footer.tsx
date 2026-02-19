// src/components/footer/Footer.tsx
import { ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { FooterProps } from '@/types/footer'
import kaleidoFullLogo from '@/assets/kaleidoswap-full-logo.svg'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher'

const currentYear = new Date().getFullYear()

export const Footer = ({ sections, socials }: FooterProps) => {
  const { t } = useTranslation()

  return (
    <footer className="bg-gray-800/50 border-t border-gray-700/50">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={kaleidoFullLogo} alt="Kaleidoswap" className="h-10" />
            </div>

            <p className="text-gray-400">
              {t('The universal swap protocol for Bitcoin L2.')}
            </p>
          </div>

          {/* Sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{t(section.title)}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white flex items-center gap-1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t(link.label)}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-white flex items-center gap-1"
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

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t border-gray-700/50">
          <div className="text-gray-400 text-sm">
            {t('© {{year}} KaleidoSwap. All rights reserved.', { year: currentYear })}
          </div>

          <div className="flex items-center gap-6">
            {/* Language Switcher */}
            <LanguageSwitcher variant="compact" />

            {/* Social Links */}
            <div className="flex gap-4">
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
      </div>
    </footer>
  )
}
