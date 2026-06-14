import {
  Save,
  Building2,
  Upload,
} from 'lucide-react';

export default function SettingsManagement() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-(--color-text-main)">
            Settings
          </h1>

          <p className="mt-1 text-sm text-(--color-text-muted)">
            Manage your dashboard preferences and company details.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 rounded-md bg-(--color-primary) px-4 py-2 text-sm font-medium text-white transition hover:opacity-90">
          <Save size={18} />
          Save Settings
        </button>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[250px_1fr]">
        {/* Sidebar */}
        <div className="h-fit rounded-xl border border-(--color-border) bg-white p-4">
          <button className="flex w-full items-center gap-3 rounded-md bg-(--color-primary-light) px-4 py-3 text-left font-medium text-(--color-primary) transition">
            <Building2 size={18} />
            Company Info
          </button>
        </div>

        {/* Content */}
        <div className="rounded-xl border border-(--color-border) bg-white overflow-hidden">
          {/* Card Header */}
          <div className="border-b border-(--color-border) px-6 py-5">
            <h2 className="text-base font-semibold text-(--color-text-main)">
              Company Information
            </h2>
          </div>

          {/* Card Body */}
          <div className="space-y-6 p-6">
            {/* Logo Upload */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              {/* Preview */}
              <div className="flex h-20 w-20 items-center justify-center rounded-md border border-(--color-border) bg-gray-100 text-2xl font-bold text-(--color-primary)">
                CA
              </div>

              {/* Upload */}
              <div className="flex flex-col gap-2">
                <button className="inline-flex w-fit items-center gap-2 rounded-md border border-(--color-border) bg-white px-4 py-2 text-[13px] font-medium text-(--color-text-main) transition hover:bg-gray-50">
                  <Upload size={14} />
                  Upload Logo
                </button>

                <p className="text-sm text-(--color-text-muted)">
                  Recommended size: 256x256px. Max 2MB.
                </p>
              </div>
            </div>

            {/* Row 1 */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-(--color-text-main)">
                  Company Name
                </label>

                <input
                  type="text"
                  className="h-11 w-full rounded-md border border-(--color-border) px-4 text-sm outline-none transition focus:border-(--color-primary)"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-(--color-text-main)">
                  Contact Email
                </label>

                <input
                  type="email"
                  className="h-11 w-full rounded-md border border-(--color-border) px-4 text-sm outline-none transition focus:border-(--color-primary)"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-(--color-text-main)">
                  Phone Number
                </label>

                <input
                  type="tel"
                  className="h-11 w-full rounded-md border border-(--color-border) px-4 text-sm outline-none transition focus:border-(--color-primary)"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-(--color-text-main)">
                  Website URL
                </label>

                <input
                  type="url"
                  className="h-11 w-full rounded-md border border-(--color-border) px-4 text-sm outline-none transition focus:border-(--color-primary)"
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-(--color-text-main)">
                Business Address
              </label>

              <input
                type="text"
                className="h-11 w-full rounded-md border border-(--color-border) px-4 text-sm outline-none transition focus:border-(--color-primary)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}