import { z } from 'zod';

// Helper to convert home size string to number
export const homeSizeToNumber = (size: string): number => {
  const sizeMap: Record<string, number> = {
    'Under 1,500 sq ft': 1200,
    '1,500–2,500 sq ft': 2000,
    '2,500–4,000 sq ft': 3250,
    '4,000+ sq ft': 4500,
  };
  return sizeMap[size] || 2000;
};

// Step 1 Schema
export const waterQualityStep1Schema = z.object({
  concerns: z.array(z.string()).min(1, 'Please select at least one concern'),
  serviceType: z.string().min(1, 'Please select a service type'),
  homeSize: z.string().min(1, 'Please select your home size'),
  hasWaterSoftener: z.boolean().optional(),
  hasFilterSystem: z.boolean().optional(),
  numberOfBathrooms: z.number().optional(),
});

// Step 2 Schema (using shared contact schema)
export const waterQualityStep2Schema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email'),
  address: z.string().min(5, 'Please enter your full address'),
  zipCode: z.string().min(4, 'Please enter a valid ZIP code'),
  serviceType: z.string().min(1, 'Please select property type'),
});

// Step 3 Schema
export const waterQualityStep3Schema = z.object({
  preferredDate: z.string().min(1, 'Please select a date'),
  preferredTime: z.string().min(1, 'Please select a time slot'),
  notes: z.string().optional(),
});

// Full form schema for submission
export const waterQualityFullSchema = z.object({
  // Step 1
  concerns: z.array(z.string()),
  serviceType: z.string().min(1),
  homeSize: z.string().min(1),
  hasWaterSoftener: z.boolean().optional(),
  hasFilterSystem: z.boolean().optional(),
  numberOfBathrooms: z.number().optional(),

  // Step 2
  fullName: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email(),
  address: z.string().min(5),
  zipCode: z.string().min(4),
  serviceTypeContact: z.string().min(1),

  // Step 3
  preferredDate: z.string().min(1),
  preferredTime: z.string().min(1),
  notes: z.string().optional(),
});

// ─── Constants ────────────────────────────────────────────────────────────────
export const CONCERNS = [
  "Hard water / scale buildup",
  "Chlorine taste or odor",
  "Sediment / particles",
  "Drinking water quality",
  "Mineral contamination",
  "Spotty dishes / fixtures",
];

export const SERVICE_OPTIONS = [
  { label: "Whole-Home Water Softener", sub: "Remove hardness minerals" },
  { label: "Reverse Osmosis System", sub: "Drinking water purification" },
  { label: "Carbon Filtration", sub: "Chlorine & odor removal" },
  { label: "UV Purification", sub: "Bacteria & pathogen control" },
  { label: "Sediment Filtration", sub: "Particles & sediment" },
  { label: "Water Quality Testing", sub: "Know what's in your water" },
];

export const HOME_SIZES = ["Under 1,500 sq ft", "1,500–2,500 sq ft", "2,500–4,000 sq ft", "4,000+ sq ft"];
export const PROPERTY_TYPES = ["RESIDENTIAL", "COMMERCIAL", "BOTH"];
export const TIME_SLOTS = [
  "8:00 AM - 10:00 AM",
  "10:00 AM - 12:00 PM",
  "12:00 PM - 2:00 PM",
  "2:00 PM - 4:00 PM",
  "4:00 PM - 6:00 PM",
  "6:00 PM - 8:00 PM",
];

// ─── Schemas ──────────────────────────────────────────────────────────────────
export const step1Schema = z.object({
  concerns: z.array(z.string()).min(1, "Please select at least one concern"),
  serviceType: z.string().min(1, "Please select a service type"),
  homeSize: z.string().min(1, "Please select your home size"),
  hasWaterSoftener: z.boolean().optional(),
  hasFilterSystem: z.boolean().optional(),
  numberOfBathrooms: z.number().optional(),
});

export const step2Schema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email"),
  address: z.string().min(5, "Please enter your full address"),
  zipCode: z.string().min(4, "Please enter a valid ZIP code"),
  propertyType: z.string().min(1, "Please select property type"),
});

export const step3Schema = z.object({
  preferredDate: z.string().min(1, "Please select a date"),
  preferredTime: z.string().min(1, "Please select a time slot"),
  notes: z.string().optional(),
});

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;

export type WaterQualityStep1 = z.infer<typeof waterQualityStep1Schema>;
export type WaterQualityStep2 = z.infer<typeof waterQualityStep2Schema>;
export type WaterQualityStep3 = z.infer<typeof waterQualityStep3Schema>;
export type WaterQualityFull = z.infer<typeof waterQualityFullSchema>;