import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
    const { i18n, t } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div style={{ margin: '20px 0' }}>
            <h3>{t('language')}:</h3>
            <button
                onClick={() => changeLanguage('en')}
                style={{
                    marginRight: '10px',
                    padding: '8px 16px',
                    backgroundColor: i18n.language === 'en' ? '#007bff' : '#f8f9fa',
                    color: i18n.language === 'en' ? 'white' : 'black',
                    border: '1px solid #dee2e6',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                {t('english')}
            </button>
            <button
                onClick={() => changeLanguage('vi')}
                style={{
                    padding: '8px 16px',
                    backgroundColor: i18n.language === 'vi' ? '#007bff' : '#f8f9fa',
                    color: i18n.language === 'vi' ? 'white' : 'black',
                    border: '1px solid #dee2e6',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                {t('vietnamese')}
            </button>
        </div>
    );
}
