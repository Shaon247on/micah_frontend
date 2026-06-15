export interface Appointment {
  id: string;
  appointmentType: string;
  serviceType: string | null;
  status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'RESCHEDULED';
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  preferredDate: string;
  preferredTime: string;
  additionalNote: string | null;
  createdAt: string;
  updatedAt: string;
  acRejuvenationDetails?: AcRejuvenationDetails | null;
  repairReplaceDetails?: RepairReplaceDetails | null;
  repairTuneUpDetails?: RepairTuneUpDetails | null;
  waterQualityDetails?: WaterQualityDetails | null;
  indoorAirQualityDetails?: IndoorAirQualityDetails | null;
}

export interface AcRejuvenationDetails {
  acType: string;
  acAge: number | null;
  lastServiceDate: string | null;
  refrigerantType: string | null;
  issues: string[];
  currentPerformance: string | null;
}

export interface RepairReplaceDetails {
  systemType: string;
  systemAge: number | null;
  currentIssue: string;
  emergency: boolean;
  budgetRange: string | null;
  preferredSolution: string | null;
}

export interface RepairTuneUpDetails {
  systemType: string;
  lastTuneUpDate: string | null;
  specificConcerns: string[];
  noiseLevel: string | null;
  energyEfficiency: string | null;
}

export interface WaterQualityDetails {
  propertyType: string;
  waterSource: string;
  waterIssues: string[];
  hasWaterSoftener: boolean;
  hasFilterSystem: boolean;
  numberOfBathrooms: number | null;
}

export interface IndoorAirQualityDetails {
  propertySizeSqFt: number | null;
  symptoms: string[];
  hasHumidityIssue: boolean;
  hasDustIssue: boolean;
  hasOdorIssue: boolean;
  occupantsWithAllergy: number | null;
  currentSystem: string | null;
}

export interface AppointmentResponse {
  status: string;
  message: string;
  data: {
    appointments: Appointment[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface AppointmentDetailsResponse {
  status: string;
  data: Appointment;
}

export interface DashboardStats {
  status: string;
  data: {
    total: number;
    pending: number;
    confirmed: number;
    inProgress: number;
    completed: number;
    cancelled: number;
    todayAppointments: number;
  };
}

export interface UpdateStatusResponse {
  status: string;
  message: string;
  data?: Appointment;
}

export interface DeleteResponse {
  status: string;
  message: string;
}