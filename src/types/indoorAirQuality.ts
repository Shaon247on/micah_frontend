export interface IndoorAirQualityFormData {
  // Step 1: Air Quality Issues
  symptoms: string[];
  propertySizeSqFt: number | null;
  hasHumidityIssue: boolean;
  hasDustIssue: boolean;
  hasOdorIssue: boolean;
  occupantsWithAllergy: number | null;
  currentSystem: string;

  // Step 2: Contact Info
  fullName: string;
  phone: string;
  email: string;
  address: string;
  zipCode: string;
  propertyType: string;

  // Step 3: Date & Time
  preferredDate: string;
  preferredTime: string;
  notes: string;
}

export type IndoorAirQualityStep1 = Pick<IndoorAirQualityFormData,
  'symptoms' | 'propertySizeSqFt' | 'hasHumidityIssue' | 'hasDustIssue' | 'hasOdorIssue' | 'occupantsWithAllergy' | 'currentSystem'
>;

export type IndoorAirQualityStep2 = Pick<IndoorAirQualityFormData,
  'fullName' | 'phone' | 'email' | 'address' | 'zipCode' | 'propertyType'
>;

export type IndoorAirQualityStep3 = Pick<IndoorAirQualityFormData,
  'preferredDate' | 'preferredTime' | 'notes'
>;