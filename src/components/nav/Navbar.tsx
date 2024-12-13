// src/components/nav/Navbar.tsx
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { mainNavItems } from '@/constants/navigation'
import kaleidoLogo from '@/assets/kaleidoswap-logo.svg'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed w-full bg-gray-900/80 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-2">
            <img src={kaleidoLogo} alt="KaleidoSwap" className="h-10" />
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {mainNavItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors"
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
              >
                {item.label}
              </a>
            ))}
            <Button
              variant="default"
              size="default"
              onClick={() => window.location.href = 'https://github.com/kaleidoswap/desktop-app/releases'}
            >
              Download
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4">
            {mainNavItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-2 text-gray-300 hover:text-white transition-colors"
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button
              variant="default"
              size="default"
              className="w-full mt-4"
              onClick={() => window.location.href = 'https://github.com/kaleidoswap/desktop-app/releases'}
            >
              Download
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}