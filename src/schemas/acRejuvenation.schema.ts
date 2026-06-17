import { z } from 'zod';

export const acRejuvenationSchema = z.object({
  // Step 1
  issues: z.array(z.string()).min(1, 'Please select at least one issue'),
  acAge: z.number().nullable().refine((val) => val !== null, {
    message: 'Please select your AC age',
  }),
  acType: z.string().min(1, 'Please select AC type'),
  refrigerantType: z.string().optional(),
  currentPerformance: z.string().optional(),
  lastServiceDate: z.date().nullable().optional(),

  // Step 2
  preferredDate: z.union([
    z.date(),
    z.literal('asap'),
    z.null()
  ]).refine((val) => val !== null, {
    message: 'Please select a date',
  }),
  preferredTime: z.string().min(1, 'Please select a time slot'),

  // Step 3
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phoneNumber: z.string().min(10, 'Please enter a valid phone number'),
  address: z.string().min(5, 'Please enter your full address'),
  serviceType: z.string().min(1, 'Please select service type'),
  additionalNote: z.string().optional(),
});

export type AcRejuvenationFormData = z.infer<typeof acRejuvenationSchema>;