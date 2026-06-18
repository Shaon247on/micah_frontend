import { z } from 'zod';

export const hvacEstimateSettingsSchema = z.object({
  baseRatePerSqFt: z.number()
    .min(0, 'Base rate must be at least 0')
    .max(100, 'Base rate cannot exceed 100'),
  laborRatePerHour: z.number()
    .min(0, 'Labor rate must be at least 0')
    .max(500, 'Labor rate cannot exceed 500'),
  markupPercentage: z.number()
    .min(0, 'Markup percentage must be at least 0')
    .max(200, 'Markup percentage cannot exceed 200%'),
  tier1Multiplier: z.number()
    .min(0.5, 'Tier 1 multiplier must be at least 0.5')
    .max(3, 'Tier 1 multiplier cannot exceed 3'),
  tier2Multiplier: z.number()
    .min(0.5, 'Tier 2 multiplier must be at least 0.5')
    .max(3, 'Tier 2 multiplier cannot exceed 3'),
  tier3Multiplier: z.number()
    .min(0.5, 'Tier 3 multiplier must be at least 0.5')
    .max(3, 'Tier 3 multiplier cannot exceed 3'),
  installationBaseFee: z.number()
    .min(0, 'Installation base fee must be at least 0')
    .max(10000, 'Installation base fee cannot exceed 10,000'),
  permitFee: z.number()
    .min(0, 'Permit fee must be at least 0')
    .max(1000, 'Permit fee cannot exceed 1,000'),
  disposalFee: z.number()
    .min(0, 'Disposal fee must be at least 0')
    .max(1000, 'Disposal fee cannot exceed 1,000'),
  monthlyPaymentRate: z.number()
    .min(0, 'Monthly payment rate must be at least 0')
    .max(1, 'Monthly payment rate cannot exceed 1 (100%)'),
});

export type HvacEstimateSettingsInput = z.infer<typeof hvacEstimateSettingsSchema>;