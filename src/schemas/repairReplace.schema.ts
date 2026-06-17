import { z } from 'zod';

// Helper to convert age string to number
export const ageToNumber = (ageString: string): number => {
  const ageMap: Record<string, number> = {
    'Under 5 years': 3,
    '5–10 years': 7,
    '11–15 years': 13,
    '15+ years': 18,
  };
  return ageMap[ageString] || 10;
};

// Step 1 Schema
export const repairReplaceStep1Schema = z.object({
  systemType: z.string().min(1, 'Please select a system type'),
  issue: z.array(z.string()).min(1, 'Please select at least one issue'),
  systemAge: z.string().min(1, 'Please select system age'),
  urgency: z.string().min(1, 'Please select urgency level'),
});

// Step 2 Schema - includes serviceType
export const repairReplaceStep2Schema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email'),
  address: z.string().min(5, 'Please enter your full address'),
  zipCode: z.string().min(4, 'Please enter a valid ZIP code'),
  serviceType: z.string().min(1, 'Please select property type'),
});

// Step 3 Schema
export const repairReplaceStep3Schema = z.object({
  preferredDate: z.string().min(1, 'Please select a date'),
  preferredTime: z.string().min(1, 'Please select a time slot'),
  notes: z.string().optional(),
});

// Full form schema for submission
export const repairReplaceFullSchema = z.object({
  // Step 1
  systemType: z.string().min(1),
  issue: z.array(z.string()),
  systemAge: z.string().min(1),
  urgency: z.string().min(1),

  // Step 2
  fullName: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email(),
  address: z.string().min(5),
  zipCode: z.string().min(4),
  serviceType: z.string().min(1),

  // Step 3
  preferredDate: z.string().min(1),
  preferredTime: z.string().min(1),
  notes: z.string().optional(),
});

export type RepairReplaceStep1 = z.infer<typeof repairReplaceStep1Schema>;
export type RepairReplaceStep2 = z.infer<typeof repairReplaceStep2Schema>;
export type RepairReplaceStep3 = z.infer<typeof repairReplaceStep3Schema>;
export type RepairReplaceFull = z.infer<typeof repairReplaceFullSchema>;