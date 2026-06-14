export type ScheduleStep = 1 | 2 | 3 | 4;

export interface ScheduleFormData {
  symptoms: string[];
  age: string | null;
  date: Date | "asap" | null;
  time: string | null;
  name: string;
  phone: string;
  email: string;
  zip: string;
}

export const SYMPTOMS = [
  "Not cooling",
  "High electric bills",
  "Weak airflow",
  "Runs constantly",
  "Not turning on",
] as const;

export const AC_AGES = [
  "Under 5 years",
  "5-10 years",
  "11-15 years",
  "15+ years",
] as const;

export const TIME_SLOTS = [
  "7-9am",
  "9-11am",
  "11am-1pm",
  "1-3pm",
  "3-5pm",
  "5-7pm",
] as const;

export const INITIAL_FORM_DATA: ScheduleFormData = {
  symptoms: [],
  age: null,
  date: null,
  time: null,
  name: "",
  phone: "",
  email: "",
  zip: "",
};