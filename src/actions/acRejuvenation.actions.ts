'use server';

import { cookies } from 'next/headers';
import api from '@/lib/axios';
import { AcRejuvenationFormData } from '@/schemas/acRejuvenation.schema';

export async function submitAcRejuvenation(data: AcRejuvenationFormData) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    // Map form data to backend expected format
    const payload = {
      appointmentType: 'AC_REJUVENATION',
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      address: data.address,
      preferredDate: data.preferredDate === 'asap' ? new Date() : data.preferredDate,
      preferredTime: data.preferredTime,
      additionalNote: data.additionalNote || '',
      serviceType: data.serviceType,
      acRejuvenationDetails: {
        acType: data.acType,
        acAge: data.acAge,
        lastServiceDate: data.lastServiceDate,
        refrigerantType: data.refrigerantType || 'UNKNOWN',
        issues: data.issues,
        currentPerformance: data.currentPerformance || 'FAIR',
      },
    };

    const response = await api.post('/api/appointments', payload, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (response.data.status === 'success') {
      return { success: true, message: 'Appointment scheduled successfully!' };
    }

    return {
      success: false,
      error: response.data.message || 'Failed to schedule appointment',
    };
  } catch (error: any) {
    console.error('Submit AC Rejuvenation error:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'An unexpected error occurred',
    };
  }
}