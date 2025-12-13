import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TabNavigation } from './partials/TabNavigate';
import { OverviewTab } from './partials/OverviewTab';
import { SocialLinksTab } from './partials/SocialLinksTab';
import { getCompany } from '../../../modules/services/companyService';

export default function CompanySetting() {
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

  return (
    <div className="min-h-screen pt-10">
      <div className="w-full max-w-full lg:max-w-7xl mx-auto px-1 sm:px-2 md:px-4 lg:px-6 py-4 md:py-6">
        <h3 className="mb-3 md:mb-4 text-lg font-medium font-bold">Settings</h3>

        <div className="bg-white rounded-lg p-4 sm:p-5 md:p-6 mb-3 md:mb-4">
          <div className="mb-3 md:mb-4">
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
          {activeTab === 'overview' && <OverviewTab company={companyData} companyId={companyId} />}
          {activeTab === 'social-links' && <SocialLinksTab company={companyData} />}
        </div>
      </div>
    </div>
  );
}