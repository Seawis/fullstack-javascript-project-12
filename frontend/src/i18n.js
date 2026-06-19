import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import resources from './locales/index'

const defaultLang = 'ru'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: defaultLang, 
    interpolation: {
      escapeValue: false // react already safes from xss
    },
  })

  export default i18n
