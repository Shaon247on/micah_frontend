import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Building2, UserCircle } from "lucide-react";
import { getCurrentUser } from "@/actions/auth.actions";
import { getCompanySettings } from "@/actions/companySettings.actions";
import { getProfile } from "@/actions/profile.actions";
import { CompanyInfoForm } from "@/components/dashboard/settings/CompanyInfoForm";
import { ProfileSettingsForm } from "@/components/dashboard/settings/ProfileSettingsForm";

export const metadata: Metadata = {
  title: "Settings | HVAC Service",
  description: "Manage your dashboard preferences and company details",
};

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const [companySettingsResult, profileResult] = await Promise.all([
    getCompanySettings(),
    getProfile(),
  ]);

  const isSuperAdmin = user.role === "SUPER_ADMIN";

  // Server actions for refresh
  async function handleCompanyUpdate() {
    "use server";
    redirect("/dashboard/settings");
  }

  async function handleProfileUpdate() {
    "use server";
    redirect("/dashboard/settings");
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#121F37]">Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your company details and profile.
          </p>
        </div>
      </div>

      {/* Layout */}
      <div className="">
        {/* Content */}
        <div className="space-y-6">
          {/* Company Info Section */}
          {isSuperAdmin && (
            <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
              <CompanyInfoForm
                initialData={companySettingsResult.data}
                onSuccess={handleCompanyUpdate}
              />
            </div>
          )}

          {/* Profile Settings Section */}
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <ProfileSettingsForm
              initialData={profileResult.data}
              onSuccess={handleProfileUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
