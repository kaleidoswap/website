// src/components/nav/Navbar.tsx
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { Button } from '@/components/common/Button'
import { mainNavItems } from '@/constants/navigation'
import { cn } from '@/lib/utils'
import kaleidoLogo from '@/assets/kaleidoswap-logo.svg'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(href)
  }

  return (
    <nav 
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        scrolled 
          ? "bg-gray-900/90 backdrop-blur-md shadow-md" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo and Brand */}
          <div className="flex items-center gap-2">
            <a href="/" className="flex items-center gap-2 group">
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
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
              >
                {item.label}
              </a>
            ))}
            <Button
              variant="default"
              size="default"
              onClick={() => window.location.href = '/downloads'}
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
          <div className="md:hidden py-4 px-2 space-y-1 border-t border-gray-800/50 animate-fadeIn">
            {mainNavItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "block py-2.5 px-4 text-base rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors",
                  isActive(item.href) && "text-white font-medium bg-gray-800/50"
                )}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                onClick={() => setIsOpen(false)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2">
              <Button
                variant="default"
                size="default"
                className="w-full group relative overflow-hidden"
                onClick={() => {
                  window.location.href = '/downloads'
                  setIsOpen(false)
                }}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-600 to-primary-500 group-hover:from-primary-500 group-hover:to-primary-400 transition-all duration-300"></span>
                <span className="relative">Download</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}