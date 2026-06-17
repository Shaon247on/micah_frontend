'use server';

import { cookies } from 'next/headers';
import api from '@/lib/axios';
import {
  tuneUpSystemTypeToEnum,
  noiseLevelToEnum,
  efficiencyToEnum,
  serviceTypeToEnum,
} from '@/types/services.type';
import { RepairTuneUpFull } from '@/schemas/repairTuneUp.schema';

export async function submitRepairTuneUp(data: RepairTuneUpFull) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    // Map form data to backend expected format
    const payload = {
      appointmentType: 'REPAIR_AND_TUNE_UP',
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phone,
      address: data.address && data.zipCode ? `${data.address}, ${data.zipCode}` : data.address || '',
      preferredDate: data.preferredDate === 'asap'
        ? new Date().toISOString()
        : data.preferredDate ? new Date(data.preferredDate).toISOString() : new Date().toISOString(),
      preferredTime: data.preferredTime || '09:00',
      additionalNote: data.notes || '',
      serviceType: data.serviceType || 'RESIDENTIAL',
      repairTuneUpDetails: {
        systemType: tuneUpSystemTypeToEnum(data.systemType),
        lastTuneUpDate: data.lastTuneUpDate ? new Date(data.lastTuneUpDate).toISOString() : null,
        specificConcerns: data.specificConcerns || [],
        noiseLevel: noiseLevelToEnum(data.noiseLevel ?? ""),
        energyEfficiency: efficiencyToEnum(data.energyEfficiency ?? ""),
      },
    };

    const response = await api.post('/api/appointments', payload, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (response.data.status === 'success') {
      return { success: true, message: 'Tune up scheduled successfully!' };
    }

    return {
      success: false,
      error: response.data.message || 'Failed to schedule tune up',
    };
  } catch (error: any) {
    console.error('Submit Repair Tune Up error:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'An unexpected error occurred',
    };
  }
}