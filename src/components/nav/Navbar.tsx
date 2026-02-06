// src/components/nav/Navbar.tsx
import { useState, useEffect, useCallback, useRef } from 'react'
import { Menu, X, ChevronDown, ExternalLink } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/common/Button'
import { mainNavItems, productItems } from '@/constants/navigation'
import { PRODUCTS } from '@/constants/urls'
import { cn, openExternalLink } from '@/lib/utils'
import kaleidoFullLogo from '@/assets/kaleidoswap-full-logo.svg'
import { useTranslation } from 'react-i18next'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const productsRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const checkScroll = useCallback(() => {
    setScrolled(window.scrollY > 10)
  }, [])

  useEffect(() => {
    checkScroll()
    window.addEventListener('scroll', checkScroll)
    return () => window.removeEventListener('scroll', checkScroll)
  }, [checkScroll])

  useEffect(() => {
    checkScroll()
    setIsOpen(false)
    setProductsOpen(false)
  }, [location.pathname, checkScroll])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (productsRef.current && !productsRef.current.contains(event.target as Node)) {
        setProductsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleNavigation = (href: string, external = false) => {
    if (external) {
      openExternalLink(href)
    } else {
      navigate(href)
    }
    setIsOpen(false)
    setProductsOpen(false)
  }

  return (
    <nav
      className={cn(
        'fixed w-full z-50 transition-all duration-300',
        scrolled || isOpen
          ? 'bg-gray-900/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <a
            onClick={(e) => {
              e.preventDefault()
              handleNavigation('/')
            }}
            href="/"
            className="flex items-center gap-2 group"
          >
            <img
              src={kaleidoFullLogo}
              alt="KaleidoSwap"
              className="h-8 md:h-10 transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Products Dropdown */}
            <div ref={productsRef} className="relative">
              <button
                onClick={() => setProductsOpen(!productsOpen)}
                className={cn(
                  'flex items-center gap-1 text-gray-300 hover:text-white transition-colors py-1',
                  productsOpen && 'text-white'
                )}
              >
                {t('Products')}
                <ChevronDown
                  className={cn(
                    'w-4 h-4 transition-transform',
                    productsOpen && 'rotate-180'
                  )}
                />
              </button>

              {productsOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-xl shadow-xl overflow-hidden">
                  {productItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() =>
                        item.status === 'live' &&
                        handleNavigation(item.href, item.external)
                      }
                      disabled={item.status === 'coming-soon'}
                      className={cn(
                        'w-full px-4 py-3 text-left flex items-center justify-between transition-colors',
                        item.status === 'live'
                          ? 'text-gray-200 hover:bg-gray-700/50 hover:text-white'
                          : 'text-gray-500 cursor-not-allowed'
                      )}
                    >
                      <span>{t(item.label)}</span>
                      {item.status === 'coming-soon' ? (
                        <span className="text-xs text-gray-500">Soon</span>
                      ) : item.external ? (
                        <ExternalLink className="w-3 h-3 text-gray-500" />
                      ) : null}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Other nav items */}
            {mainNavItems
              .filter((item) => item.label !== 'Products')
              .map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation(item.href, item.external)
                  }}
                  className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors py-1"
                >
                  {t(item.label)}
                  {item.external && <ExternalLink className="w-3 h-3" />}
                </a>
              ))}

            {/* CTA */}
            <Button
              variant="default"
              size="default"
              onClick={() => handleNavigation(PRODUCTS.app, true)}
              className="ml-4"
            >
              {t('Launch App')}
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all"
            aria-label={isOpen ? t('Close menu') : t('Open menu')}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 top-16 bg-gray-900/95 backdrop-blur-md z-40 overflow-y-auto">
            <div className="container mx-auto px-4 py-6">
              {/* Products section */}
              <div className="mb-6">
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-3 px-4">
                  {t('Products')}
                </p>
                {productItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() =>
                      item.status === 'live' &&
                      handleNavigation(item.href, item.external)
                    }
                    disabled={item.status === 'coming-soon'}
                    className={cn(
                      'w-full py-3 px-4 text-left text-lg rounded-lg flex items-center justify-between my-1',
                      item.status === 'live'
                        ? 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                        : 'text-gray-600 cursor-not-allowed'
                    )}
                  >
                    <span>{t(item.label)}</span>
                    {item.status === 'coming-soon' && (
                      <span className="text-xs text-gray-600">Soon</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Other links */}
              <div className="border-t border-gray-800 pt-6 mb-6">
                {mainNavItems
                  .filter((item) => item.label !== 'Products')
                  .map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavigation(item.href, item.external)
                      }}
                      className="block py-3 px-4 text-lg rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 my-1"
                    >
                      {t(item.label)}
                      {item.external && (
                        <ExternalLink className="inline w-4 h-4 ml-2" />
                      )}
                    </a>
                  ))}
              </div>

              {/* CTAs */}
              <div className="space-y-3 px-4">
                <Button
                  variant="default"
                  size="lg"
                  className="w-full justify-center"
                  onClick={() => handleNavigation(PRODUCTS.app, true)}
                >
                  {t('Launch App')}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full justify-center border-gray-600 text-gray-300"
                  onClick={() => handleNavigation('/downloads')}
                >
                  {t('Download Desktop')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
