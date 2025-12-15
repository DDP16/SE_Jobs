import { useTranslation } from 'react-i18next';

export function TabNavigation({ activeTab, onTabChange }) {
    const { t } = useTranslation();

    const tabs = [
        { id: 'overview', label: t("companySetting.tabs.overview") },
        { id: 'social-links', label: t("companySetting.tabs.socialLinks") },
    ];

    return (
        <div className="border-b border-gray-200">
            <div className="flex gap-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`pb-3 relative ${activeTab === tab.id
                            ? 'text-blue-600'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
