// export type ScheduleStep = 1 | 2 | 3 | 4;

// export interface ScheduleFormData {
//   symptoms: string[];
//   age: string | null;
//   date: Date | "asap" | null;
//   time: string | null;
//   name: string;
//   phone: string;
//   email: string;
//   zip: string;
// }

// export const SYMPTOMS = [
//   "Not cooling",
//   "High electric bills",
//   "Weak airflow",
//   "Runs constantly",
//   "Not turning on",
// ] as const;

// export const AC_AGES = [
//   "Under 5 years",
//   "5-10 years",
//   "11-15 years",
//   "15+ years",
// ] as const;

// export const TIME_SLOTS = [
//   "7-9am",
//   "9-11am",
//   "11am-1pm",
//   "1-3pm",
//   "3-5pm",
//   "5-7pm",
// ] as const;

// export const INITIAL_FORM_DATA: ScheduleFormData = {
//   symptoms: [],
//   age: null,
//   date: null,
//   time: null,
//   name: "",
//   phone: "",
//   email: "",
//   zip: "",
// };



// Symptoms (renamed to issues for backend compatibility)
export const SYMPTOMS = [
  'Not cooling well',
  'Strange noises',
  'Water leakage',
  'High energy bills',
  'Weak airflow',
  'Foul odor',
  'Frequent cycling',
  'Ice buildup',
  'Won\'t turn on',
  'Thermostat issues',
];

// AC Ages - store as number ranges
export const AC_AGES = [
  { label: 'Less than 1 year', value: 0 },
  { label: '1-3 years', value: 2 },
  { label: '4-6 years', value: 5 },
  { label: '7-10 years', value: 8 },
  { label: '11-15 years', value: 13 },
  { label: 'Over 15 years', value: 18 },
];

// AC Types
export const AC_TYPES = [
  'CENTRAL',
  'DUCTLESS_MINI_SPLIT',
  'WINDOW',
  'PORTABLE',
  'PACKAGED_TERMINAL',
] as const;

// Refrigerant Types
export const REFRIGERANT_TYPES = [
  'R22',
  'R410A',
  'R32',
  'R134A',
  'UNKNOWN',
] as const;

// Performance Ratings
export const PERFORMANCE_RATINGS = [
  'EXCELLENT',
  'GOOD',
  'FAIR',
  'POOR',
  'NOT_WORKING',
] as const;

// Service Types
export const SERVICE_TYPES = [
  'RESIDENTIAL',
  'COMMERCIAL',
  'BOTH',
] as const;

// Time Slots
export const TIME_SLOTS = [
  '8:00 AM - 10:00 AM',
  '10:00 AM - 12:00 PM',
  '12:00 PM - 2:00 PM',
  '2:00 PM - 4:00 PM',
  '4:00 PM - 6:00 PM',
  '6:00 PM - 8:00 PM',
] as const;

export interface ScheduleFormData {
  // Step 1: Symptoms & AC Info
  issues: string[];
  acAge: number | null;
  acType: string;
  refrigerantType: string;
  currentPerformance: string;
  lastServiceDate: Date | null;

  // Step 2: Date & Time
  preferredDate: Date | 'asap' | null;
  preferredTime: string;

  // Step 3: Contact Info
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  serviceType: string;
  additionalNote: string;
}

export const INITIAL_FORM_DATA: ScheduleFormData = {
  // Step 1
  issues: [],
  acAge: null,
  acType: '',
  refrigerantType: '',
  currentPerformance: '',
  lastServiceDate: null,

  // Step 2
  preferredDate: null,
  preferredTime: '',

  // Step 3
  fullName: '',
  email: '',
  phoneNumber: '',
  address: '',
  serviceType: 'RESIDENTIAL',
  additionalNote: '',
};

export type ScheduleStep = 1 | 2 | 3 | 4;