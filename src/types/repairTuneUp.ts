export interface RepairTuneUpFormData {
  // Step 1: System Info
  systemType: string;           // HVACSystemType enum
  specificConcerns: string[];   // Array of concerns
  noiseLevel: string | null;    // NoiseLevel enum
  energyEfficiency: string | null; // EfficiencyRating enum
  lastTuneUpDate: Date | null;

  // Step 2: Contact Info
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  serviceType: string;          // ServiceType enum

  // Step 3: Date & Time
  preferredDate: Date | 'asap' | null;
  preferredTime: string;
  additionalNote: string;
}

export type RepairTuneUpStep1 = Pick<RepairTuneUpFormData,
  'systemType' | 'specificConcerns' | 'noiseLevel' | 'energyEfficiency' | 'lastTuneUpDate'
>;

export type RepairTuneUpStep2 = Pick<RepairTuneUpFormData,
  'fullName' | 'email' | 'phoneNumber' | 'address' | 'serviceType'
>;

export type RepairTuneUpStep3 = Pick<RepairTuneUpFormData,
  'preferredDate' | 'preferredTime' | 'additionalNote'
>;

export interface RepairTuneUpResponse {
  status: string;
  message: string;
  data?: {
    id: string;
  };
}