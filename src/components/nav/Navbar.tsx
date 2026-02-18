import { useState, useEffect, useCallback, useRef } from 'react'
import { Menu, X, ChevronDown, ExternalLink } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/common/Button'
import { mainNavItems, productItems, developerItems } from '@/constants/navigation'
import { PRODUCTS } from '@/constants/urls'
import { cn, openExternalLink } from '@/lib/utils'
import kaleidoFullLogo from '@/assets/kaleidoswap-full-logo.svg'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [developersOpen, setDevelopersOpen] = useState(false)
  const productsRef = useRef<HTMLDivElement>(null)
  const developersRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
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
    setDevelopersOpen(false)
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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (productsRef.current && !productsRef.current.contains(event.target as Node)) {
        setProductsOpen(false)
      }
      if (developersRef.current && !developersRef.current.contains(event.target as Node)) {
        setDevelopersOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close dropdowns and mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (productsOpen) {
          setProductsOpen(false)
        } else if (developersOpen) {
          setDevelopersOpen(false)
        } else if (isOpen) {
          setIsOpen(false)
          menuButtonRef.current?.focus()
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [productsOpen, developersOpen, isOpen])

  // Focus trap for mobile menu
  useEffect(() => {
    if (!isOpen || !mobileMenuRef.current) return

    const menu = mobileMenuRef.current
    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    const focusableElements = menu.querySelectorAll<HTMLElement>(focusableSelector)
    const firstFocusable = focusableElements[0]
    const lastFocusable = focusableElements[focusableElements.length - 1]

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable || document.activeElement === menuButtonRef.current) {
          e.preventDefault()
          lastFocusable?.focus()
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault()
          menuButtonRef.current?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleTabKey)
    return () => document.removeEventListener('keydown', handleTabKey)
  }, [isOpen])

  const handleNavigation = (href: string, external = false) => {
    if (external) {
      openExternalLink(href)
    } else {
      navigate(href)
    }
    setIsOpen(false)
    setProductsOpen(false)
    setDevelopersOpen(false)
  }

  return (
    <>
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary-500 focus:text-white focus:rounded-lg focus:outline-none"
      >
        {t('Skip to main content')}
      </a>

      <nav
        className={cn(
          'fixed w-full z-50 transition-all duration-300',
          isOpen
            ? 'bg-gray-900 shadow-md'
            : scrolled
              ? 'bg-gray-900/95 backdrop-blur-md shadow-md'
              : 'bg-transparent'
        )}
        role="navigation"
        aria-label={t('Main navigation')}
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
                alt="KaleidoSwap - Home"
                className="h-8 md:h-10 transition-transform duration-300 group-hover:scale-105"
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {/* Products Dropdown */}
              <div ref={productsRef} className="relative">
                <button
                  onClick={() => setProductsOpen(!productsOpen)}
                  aria-expanded={productsOpen}
                  aria-haspopup="true"
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
                  <div className="absolute top-full left-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-xl shadow-xl overflow-hidden" role="menu">
                    {productItems.map((item) => {
                      const hasPage = item.href !== '#'
                      return (
                        <button
                          key={item.label}
                          onClick={() =>
                            hasPage &&
                            handleNavigation(item.href, item.external)
                          }
                          disabled={!hasPage}
                          role="menuitem"
                          className={cn(
                            'w-full px-4 py-3 text-left flex items-center justify-between transition-colors',
                            hasPage
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
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Developers Dropdown */}
              <div ref={developersRef} className="relative">
                <button
                  onClick={() => setDevelopersOpen(!developersOpen)}
                  aria-expanded={developersOpen}
                  aria-haspopup="true"
                  className={cn(
                    'flex items-center gap-1 text-gray-300 hover:text-white transition-colors py-1',
                    developersOpen && 'text-white'
                  )}
                >
                  {t('Developers')}
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 transition-transform',
                      developersOpen && 'rotate-180'
                    )}
                  />
                </button>

                {developersOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-xl shadow-xl overflow-hidden" role="menu">
                    {developerItems.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault()
                          handleNavigation(item.href, item.external)
                        }}
                        role="menuitem"
                        className="flex items-start gap-3 px-4 py-3 hover:bg-gray-700/50 transition-colors group"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 text-gray-200 group-hover:text-white font-medium text-sm">
                            {t(item.label)}
                            <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-gray-300 shrink-0" />
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">{t(item.description)}</p>
                        </div>
                      </a>
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

              {/* Language Switcher */}
              <LanguageSwitcher variant="compact" dropdownPosition="below" />

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
              ref={menuButtonRef}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all"
              aria-label={isOpen ? t('Close menu') : t('Open menu')}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div
              ref={mobileMenuRef}
              id="mobile-menu"
              className="md:hidden fixed inset-0 top-16 bg-gray-900/95 backdrop-blur-md z-40 overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-label={t('Mobile navigation menu')}
            >
              <div className="container mx-auto px-4 py-6">
                {/* Products section */}
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-wide text-gray-500 mb-3 px-4">
                    {t('Products')}
                  </p>
                  {productItems.map((item) => {
                    const hasPage = item.href !== '#'
                    return (
                      <button
                        key={item.label}
                        onClick={() =>
                          hasPage &&
                          handleNavigation(item.href, item.external)
                        }
                        disabled={!hasPage}
                        className={cn(
                          'w-full py-3 px-4 text-left text-lg rounded-lg flex items-center justify-between my-1',
                          hasPage
                            ? 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                            : 'text-gray-600 cursor-not-allowed'
                        )}
                      >
                        <span>{t(item.label)}</span>
                        {item.status === 'coming-soon' && (
                          <span className="text-xs text-gray-600">Soon</span>
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Developers section */}
                <div className="border-t border-gray-800 pt-6 mb-6">
                  <p className="text-xs uppercase tracking-wide text-gray-500 mb-3 px-4">
                    {t('Developers')}
                  </p>
                  {developerItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavigation(item.href, item.external)
                      }}
                      className="flex items-center justify-between py-3 px-4 text-lg rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 my-1"
                    >
                      <span>{t(item.label)}</span>
                      <ExternalLink className="w-4 h-4 text-gray-500" />
                    </a>
                  ))}
                </div>

                {/* Language Switcher */}
                <div className="border-t border-gray-800 pt-6 mb-6 px-4">
                  <LanguageSwitcher variant="default" dropdownPosition="below" />
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
    </>
  )
}
