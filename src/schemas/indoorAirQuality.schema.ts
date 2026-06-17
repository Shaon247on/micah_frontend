import { z } from 'zod';

// Step 1 Schema
export const indoorAirQualityStep1Schema = z.object({
  symptoms: z.array(z.string()).min(1, 'Please select at least one symptom'),
  propertySizeSqFt: z.number().nullable().optional(),
  hasHumidityIssue: z.boolean().optional(),
  hasDustIssue: z.boolean().optional(),
  hasOdorIssue: z.boolean().optional(),
  occupantsWithAllergy: z.number().nullable().optional(),
  currentSystem: z.string().optional(),
});

// Step 2 Schema
export const indoorAirQualityStep2Schema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email'),
  address: z.string().min(5, 'Please enter your full address'),
  zipCode: z.string().min(4, 'Please enter a valid ZIP code'),
  propertyType: z.string().min(1, 'Please select property type'),
});

// Step 3 Schema
export const indoorAirQualityStep3Schema = z.object({
  preferredDate: z.string().min(1, 'Please select a date'),
  preferredTime: z.string().min(1, 'Please select a time slot'),
  notes: z.string().optional(),
});

// Full form schema for submission
export const indoorAirQualityFullSchema = z.object({
  symptoms: z.array(z.string()),
  propertySizeSqFt: z.number().nullable().optional(),
  hasHumidityIssue: z.boolean().optional(),
  hasDustIssue: z.boolean().optional(),
  hasOdorIssue: z.boolean().optional(),
  occupantsWithAllergy: z.number().nullable().optional(),
  currentSystem: z.string().optional(),
  fullName: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email(),
  address: z.string().min(5),
  zipCode: z.string().min(4),
  propertyType: z.string().min(1),
  preferredDate: z.string().min(1),
  preferredTime: z.string().min(1),
  notes: z.string().optional(),
});

export type IndoorAirQualityStep1 = z.infer<typeof indoorAirQualityStep1Schema>;
export type IndoorAirQualityStep2 = z.infer<typeof indoorAirQualityStep2Schema>;
export type IndoorAirQualityStep3 = z.infer<typeof indoorAirQualityStep3Schema>;
export type IndoorAirQualityFull = z.infer<typeof indoorAirQualityFullSchema>;