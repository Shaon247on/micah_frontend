'use server';

import { cookies } from 'next/headers';
import api from '@/lib/axios';
import { DashboardData } from '@/types/dashboard';

export async function getDashboardData(): Promise<DashboardData> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const response = await api.get('/api/dashboard', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (response.data.status === 'success') {
      return response.data.data;
    }
    
    return getDefaultDashboardData();
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return getDefaultDashboardData();
  }
}

// Fallback default data
function getDefaultDashboardData(): DashboardData {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const trafficData = months.map((month, i) => ({
    name: month,
    visitors: Math.floor(Math.random() * 100) + 20,
  }));

  return {
    stats: {
      totalAppointments: 0,
      pendingAppointments: 0,
      confirmedAppointments: 0,
      inProgressAppointments: 0,
      completedAppointments: 0,
      cancelledAppointments: 0,
      totalVisitors: 0,
      messages: 0,
    },
    trafficData,
    serviceData: [
      { name: 'AC Rejuvenation', value: 1 },
      { name: 'Repair/Replace', value: 1 },
      { name: 'Tune Up', value: 1 },
      { name: 'Water Quality', value: 1 },
      { name: 'Air Quality', value: 1 },
    ],
    performanceData: [
      { name: 'Week 1', value: 5 },
      { name: 'Week 2', value: 8 },
      { name: 'Week 3', value: 4 },
      { name: 'Week 4', value: 7 },
      { name: 'Week 5', value: 6 },
    ],
    cityData: [
      { city: 'Joliet', count: 45 },
      { city: 'Plainfield', count: 15 },
      { city: 'Shorewood', count: 8 },
      { city: 'Romeoville', count: 3 },
      { city: 'Crest Hill', count: 1 },
    ],
  };
}