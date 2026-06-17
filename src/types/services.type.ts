import { z } from "zod";

export * from './repairReplace';
export * from '../schemas/repairReplace.schema';
export * from './waterQuality';
export * from '../schemas/waterQuality.schema';


// ─── Shared contact schema (used in every form) ────────────────────────────────
export const contactInfoSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .regex(/^\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/, "Enter a valid US phone number"),
  email: z.string().email("Enter a valid email address"),
  address: z.string().min(5, "Enter your service address"),
  zipCode: z.string().min(5, "Enter a valid ZIP code").max(10),
});

export const dateTimeSchema = z.object({
  preferredDate: z.string().min(1, "Please select a date"),
  preferredTime: z.string().min(1, "Please select a time window"),
  notes: z.string().max(500).optional(),
});

// ─── Repair or Replace form ────────────────────────────────────────────────────
export const repairReplaceStep1Schema = z.object({
  systemType: z.string().min(1, "Select system type"),
  issue: z.array(z.string()).min(1, "Select at least one issue"),
  systemAge: z.string().min(1, "Select system age"),
  urgency: z.string().min(1, "Select urgency"),
});

export const repairReplaceStep2Schema = contactInfoSchema;
export const repairReplaceStep3Schema = dateTimeSchema;

// ─── Water Quality form ────────────────────────────────────────────────────────
export const waterQualityStep1Schema = z.object({
  concerns: z.array(z.string()).min(1, "Select at least one concern"),
  serviceType: z.string().min(1, "Select a service type"),
  homeSize: z.string().min(1, "Select home size"),
});

export const waterQualityStep2Schema = contactInfoSchema;
export const waterQualityStep3Schema = dateTimeSchema;

export type WaterQualityStep1 = z.infer<typeof waterQualityStep1Schema>;
export type WaterQualityStep2 = z.infer<typeof waterQualityStep2Schema>;
export type WaterQualityStep3 = z.infer<typeof waterQualityStep3Schema>;

// ─── Indoor Air Quality form ───────────────────────────────────────────────────
export const iaqStep1Schema = z.object({
  problems: z.array(z.string()).min(1, "Select at least one problem"),
  serviceArea: z.string().min(1, "Select service area"),
  homeType: z.string().min(1, "Select home type"),
});

export const iaqStep2Schema = contactInfoSchema;
export const iaqStep3Schema = dateTimeSchema;

export type IaqStep1 = z.infer<typeof iaqStep1Schema>;
export type IaqStep2 = z.infer<typeof iaqStep2Schema>;
export type IaqStep3 = z.infer<typeof iaqStep3Schema>;

// ─── HVAC Services form ────────────────────────────────────────────────────────
export const hvacServicesStep1Schema = z.object({
  propertyType: z.string().min(1, "Select property type"),
  serviceNeeded: z.string().min(1, "Select service needed"),
  systemType: z.string().min(1, "Select system type"),
  description: z.string().min(10, "Please describe the issue (min 10 chars)").max(500),
});

export const hvacServicesStep2Schema = contactInfoSchema;
export const hvacServicesStep3Schema = dateTimeSchema;

export type HvacServicesStep1 = z.infer<typeof hvacServicesStep1Schema>;
export type HvacServicesStep2 = z.infer<typeof hvacServicesStep2Schema>;
export type HvacServicesStep3 = z.infer<typeof hvacServicesStep3Schema>;

// ─── Shared time slots ────────────────────────────────────────────────────────
export const TIME_SLOTS = [
  '8:00 AM - 10:00 AM',
  '10:00 AM - 12:00 PM',
  '12:00 PM - 2:00 PM',
  '2:00 PM - 4:00 PM',
  '4:00 PM - 6:00 PM',
  '6:00 PM - 8:00 PM',
] as const;

// Phone formatter helper
export const formatPhone = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length <= 3) return cleaned;
  if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
};

// Map urgency to emergency boolean
export const urgencyToEmergency = (urgency: string): boolean => {
  return urgency === 'Emergency';
};

// Map system age string to number
export const systemAgeToNumber = (age: string): number => {
  const ageMap: Record<string, number> = {
    'Under 5 years': 3,
    '5–10 years': 7,
    '11–15 years': 13,
    '15+ years': 18,
  };
  return ageMap[age] || 10;
};

// Map budget string to enum
export const budgetToEnum = (budget: string): string => {
  const budgetMap: Record<string, string> = {
    'Under $500': 'UNDER_500',
    '$500 - $1,000': 'BETWEEN_500_1000',
    '$1,000 - $2,000': 'BETWEEN_1000_2000',
    '$2,000 - $5,000': 'BETWEEN_2000_5000',
    'Over $5,000': 'OVER_5000',
    'Not sure': 'NOT_SURE',
  };
  return budgetMap[budget] || 'NOT_SURE';
};

// Map solution string to enum
export const solutionToEnum = (solution: string): string => {
  const solutionMap: Record<string, string> = {
    'Repair': 'REPAIR',
    'Replace': 'REPLACE',
    'Upgrade': 'UPGRADE',
    'Consultation': 'CONSULTATION',
  };
  return solutionMap[solution] || 'CONSULTATION';
};

// Map service type
export const serviceTypeToEnum = (type: string): string => {
  const typeMap: Record<string, string> = {
    'RESIDENTIAL': 'RESIDENTIAL',
    'COMMERCIAL': 'COMMERCIAL',
    'BOTH': 'BOTH',
  };
  return typeMap[type] || 'RESIDENTIAL';
};

// Export repair replace types
export interface RepairReplaceFormData {
  systemType: string;
  issue: string[];
  systemAge: string;
  urgency: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  zipCode: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}


export const tuneUpSystemTypeToEnum = (systemType: string): string => {
  const typeMap: Record<string, string> = {
    'Central A/C': 'AC_ONLY',
    'Furnace / Heating': 'FURNACE',
    'Heat Pump': 'HEAT_PUMP',
    'Mini-Split': 'DUCTLESS',
    'Boiler': 'BOILER',
    'Packaged Unit': 'PACKAGED_UNIT',
  };
  return typeMap[systemType] || 'AC_ONLY';
};

// Map noise level string to enum
export const noiseLevelToEnum = (noiseLevel: string | null): string => {
  if (!noiseLevel) return 'NONE';
  const noiseMap: Record<string, string> = {
    'None': 'NONE',
    'Mild': 'MILD',
    'Moderate': 'MODERATE',
    'Severe': 'SEVERE',
    'Very Loud': 'VERY_LOUD',
  };
  return noiseMap[noiseLevel] || 'NONE';
};

// Map efficiency rating string to enum
export const efficiencyToEnum = (efficiency: string | null): string => {
  if (!efficiency) return 'NOT_SURE';
  const efficiencyMap: Record<string, string> = {
    'Excellent': 'EXCELLENT',
    'Good': 'GOOD',
    'Average': 'AVERAGE',
    'Poor': 'POOR',
    'Not Sure': 'NOT_SURE',
  };
  return efficiencyMap[efficiency] || 'NOT_SURE';
};

// Map date string to Date or null
export const parseDate = (dateStr: string | null): Date | null => {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? null : date;
};

export type RepairReplaceStep1 = Pick<RepairReplaceFormData, 'systemType' | 'issue' | 'systemAge' | 'urgency'>;
export type RepairReplaceStep2 = Pick<RepairReplaceFormData, 'fullName' | 'phone' | 'email' | 'address' | 'zipCode' | 'serviceType'>;
export type RepairReplaceStep3 = Pick<RepairReplaceFormData, 'preferredDate' | 'preferredTime' | 'notes'>;