import { z } from "zod";

// ─── Step Enums ────────────────────────────────────────────────────────────────

export type QuoteStep =
  | "address"
  | "home-info"
  | "home-info-edit"
  | "contact"
  | "system"
  | "schedule"
  | "confirmation";

export const STEP_ORDER: QuoteStep[] = [
  "address",
  "home-info",
  "home-info-edit",
  "contact",
  "system",
  "schedule",
  "confirmation",
];

// Wizard progress steps displayed in the stepper (matches design)
export const STEPPER_STEPS = [
  { id: 1, key: "address" as QuoteStep, label: "Address" },
  { id: 2, key: "home-info" as QuoteStep, label: "Home Info" },
  { id: 3, key: "system" as QuoteStep, label: "System" },
  { id: 4, key: "schedule" as QuoteStep, label: "Schedule" },
];

// Map internal steps to stepper highlight key
export function getStepperKey(step: QuoteStep): QuoteStep {
  if (step === "home-info-edit") return "home-info";
  if (step === "contact") return "home-info";
  if (step === "confirmation") return "schedule";
  return step;
}

// ─── Zod Schemas ───────────────────────────────────────────────────────────────

export const addressSchema = z.object({
  address: z
    .string()
    .min(5, "Please enter a valid address")
    .max(200, "Address is too long"),
});

export const homeInfoSchema = z.object({
  bedrooms: z.number().min(1).max(10),
  stories: z.number().min(1).max(5),
  squareFootage: z.number().min(100).max(20000),
  heatingSource: z.enum(["natural gas", "electric", "propane", "oil"]),
  confirmed: z.boolean(),
});

export const homeInfoEditSchema = z.object({
  squareFootage: z
    .number({ invalid_type_error: "Required" })
    .min(100, "Min 100 sq ft")
    .max(20000, "Max 20,000 sq ft"),
  stories: z.number().min(1).max(5),
  heatingSource: z.enum(["natural gas", "electric", "propane", "oil"]),
  bedrooms: z.number().min(1).max(10),
});

export const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, "Please enter your full name")
    .max(100, "Name is too long")
    .regex(/^[a-zA-Z\s'-]+$/, "Please enter a valid name"),
  phoneNumber: z
    .string()
    .min(10, "Please enter a valid phone number")
    .max(15, "Phone number is too long")
    .regex(
      /^\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{4}$/,
      "Please enter a valid US phone number"
    ),
});

export const scheduleSchema = z.object({
  installDate: z.enum(["tomorrow", "pick"]),
  pickedDate: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  notes: z.string().max(500).optional(),
  promoCode: z.string().optional(),
  acceptedTerms: z.boolean().refine((v) => v === true, {
    message: "You must accept the Terms of Service",
  }),
});

// ─── Inferred Types ────────────────────────────────────────────────────────────

export type AddressFormValues = z.infer<typeof addressSchema>;
export type HomeInfoFormValues = z.infer<typeof homeInfoSchema>;
export type HomeInfoEditFormValues = z.infer<typeof homeInfoEditSchema>;
export type ContactFormValues = z.infer<typeof contactSchema>;
export type ScheduleFormValues = z.infer<typeof scheduleSchema>;

// ─── System / Product types ────────────────────────────────────────────────────

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
  monthlyPrice: number;
  onlineSavings: number;
}

export const MOCK_SYSTEMS: HvacSystem[] = [
  {
    id: "ameristar",
    tier: "Classic - Option 1",
    brand: "Ameristar",
    name: "A/C & Gas Furnace",
    type: "Single-Stage",
    fuel: "Gas",
    seer2: "14.3 SEER2",
    dehumidification: 2,
    noiseLevel: "Standard",
    noiseStars: 2,
    partsWarranty: "10 Year",
    partsStars: 3,
    laborWarranty: "2 Year",
    laborStars: 3,
    retailPrice: 12940,
    cashPrice: 10999,
    monthlyPrice: 99,
    onlineSavings: 1941,
  },
  {
    id: "friedrich",
    tier: "Signature - Option 2",
    brand: "Friedrich",
    name: "A/C & Gas Furnace",
    type: "Single-Stage",
    fuel: "Gas",
    seer2: "15.2 SEER2",
    dehumidification: 3,
    noiseLevel: "Standard",
    noiseStars: 2,
    partsWarranty: "10 Year",
    partsStars: 3,
    laborWarranty: "5 Year",
    laborStars: 4,
    retailPrice: 15540,
    cashPrice: 13216,
    monthlyPrice: 199,
    onlineSavings: 2332,
  },
  {
    id: "american-standard",
    tier: "Premium - Option 3",
    brand: "American Standard",
    name: "A/C & Gas Furnace",
    type: "Single-Stage",
    fuel: "Gas",
    seer2: "15.2 SEER2",
    dehumidification: 4,
    noiseLevel: "Standard",
    noiseStars: 2,
    partsWarranty: "10 Year",
    partsStars: 4,
    laborWarranty: "5 Year",
    laborStars: 5,
    retailPrice: 18116,
    cashPrice: 15399,
    monthlyPrice: 139,
    onlineSavings: 2717,
  },
];

// ─── Aggregated wizard state ───────────────────────────────────────────────────

export interface HvacQuoteWizardState {
  address: string;
  homeInfo: HomeInfoFormValues;
  contact?: ContactFormValues;
  selectedSystem?: HvacSystem;
  schedule?: ScheduleFormValues;
}

// ─── Default mock home info ────────────────────────────────────────────────────

export const MOCK_HOME_INFO: HomeInfoFormValues = {
  bedrooms: 3,
  stories: 1,
  squareFootage: 2000,
  heatingSource: "natural gas",
  confirmed: false,
};

// ─── Helpers ───────────────────────────────────────────────────────────────────

export function generateOrderNumber(): string {
  const year = new Date().getFullYear();
  const rand = Math.random().toString(36).substring(2, 6);
  return `#HVAC-${year}-${rand}`;
}

export function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}