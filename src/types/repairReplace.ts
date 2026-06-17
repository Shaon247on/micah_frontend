export interface RepairReplaceFormData {
  // Step 1: System Info
  systemType: string;        // HVACSystemType enum
  systemAge: number | null;   // Age in years
  currentIssue: string;
  emergency: boolean;
  budgetRange: string | null;  // BudgetRange enum
  preferredSolution: string | null; // PreferredSolution enum

  // Step 2: Contact Info
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  serviceType: string;        // ServiceType enum (RESIDENTIAL/COMMERCIAL/BOTH)

  // Step 3: Date & Time
  preferredDate: Date | 'asap' | null;
  preferredTime: string;
  additionalNote: string;
}

export type RepairReplaceStep1 = Pick<RepairReplaceFormData, 
  'systemType' | 'systemAge' | 'currentIssue' | 'emergency' | 'budgetRange' | 'preferredSolution'
>;

export type RepairReplaceStep2 = Pick<RepairReplaceFormData,
  'fullName' | 'email' | 'phoneNumber' | 'address' | 'serviceType'
>;

export type RepairReplaceStep3 = Pick<RepairReplaceFormData,
  'preferredDate' | 'preferredTime' | 'additionalNote'
>;

export interface RepairReplaceResponse {
  status: string;
  message: string;
  data?: {
    id: string;
    // ... other fields
  };
}