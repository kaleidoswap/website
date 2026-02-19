import { useState, useRef, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
]

interface LanguageSwitcherProps {
  variant?: 'default' | 'compact'
  dropdownPosition?: 'above' | 'below'
  className?: string
}

export const LanguageSwitcher = ({ variant = 'default', dropdownPosition = 'above', className }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setFocusedIndex(-1)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode)
    setIsOpen(false)
    setFocusedIndex(-1)
  }

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setIsOpen(true)
        setFocusedIndex(0)
      }
      return
    }

    switch (e.key) {
      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        setFocusedIndex(-1)
        break
      case 'ArrowDown':
        e.preventDefault()
        setFocusedIndex(prev => (prev + 1) % languages.length)
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex(prev => (prev - 1 + languages.length) % languages.length)
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (focusedIndex >= 0) {
          handleLanguageChange(languages[focusedIndex].code)
        }
        break
      case 'Home':
        e.preventDefault()
        setFocusedIndex(0)
        break
      case 'End':
        e.preventDefault()
        setFocusedIndex(languages.length - 1)
        break
    }
  }, [isOpen, focusedIndex])

  useEffect(() => {
    if (focusedIndex >= 0 && buttonRefs.current[focusedIndex]) {
      buttonRefs.current[focusedIndex]?.focus()
    }
  }, [focusedIndex])

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      <button
        onClick={() => {
          setIsOpen(!isOpen)
          if (!isOpen) setFocusedIndex(0)
        }}
        onKeyDown={handleKeyDown}
        className={cn(
          'flex items-center gap-2 transition-colors',
          variant === 'default'
            ? 'px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5'
            : 'text-slate-400 hover:text-white'
        )}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {variant === 'default' ? (
          <>
            <Globe className="w-4 h-4" />
            <span className="text-sm">{currentLanguage.name}</span>
            <ChevronDown className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')} />
          </>
        ) : (
          <>
            <span className="text-lg">{currentLanguage.flag}</span>
            <ChevronDown className={cn('w-3 h-3 transition-transform', isOpen && 'rotate-180')} />
          </>
        )}
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute left-0 min-w-[160px] bg-gray-800 border border-gray-700 rounded-xl shadow-xl overflow-hidden z-50',
            dropdownPosition === 'above' ? 'bottom-full mb-2' : 'top-full mt-2'
          )}
          role="listbox"
          aria-label="Languages"
        >
          {languages.map((lang, index) => (
            <button
              key={lang.code}
              ref={(el) => { buttonRefs.current[index] = el }}
              onClick={() => handleLanguageChange(lang.code)}
              onKeyDown={handleKeyDown}
              role="option"
              aria-selected={lang.code === currentLanguage.code}
              tabIndex={focusedIndex === index ? 0 : -1}
              className={cn(
                'w-full px-4 py-2.5 text-left flex items-center gap-3 transition-colors',
                lang.code === currentLanguage.code
                  ? 'bg-primary-500/10 text-primary-400'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white',
                focusedIndex === index && 'bg-white/10'
              )}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="text-sm">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
