import { useState } from 'react';
import { TabNavigation } from './partials/TabNavigate';
import { OverviewTab } from './partials/OverviewTab';
import { SocialLinksTab } from './partials/SocialLinksTab';

export default function CompanySetting() {
  const [activeTab, setActiveTab] = useState('overview');

  const handleSaveChanges = () => {
    console.log('Saving changes...');
    // Handle save logic
  };

  return (
    <div className="min-h-screen pt-10">
      <div className="w-full max-w-full lg:max-w-7xl mx-auto px-1 sm:px-2 md:px-4 lg:px-6 py-4 md:py-6">
        {/* Header */}
        <h3 className="mb-3 md:mb-4 text-lg font-medium font-weight-bold">Settings</h3>

        {/* Tab Content */}
        <div className="bg-white rounded-lg p-4 sm:p-5 md:p-6 mb-3 md:mb-4">
        {/* Tab Navigation */}
        <div className="mb-3 md:mb-4">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'social-links' && <SocialLinksTab />}
          {/* Footer with Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSaveChanges}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}