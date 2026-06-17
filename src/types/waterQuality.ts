export interface WaterQualityFormData {
  // Step 1: Water Issues & Preferences
  waterIssues: string[];        // Array of water issues
  serviceType: string;          // Desired service type
  propertySizeSqFt: number | null; // Home size in sq ft
  hasWaterSoftener: boolean;
  hasFilterSystem: boolean;
  numberOfBathrooms: number | null;

  // Step 2: Contact Info
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  serviceTypeContact: string;    // ServiceType enum (RESIDENTIAL/COMMERCIAL/BOTH)

  // Step 3: Date & Time
  preferredDate: Date | 'asap' | null;
  preferredTime: string;
  additionalNote: string;
}

export type WaterQualityStep1 = Pick<WaterQualityFormData,
  'waterIssues' | 'serviceType' | 'propertySizeSqFt' | 'hasWaterSoftener' | 'hasFilterSystem' | 'numberOfBathrooms'
>;

export type WaterQualityStep2 = Pick<WaterQualityFormData,
  'fullName' | 'email' | 'phoneNumber' | 'address' | 'serviceTypeContact'
>;

export type WaterQualityStep3 = Pick<WaterQualityFormData,
  'preferredDate' | 'preferredTime' | 'additionalNote'
>;

export interface WaterQualityResponse {
  status: string;
  message: string;
  data?: {
    id: string;
  };
}


