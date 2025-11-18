import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import resources from './resources'

const supportedLanguages = ['en', 'es', 'it', 'zh', 'de', 'fr', 'ja'] as const
const fallbackLng = 'en'
const storageKey = 'kaleidoswap_locale'

const getInitialLanguage = (): string => {
  if (typeof window === 'undefined') {
    return fallbackLng
  }

  const stored = window.localStorage.getItem(storageKey)
  if (stored && supportedLanguages.includes(stored as (typeof supportedLanguages)[number])) {
    return stored
  }

  return fallbackLng
}

void i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng,
  supportedLngs: supportedLanguages,
  interpolation: {
    escapeValue: false
  },
  keySeparator: false,
  nsSeparator: false
})

export const languageStorageKey = storageKey

export default i18n
