// src/components/nav/Navbar.tsx
import { useState, useEffect, useCallback } from 'react'
import { Menu, X } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/common/Button'
import { mainNavItems } from '@/constants/navigation'
import { cn } from '@/lib/utils'
import kaleidoLogo from '@/assets/kaleidoswap-logo.svg'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Function to check scroll position
  const checkScroll = useCallback(() => {
    setScrolled(window.scrollY > 10)
  }, [])

  // Initialize scroll state and set up listener
  useEffect(() => {
    // Check initial scroll position
    checkScroll()
    
    // Add scroll event listener
    window.addEventListener('scroll', checkScroll)
    
    // Clean up
    return () => window.removeEventListener('scroll', checkScroll)
  }, [checkScroll])

  // Reset scroll check when route changes
  useEffect(() => {
    // Check scroll position on route change
    checkScroll()
    
    // Close mobile menu when navigating
    setIsOpen(false)
  }, [location.pathname, checkScroll])

  // Handle mobile menu body scrolling
  useEffect(() => {
    if (isOpen) {
      // Prevent background scrolling when menu is open
      document.body.style.overflow = 'hidden'
      document.body.classList.add('menu-open')
    } else {
      // Restore scrolling when menu is closed
      document.body.style.overflow = ''
      document.body.classList.remove('menu-open')
    }
    
    // Cleanup function
    return () => {
      document.body.style.overflow = ''
      document.body.classList.remove('menu-open')
    }
  }, [isOpen])

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(href)
  }

  // Handle navigation with proper state updates
  const handleNavigation = (href: string, external = false) => {
    if (external) {
      window.open(href, '_blank', 'noopener,noreferrer')
    } else {
      setIsOpen(false) // Close mobile menu
      navigate(href) // Use navigate for client-side routing
    }
  }

  return (
    <nav 
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        scrolled || isOpen
          ? "bg-gray-900/95 backdrop-blur-md shadow-md" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo and Brand */}
          <div className="flex items-center gap-2">
            <a 
              onClick={(e) => {
                e.preventDefault()
                handleNavigation('/')
              }}
              href="/"
              className="flex items-center gap-2 group"
            >
              <div className="relative">
                <img 
                  src={kaleidoLogo} 
                  alt="KaleidoSwap" 
                  className="h-8 md:h-10 transition-transform duration-300 group-hover:scale-110" 
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full"></div>
                </div>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {mainNavItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation(item.href, item.external)
                }}
                className={cn(
                  "text-gray-300 hover:text-white transition-colors relative py-1",
                  isActive(item.href) && [
                    "text-white font-medium",
                    "after:absolute after:bottom-0 after:left-0 after:right-0",
                    "after:h-0.5 after:bg-primary-500",
                    "after:transform after:scale-x-100",
                    "after:transition-transform"
                  ],
                  !isActive(item.href) && [
                    "after:absolute after:bottom-0 after:left-0 after:right-0",
                    "after:h-0.5 after:bg-primary-500",
                    "after:transform after:scale-x-0",
                    "after:transition-transform",
                    "hover:after:scale-x-100"
                  ]
                )}
              >
                {item.label}
              </a>
            ))}
            <Button
              variant="default"
              size="default"
              onClick={() => handleNavigation('/downloads')}
              className="group relative overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-600 to-primary-500 group-hover:from-primary-500 group-hover:to-primary-400 transition-all duration-300"></span>
              <span className="relative">Download</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 top-16 bg-gray-900/95 backdrop-blur-md z-40 overflow-y-auto pt-2 pb-20 mobile-menu animate-fadeIn">
            <div className="container mx-auto px-4 py-4">
              {mainNavItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation(item.href, item.external)
                  }}
                  className={cn(
                    "block py-3 px-4 text-lg rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors my-1",
                    isActive(item.href) && "text-white font-medium bg-gray-800/50"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-6 px-4">
                <Button
                  variant="default"
                  size="lg"
                  className="w-full justify-center text-lg py-4"
                  onClick={() => handleNavigation('/downloads')}
                >
                  <span className="relative">Download</span>
                </Button>
              </div>
              
              {/* Hero section for mobile menu */}
              <div className="mt-10 px-4 py-8 glass-card">
                <h2 className="text-3xl font-bold mb-4 text-gradient">
                  Trustless Trading on Lightning Network
                </h2>
                <p className="text-gray-300 mb-6">
                  KaleidoSwap is the first decentralized trading platform that combines Bitcoin's security, Lightning Network speed, and RGB programmability in a single open-source desktop application.
                </p>
                <div className="space-y-4">
                  <Button
                    variant="default"
                    size="lg"
                    className="w-full justify-center"
                    onClick={() => {
                      handleNavigation('/downloads')
                    }}
                  >
                    Download App
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full justify-center"
                    onClick={() => {
                      handleNavigation('/docs', true)
                    }}
                  >
                    Explore Docs
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}