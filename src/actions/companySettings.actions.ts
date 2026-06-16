'use server';

import { cookies } from 'next/headers';
import api from '@/lib/axios';
import { CompanySettingsResponse, CompanySettingsUpdateResponse, CompanySettings } from '@/types/companySettings';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Public - Get company settings (no auth required)
export async function getCompanySettings(): Promise<CompanySettingsResponse> {
  try {
    const response = await api.get('/api/company-settings');
    return response.data;
  } catch (error) {
    console.error('Error fetching company settings:', error);
    return {
      status: 'error',
      data: {
        id: '',
        companyName: 'HVAC Service',
        companyLogo: null,
        companyFavicon: null,
        contactEmail: 'contact@hvacservices.com',
        contactPhone: '(555) 123-4567',
        contactAddress: '123 Main Street, Joliet, IL 60401',
        facebookUrl: null,
        twitterUrl: null,
        instagramUrl: null,
        linkedinUrl: null,
        businessHours: null,
        createdAt: '',
        updatedAt: '',
      },
    };
  }
}

// Admin only - Update company settings
export async function updateCompanySettings(data: Partial<CompanySettings>): Promise<CompanySettingsUpdateResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const response = await api.put('/api/company-settings', data, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return response.data;
  } catch (error: any) {
    console.error('Error updating company settings:', error);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Failed to update company settings',
    };
  }
}

// Upload logo - Accept base64 string
export async function uploadLogo(base64Data: string, fileName: string): Promise<{ status: string; message: string; logoUrl?: string }> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const response = await api.post('/api/company-settings/upload-logo', 
      { image: base64Data, fileName },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    
    return response.data;
  } catch (error: any) {
    console.error('Error uploading logo:', error);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Failed to upload logo',
    };
  }
}

// Delete logo
export async function deleteLogo(): Promise<{ status: string; message: string }> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const response = await api.delete('/api/company-settings/logo', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return response.data;
  } catch (error: any) {
    console.error('Error deleting logo:', error);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Failed to delete logo',
    };
  }
}