import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslation from '../app/locales/en/translation.json';
import viTranslation from '../app/locales/vi/translation.json';

const resources = {
    en: {
        translation: enTranslation
    },
    vi: {
        translation: viTranslation
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        debug: true,

        detection: {
            order: ['localStorage', 'navigator', 'htmlTag'],
            caches: ['localStorage']
        },

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
