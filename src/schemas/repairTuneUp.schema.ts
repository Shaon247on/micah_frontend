import { z } from 'zod';

// Step 1 Schema
export const repairTuneUpStep1Schema = z.object({
  systemType: z.string().min(1, 'Please select a system type'),
  specificConcerns: z.array(z.string()).min(1, 'Please select at least one concern'),
  noiseLevel: z.string().optional().nullable(),
  energyEfficiency: z.string().optional().nullable(),
  lastTuneUpDate: z.string().optional().nullable(),
});

// Step 2 Schema
export const repairTuneUpStep2Schema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email'),
  address: z.string().min(5, 'Please enter your full address'),
  zipCode: z.string().min(4, 'Please enter a valid ZIP code'),
  serviceType: z.string().min(1, 'Please select property type'),
});

// Step 3 Schema
export const repairTuneUpStep3Schema = z.object({
  preferredDate: z.string().min(1, 'Please select a date'),
  preferredTime: z.string().min(1, 'Please select a time slot'),
  notes: z.string().optional(),
});

// Full form schema for submission
export const repairTuneUpFullSchema = z.object({
  // Step 1
  systemType: z.string().min(1),
  specificConcerns: z.array(z.string()),
  noiseLevel: z.string().optional().nullable(),
  energyEfficiency: z.string().optional().nullable(),
  lastTuneUpDate: z.string().optional().nullable(),

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

export type RepairTuneUpStep1 = z.infer<typeof repairTuneUpStep1Schema>;
export type RepairTuneUpStep2 = z.infer<typeof repairTuneUpStep2Schema>;
export type RepairTuneUpStep3 = z.infer<typeof repairTuneUpStep3Schema>;
export type RepairTuneUpFull = z.infer<typeof repairTuneUpFullSchema>;