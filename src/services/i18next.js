import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from '../locales/en.json'
import he from '../locales/he.json'
import { storageService } from './storage-service'

const resources = {
    en: { translation: en },
    he: { translation: he }
}

const lng = storageService.load('dataDB') ? storageService.load('dataDB')?.game?.lang === 'English' ? 'en' : 'he' : 'en'
console.log(lng);
i18n.fallback = true

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng,
        keySeparator: false,
        interpolation: { escapeValue: false }
    })
export default i18n