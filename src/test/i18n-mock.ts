import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Initialize i18n for tests with mock translations
void i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  ns: ['translation'],
  defaultNS: 'translation',

  // Return key as translation for tests
  resources: {
    en: {
      translation: {},
    },
  },

  interpolation: {
    escapeValue: false,
  },

  // Disable suspense in tests
  react: {
    useSuspense: false,
  },

  // Return the key if no translation found
  returnEmptyString: false,
  returnNull: false,
  keySeparator: false,
  nsSeparator: false,

  // Missing key handler - just return the key
  parseMissingKeyHandler: (key: string) => key,
  missingKeyHandler: false,
})

export default i18n
