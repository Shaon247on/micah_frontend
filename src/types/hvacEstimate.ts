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
  createdAt: string;
  updatedAt: string;
  updatedBy: string | null;
}

export interface HvacEstimateSettingsInput {
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
}

export interface HvacEstimateSettingsResponse {
  status: string;
  data: HvacEstimateSettings;
  message?: string;
}