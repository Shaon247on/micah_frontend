'use server';

import { cookies } from 'next/headers';
import api from '@/lib/axios';

// Helper: Map symptom strings to Prisma enum values
const mapSymptomToEnum = (symptom: string): string => {
  const symptomMap: Record<string, string> = {
    'Excessive dust': 'EXCESSIVE_DUST',
    'Musty odors': 'MUSTY_ODOR',
    'High humidity': 'HIGH_HUMIDITY',
    'Low humidity': 'LOW_HUMIDITY',
    'Allergy symptoms': 'ALLERGY_SYMPTOMS',
    'Respiratory issues': 'RESPIRATORY_ISSUES',
    'Static electricity': 'STATIC_ELECTRICITY',
    'Mold growth': 'MOLD_GROWTH',
  };
  return symptomMap[symptom] || 'EXCESSIVE_DUST';
};

// Helper: Map property type to Prisma enum
const mapPropertyType = (propertyType: string): string => {
  const typeMap: Record<string, string> = {
    'RESIDENTIAL': 'RESIDENTIAL_HOUSE',
    'COMMERCIAL': 'COMMERCIAL_OFFICE',
    'BOTH': 'COMMERCIAL_OFFICE',
  };
  return typeMap[propertyType] || 'RESIDENTIAL_HOUSE';
};

export async function submitIndoorAirQuality(data: any) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    // Map symptoms to enum values
    const symptoms = (data.symptoms || []).map((symptom: string) => mapSymptomToEnum(symptom));

    // Map property type
    const propertyType = mapPropertyType(data.propertyType || 'RESIDENTIAL');

    const payload = {
      appointmentType: 'INDOOR_AIR_QUALITY',
      fullName: data.fullName || '',
      email: data.email || '',
      phoneNumber: data.phone || '',
      address: data.address && data.zipCode ? `${data.address}, ${data.zipCode}` : data.address || '',
      preferredDate: data.preferredDate ? new Date(data.preferredDate).toISOString() : new Date().toISOString(),
      preferredTime: data.preferredTime || '09:00',
      additionalNote: data.notes || '',
      serviceType: data.propertyType === 'COMMERCIAL' ? 'COMMERCIAL' : 'RESIDENTIAL',
      indoorAirQualityDetails: {
        propertySizeSqFt: data.propertySizeSqFt || null,
        symptoms: symptoms.length > 0 ? symptoms : ['EXCESSIVE_DUST'],
        hasHumidityIssue: data.hasHumidityIssue || false,
        hasDustIssue: data.hasDustIssue || false,
        hasOdorIssue: data.hasOdorIssue || false,
        occupantsWithAllergy: data.occupantsWithAllergy || null,
        currentSystem: data.currentSystem || '',
      },
    };

    console.log('📤 Submitting Indoor Air Quality payload:', JSON.stringify(payload, null, 2));

    const response = await api.post('/api/appointments', payload, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (response.data.status === 'success') {
      return { success: true, message: 'Air quality assessment scheduled successfully!' };
    }

    return {
      success: false,
      error: response.data.message || 'Failed to schedule assessment',
    };
  } catch (error: any) {
    console.error('Submit Indoor Air Quality error:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'An unexpected error occurred',
    };
  }
}