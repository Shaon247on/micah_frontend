export interface HvacEstimateSettings {
  id: string;
  baseRatePerSqFt: number;
  laborRatePerHour: number;
  markupPercentage: number;
  tier1Multiplier: number;
  tier2Multiplier: number;
  tier3Multiplier: number;
  installationBaseFee: number;
  permitFee: number;
  disposalFee: number;
  monthlyPaymentRate: number;
  updatedAt: string;
}

export interface HvacQuote {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  squareFootage: number;
  stories: number;
  bedrooms: number;
  heatingSource: string;
  selectedTier: number;
  systemBrand: string;
  systemName: string;
  systemPrice: number;
  retailPrice: number;
  cashPrice: number;
  onlineSavings: number;
  monthlyPayment: number;
  preferredDate: string | null;
  preferredTime: string | null;
  notes: string | null;
  status: string;
  orderNumber: string;
  createdAt: string;
  appointmentId: string | null;
}

export interface HvacSystem {
  id: string;
  tier: string;
  brand: string;
  name: string;
  type: string;
  fuel: string;
  seer2: string;
  dehumidification: number;
  noiseLevel: string;
  noiseStars: number;
  partsWarranty: string;
  partsStars: number;
  laborWarranty: string;
  laborStars: number;
  retailPrice: number;
  cashPrice: number;
  onlineSavings: number;
  monthlyPrice: number;
}

export interface AddressFormValues {
  address: string;
}

export interface HomeInfoFormValues {
  bedrooms: number;
  stories: number;
  squareFootage: number;
  heatingSource: string;
}

export interface HomeInfoEditFormValues {
  squareFootage: number;
  stories: number;
  heatingSource: string;
  bedrooms: number;
}

export interface ContactFormValues {
  fullName: string;
  phoneNumber: string;
}

export interface ScheduleFormValues {
  installDate: 'tomorrow' | 'pick';
  pickedDate?: string;
  email: string;
  notes?: string;
  promoCode?: string;
  acceptedTerms: boolean;
}

export type QuoteStep = 
  | 'address'
  | 'home-info'
  | 'home-info-edit'
  | 'contact'
  | 'system'
  | 'schedule'
  | 'confirmation';