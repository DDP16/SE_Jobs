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
    <div className="min-h-screen bg-gray-50 pt-10">
      <div className="w-full max-w-full lg:max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-6">
        {/* Header */}
        <h3 className="mb-3 md:mb-4">Settings</h3>

        {/* Tab Navigation */}
        <div className="mb-3 md:mb-4">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg p-4 sm:p-5 md:p-6 mb-3 md:mb-4">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'social-links' && <SocialLinksTab />}
        </div>

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
  );
}