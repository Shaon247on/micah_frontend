'use server';

import { cookies } from 'next/headers';
import api from '@/lib/axios';
import { HvacEstimateSettings, HvacEstimateSettingsInput } from '@/types/hvacEstimate';

// Get HVAC estimate settings
export async function getHvacEstimateSettings(): Promise<{
  success: boolean;
  data?: HvacEstimateSettings;
  error?: string;
}> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const response = await api.get('/api/hvac-estimate/settings', {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    
    if (response.data.status === 'success') {
      return { success: true, data: response.data.data };
    }
    
    return { success: false, error: response.data.message || 'Failed to fetch settings' };
  } catch (error: any) {
    console.error('Error fetching HVAC estimate settings:', error);
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to fetch settings' 
    };
  }
}

// Update HVAC estimate settings
export async function updateHvacEstimateSettings(
  data: Partial<HvacEstimateSettingsInput>
): Promise<{
  success: boolean;
  data?: HvacEstimateSettings;
  error?: string;
}> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const response = await api.put('/api/hvac-estimate/settings', data, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    
    if (response.data.status === 'success') {
      return { success: true, data: response.data.data };
    }
    
    return { success: false, error: response.data.message || 'Failed to update settings' };
  } catch (error: any) {
    console.error('Error updating HVAC estimate settings:', error);
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to update settings' 
    };
  }
}