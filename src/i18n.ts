import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-xhr-backend'
import detector from 'i18next-browser-languagedetector'
import { SupportedLanguages } from 'constants/languageConstants'

i18n
  .use(Backend)
  .use(detector)
  .use(initReactI18next)
  .init({
    fallbackLng: SupportedLanguages.TURKISH,
    supportedLngs: Object.values(SupportedLanguages),
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },
    defaultNS: 'common',
    interpolation: {
      escapeValue: false
    },
    returnEmptyString: false,
    react: {
      useSuspense: true
    }
  })

export default i18n
