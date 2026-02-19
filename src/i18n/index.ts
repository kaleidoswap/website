import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpBackend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

const supportedLanguages = ['en', 'es', 'it', 'zh', 'de', 'fr', 'ja'] as const
const fallbackLng = 'en'
const storageKey = 'kaleidoswap_locale'

void i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng,
    supportedLngs: supportedLanguages,
    debug: import.meta.env.DEV,

    interpolation: {
      escapeValue: false,
    },

    // Key separator disabled - we use flat keys
    keySeparator: false,
    nsSeparator: false,

    // Backend configuration for loading translations
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },

    // Detection configuration
    detection: {
      order: ['localStorage'],
      lookupLocalStorage: storageKey,
      caches: ['localStorage'],
    },

    // React specific options
    react: {
      useSuspense: true,
    },
  })

export const languageStorageKey = storageKey

export default i18n
