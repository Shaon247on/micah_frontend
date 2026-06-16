export interface BusinessHour {
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

export interface CompanySettings {
  id: string;
  companyName: string;
  companyLogo: string | null;
  companyFavicon: string | null;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  facebookUrl: string | null;
  twitterUrl: string | null;
  instagramUrl: string | null;
  linkedinUrl: string | null;
  businessHours: BusinessHour[] | null;
  createdAt: string;
  updatedAt: string;
}

export interface CompanySettingsResponse {
  status: string;
  data: CompanySettings;
}

export interface CompanySettingsUpdateResponse {
  status: string;
  message: string;
  data?: CompanySettings;
}