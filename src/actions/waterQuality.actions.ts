'use server';

import { cookies } from 'next/headers';
import api from '@/lib/axios';

// Helper: Map water issue strings to Prisma enum values
const mapWaterIssueToEnum = (issue: string): string => {
  const issueMap: Record<string, string> = {
    'Hard water / scale buildup': 'SCALE_BUILDUP',
    'Chlorine taste or odor': 'BAD_TASTE',
    'Sediment / particles': 'SEDIMENT',
    'Drinking water quality': 'BAD_TASTE',
    'Mineral contamination': 'CORROSION',
    'Spotty dishes / fixtures': 'SCALE_BUILDUP',
  };
  return issueMap[issue] || 'HARD_WATER';
};

// ✅ Fix: Map property type to correct Prisma enum values
const mapPropertyType = (propertyType: string): string => {
  const typeMap: Record<string, string> = {
    'RESIDENTIAL': 'RESIDENTIAL_HOUSE',
    'COMMERCIAL': 'COMMERCIAL_OFFICE',  // ✅ Fixed: Use COMMERCIAL_OFFICE
    'BOTH': 'COMMERCIAL_OFFICE',
  };
  return typeMap[propertyType] || 'RESIDENTIAL_HOUSE';
};

// Helper: Map home size to sq ft number
const mapHomeSizeToNumber = (homeSize: string): number => {
  const sizeMap: Record<string, number> = {
    'Under 1,500 sq ft': 1200,
    '1,500–2,500 sq ft': 2000,
    '2,500–4,000 sq ft': 3250,
    '4,000+ sq ft': 4500,
  };
  return sizeMap[homeSize] || 2000;
};

export async function submitWaterQuality(data: any) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    // Map water issues to enum values
    const waterIssues = (data.concerns || []).map((concern: string) => mapWaterIssueToEnum(concern));

    // ✅ Map property type correctly
    const propertyType = mapPropertyType(data.propertyType || data.serviceTypeContact || 'RESIDENTIAL');

    // Build payload with proper enum mappings
    const payload = {
      appointmentType: 'WATER_QUALITY_SOLUTIONS',
      fullName: data.fullName || '',
      email: data.email || '',
      phoneNumber: data.phone || '',
      address: data.address && data.zipCode ? `${data.address}, ${data.zipCode}` : data.address || '',
      preferredDate: data.preferredDate ? new Date(data.preferredDate).toISOString() : new Date().toISOString(),
      preferredTime: data.preferredTime || '09:00',
      additionalNote: data.notes || '',
      serviceType: data.serviceTypeContact === 'COMMERCIAL' ? 'COMMERCIAL' : 'RESIDENTIAL',
      waterQualityDetails: {
        propertyType: propertyType,  // ✅ Now uses COMMERCIAL_OFFICE instead of COMMERCIAL
        waterSource: 'MUNICIPAL',
        waterIssues: waterIssues.length > 0 ? waterIssues : ['HARD_WATER'],
        hasWaterSoftener: data.hasWaterSoftener || false,
        hasFilterSystem: data.hasFilterSystem || false,
        numberOfBathrooms: data.numberOfBathrooms || null,
      },
    };

    console.log('📤 Submitting Water Quality payload:', JSON.stringify(payload, null, 2));

    const response = await api.post('/api/appointments', payload, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (response.data.status === 'success') {
      return { success: true, message: 'Water quality consultation scheduled successfully!' };
    }

    return {
      success: false,
      error: response.data.message || 'Failed to schedule consultation',
    };
  } catch (error: any) {
    console.error('Submit Water Quality error:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'An unexpected error occurred',
    };
  }
}