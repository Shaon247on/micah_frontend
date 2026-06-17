export interface DashboardStats {
  totalAppointments: number;
  pendingAppointments: number;
  confirmedAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  inProgressAppointments: number;
  totalVisitors: number;
  messages: number;
}

export interface TrafficData {
  name: string;
  visitors: number;
}

export interface ServiceData {
  name: string;
  value: number;
}

export interface PerformanceData {
  name: string;
  value: number;
}

export interface CityData {
  city: string;
  count: number;
}

export interface DashboardData {
  stats: DashboardStats;
  trafficData: TrafficData[];
  serviceData: ServiceData[];
  performanceData: PerformanceData[];
  cityData: CityData[];
}
