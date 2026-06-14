import { z } from "zod";

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

export type RepairReplaceStep1 = z.infer<typeof repairReplaceStep1Schema>;
export type RepairReplaceStep2 = z.infer<typeof repairReplaceStep2Schema>;
export type RepairReplaceStep3 = z.infer<typeof repairReplaceStep3Schema>;

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
  "7–9 am", "9–11 am", "11 am–1 pm",
  "1–3 pm", "3–5 pm", "5–7 pm",
];

// ─── Phone formatter ──────────────────────────────────────────────────────────
export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits.length ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}