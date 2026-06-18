// ============================================================
// HVAC QUOTE TYPES
// ============================================================

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
  appointment?: any;
}

export interface ScheduleFormValues {
  installDate: 'tomorrow' | 'pick';
  pickedDate?: string;
  email: string;
  notes?: string;
  promoCode?: string;
  acceptedTerms: boolean;
}

export type QuoteStep = 'address' | 'home-info' | 'system' | 'schedule' | 'confirmation';

// ============================================================
// HELPERS
// ============================================================

export function generateOrderNumber(): string {
  const prefix = 'HVAC';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp}-${random}`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getStepperKey(step: QuoteStep): number {
  const stepMap: Record<QuoteStep, number> = {
    'address': 1,
    'home-info': 2,
    'system': 3,
    'schedule': 4,
    'confirmation': 5,
  };
  return stepMap[step] || 1;
}


export interface ScheduleFormValues {
  installDate: 'tomorrow' | 'pick';
  pickedDate?: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  notes?: string;
  acceptedTerms: boolean;
}


export const MOCK_SYSTEMS: HvacSystem[] = [
  {
    id: '1',
    tier: 'Economy',
    brand: 'Ameristar',
    name: 'Classic',
    type: 'A/C & Gas Furnace',
    fuel: 'Gas',
    seer2: '14.3 SEER2',
    dehumidification: 3,
    noiseLevel: 'Standard',
    noiseStars: 3,
    partsWarranty: '10 Year',
    partsStars: 5,
    laborWarranty: '2 Year',
    laborStars: 3,
    retailPrice: 12940,
    cashPrice: 10999,
    onlineSavings: 1941,
    monthlyPrice: 99,
  },
  {
    id: '2',
    tier: 'Standard',
    brand: 'Friedrich',
    name: 'Signature',
    type: 'A/C & Gas Furnace',
    fuel: 'Gas',
    seer2: '15.2 SEER2',
    dehumidification: 3,
    noiseLevel: 'Standard',
    noiseStars: 3,
    partsWarranty: '10 Year',
    partsStars: 5,
    laborWarranty: '5 Year',
    laborStars: 4,
    retailPrice: 15540,
    cashPrice: 13216,
    onlineSavings: 2324,
    monthlyPrice: 199,
  },
  {
    id: '3',
    tier: 'Premium',
    brand: 'American Standard',
    name: 'Premium',
    type: 'A/C & Gas Furnace',
    fuel: 'Gas',
    seer2: '15.2 SEER2',
    dehumidification: 3,
    noiseLevel: 'Standard',
    noiseStars: 3,
    partsWarranty: '10 Year',
    partsStars: 5,
    laborWarranty: '5 Year',
    laborStars: 4,
    retailPrice: 18116,
    cashPrice: 15399,
    onlineSavings: 2717,
    monthlyPrice: 139,
  },
];