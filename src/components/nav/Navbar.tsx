import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

// Saved page-scroll position while the mobile menu is open (iOS needs position:fixed on body)
let _savedScrollY = 0
import { Menu, X, ChevronDown, ExternalLink, ArrowRight } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/common/Button'
import { mainNavItems, productItems, resourceItems } from '@/constants/navigation'
import { cn, openExternalLink } from '@/lib/utils'
const kaleidoFullLogo = '/logos/kaleidoswap-logos/kaleidoswap-full-logo.svg'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const productsRef = useRef<HTMLDivElement>(null)
  const resourcesRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    setIsOpen(false)
    setProductsOpen(false)
    setResourcesOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const body = document.body
    if (isOpen) {
      _savedScrollY = window.scrollY
      body.style.overflow = 'hidden'
      body.style.position = 'fixed'
      body.style.top = `-${_savedScrollY}px`
      body.style.width = '100%'
    } else {
      body.style.overflow = ''
      body.style.position = ''
      body.style.top = ''
      body.style.width = ''
      window.scrollTo(0, _savedScrollY)
    }
    return () => {
      body.style.overflow = ''
      body.style.position = ''
      body.style.top = ''
      body.style.width = ''
    }
  }, [isOpen])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (productsRef.current && !productsRef.current.contains(event.target as Node)) {
        setProductsOpen(false)
      }
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setResourcesOpen(false)
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
        } else if (resourcesOpen) {
          setResourcesOpen(false)
        } else if (isOpen) {
          setIsOpen(false)
          menuButtonRef.current?.focus()
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [productsOpen, resourcesOpen, isOpen])

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
    setResourcesOpen(false)
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
        className="fixed w-full z-50"
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
            <div className="hidden md:flex items-center gap-4">
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
                      const isAvailable = item.status === 'live'
                      return (
                        <button
                          key={item.label}
                          onClick={() =>
                            isAvailable &&
                            handleNavigation(item.href, item.external)
                          }
                          disabled={!isAvailable}
                          role="menuitem"
                          className={cn(
                            'w-full px-4 py-3 text-left flex items-center justify-between transition-colors',
                            isAvailable
                              ? 'text-gray-200 hover:bg-gray-700/50 hover:text-white'
                              : 'text-gray-500 cursor-not-allowed'
                          )}
                        >
                          <span>{t(item.label)}</span>
                          {item.status === 'coming-soon' && (
                            <span className="text-xs text-gray-500">Soon</span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Resources Dropdown */}
              <div ref={resourcesRef} className="relative">
                <button
                  onClick={() => setResourcesOpen(!resourcesOpen)}
                  aria-expanded={resourcesOpen}
                  aria-haspopup="true"
                  className={cn(
                    'flex items-center gap-1 text-gray-300 hover:text-white transition-colors py-1',
                    resourcesOpen && 'text-white'
                  )}
                >
                  {t('Resources')}
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 transition-transform',
                      resourcesOpen && 'rotate-180'
                    )}
                  />
                </button>

                {resourcesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-xl shadow-xl overflow-hidden" role="menu">
                    {resourceItems.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault()
                          handleNavigation(item.href, item.external)
                        }}
                        role="menuitem"
                        className="flex items-center justify-between px-4 py-3 hover:bg-gray-700/50 transition-colors group"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="text-gray-200 group-hover:text-white font-medium text-sm">
                            {t(item.label)}
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

              {/* CTAs */}
              <Button
                variant="outline"
                size="default"
                onClick={() => window.open('https://forms.gle/e1RR26RURF8qwGou5', '_blank')}
                className="flex items-center gap-2"
              >
                {t('Get Support')}
              </Button>
              <Button
                variant="default"
                size="default"
                onClick={() => handleNavigation('/products')}
                className="flex items-center gap-2"
              >
                {t('Download')}
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

          {/* Mobile Navigation — portaled to body so `fixed` resolves against
              the viewport, not a transformed ancestor (div.animate-fadeIn). */}
          {isOpen && createPortal(
            <div
              ref={mobileMenuRef}
              id="mobile-menu"
              className="md:hidden fixed inset-x-0 top-16 h-[calc(100dvh-4rem)] bg-gray-900/95 backdrop-blur-md z-40 overflow-y-auto overscroll-contain"
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
                    const isAvailable = item.status === 'live'
                    return (
                      <button
                        key={item.label}
                        onClick={() =>
                          isAvailable &&
                          handleNavigation(item.href, item.external)
                        }
                        disabled={!isAvailable}
                        className={cn(
                          'w-full py-3 px-4 text-left text-lg rounded-lg flex items-center justify-between my-1',
                          isAvailable
                            ? 'text-gray-200 hover:bg-gray-700/50 hover:text-white'
                            : 'text-gray-500 cursor-not-allowed'
                        )}
                      >
                        <span>{t(item.label)}</span>
                        {item.status === 'coming-soon' ? (
                          <span className="text-xs text-gray-500">Soon</span>
                        ) : (
                          <ExternalLink className="w-3 h-3 text-gray-500" />
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Resources section */}
                <div className="border-t border-gray-800 pt-6 mb-6">
                  <p className="text-xs uppercase tracking-wide text-gray-500 mb-3 px-4">
                    {t('Resources')}
                  </p>
                  {resourceItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavigation(item.href, item.external)
                      }}
                      className="flex items-center justify-between py-3 px-4 text-lg rounded-lg text-gray-200 hover:text-white hover:bg-gray-700/50 my-1"
                    >
                      <span>{t(item.label)}</span>
                      {item.external ? (
                        <ExternalLink className="w-3 h-3 text-gray-500" />
                      ) : (
                        <ArrowRight className="w-3 h-3 text-gray-500" />
                      )}
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
                    className="w-full justify-center flex items-center gap-2"
                    onClick={() => handleNavigation('/products')}
                  >
                    {t('Download')}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full justify-center"
                    onClick={() => window.open('https://forms.gle/e1RR26RURF8qwGou5', '_blank')}
                  >
                    {t('Get Support')}
                  </Button>
                </div>
              </div>
            </div>,
            document.body
          )}
        </div>
      </nav>
    </>
  )
}
