import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Building2, Share2 } from 'lucide-react';
import { TabNavigation } from './partials/TabNavigate';
import { OverviewTab } from './partials/OverviewTab';
import { SocialLinksTab } from './partials/SocialLinksTab';
import { getCompany } from '../../../modules/services/companyService';

export default function CompanySetting() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const companyId = currentUser?.company?.id;
  const companyData = useSelector((state) => state.company.company);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (companyId) {
      dispatch(getCompany(companyId));
    }
  }, [dispatch, companyId]);

  const tabs = [
    { id: 'overview', label: t("companySetting.tabs.overview"), icon: Building2 },
    { id: 'social-links', label: t("companySetting.tabs.socialLinks"), icon: Share2 },
  ];

  return (
    <div className="bg-background p-4 lg:p-6 2xl:p-8 space-y-8">
      <div>
        <h4 className="font-bold text-foreground">{t("companySetting.title")}</h4>
      </div>

      <div className="flex gap-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <div
              key={tab.id}
              className={`flex-1 flex items-center gap-3 p-4 rounded-lg transition-colors cursor-pointer ${isActive
                ? "bg-primary/10 border-2 border-primary"
                : "bg-input border-2 border-border hover:bg-muted/50"
                }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors ${isActive
                  ? "bg-primary text-white"
                  : "bg-input text-muted-foreground border border-border"
                  }`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className={`font-semibold ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                  {tab.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-card rounded-lg px-6">
        {activeTab === 'overview' && (
          <OverviewTab company={companyData} companyId={companyId} />
        )}
        {activeTab === 'social-links' && (
          <SocialLinksTab companyId={companyId} />
        )}
      </div>
    </div>
  );
}