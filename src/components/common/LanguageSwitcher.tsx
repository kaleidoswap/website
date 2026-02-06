// src/components/common/LanguageSwitcher.tsx
import { useState, useRef, useEffect } from 'react'
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
  className?: string
}

export const LanguageSwitcher = ({ variant = 'default', className }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode)
    setIsOpen(false)
  }

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 transition-colors',
          variant === 'default'
            ? 'px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5'
            : 'text-slate-400 hover:text-white'
        )}
        aria-label="Select language"
        aria-expanded={isOpen}
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
        <div className="absolute bottom-full mb-2 left-0 min-w-[160px] bg-gray-800 border border-gray-700 rounded-xl shadow-xl overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={cn(
                'w-full px-4 py-2.5 text-left flex items-center gap-3 transition-colors',
                lang.code === currentLanguage.code
                  ? 'bg-primary-500/10 text-primary-400'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
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
