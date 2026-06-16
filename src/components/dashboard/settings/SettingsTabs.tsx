'use client';

import { useState } from 'react';
import { Building2, UserCircle } from 'lucide-react';
import { CompanyInfoForm } from './CompanyInfoForm';
import { ProfileSettingsForm } from './ProfileSettingsForm';
import { CompanySettings } from '@/types/companySettings';
import { Profile } from '@/types/profile';

interface SettingsTabsProps {
  isSuperAdmin: boolean;
  companyData: CompanySettings;
  profileData: Profile;
  onCompanyUpdate: () => void;
  onProfileUpdate: () => void;
}

type TabType = 'company' | 'profile';

export function SettingsTabs({ 
  isSuperAdmin, 
  companyData, 
  profileData,
  onCompanyUpdate,
  onProfileUpdate 
}: SettingsTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('company');

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <div className="h-fit rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex flex-col gap-1">
          {isSuperAdmin && (
            <button
              onClick={() => setActiveTab('company')}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-medium transition ${
                activeTab === 'company'
                  ? 'bg-[#E07B3F]/10 text-[#E07B3F]'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-[#E07B3F]'
              }`}
            >
              <Building2 size={18} />
              Company Info
            </button>
          )}
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-medium transition ${
              activeTab === 'profile'
                ? 'bg-[#E07B3F]/10 text-[#E07B3F]'
                : 'text-gray-600 hover:bg-gray-50 hover:text-[#E07B3F]'
            }`}
          >
            <UserCircle size={18} />
            Profile Settings
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Company Info Section - Only visible to Super Admin */}
        {isSuperAdmin && activeTab === 'company' && (
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <CompanyInfoForm 
              initialData={companyData} 
              onSuccess={onCompanyUpdate}
            />
          </div>
        )}

        {/* Profile Settings Section */}
        {activeTab === 'profile' && (
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <ProfileSettingsForm 
              initialData={profileData} 
              onSuccess={onProfileUpdate}
            />
          </div>
        )}
      </div>
    </div>
  );
}