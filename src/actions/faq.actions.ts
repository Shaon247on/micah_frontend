'use server';

import { cookies } from 'next/headers';
import api from '@/lib/axios';
import { FAQResponse, FAQMutationResponse } from '@/types/faq';


export async function getFAQs(params?: {
  page?: number;
  limit?: number;
  isActive?: boolean;
  search?: string;
}): Promise<FAQResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());
    if (params?.search) queryParams.append('search', params.search);
    
    const response = await api.get(`/api/faqs?${queryParams.toString()}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return {
      status: 'error',
      data: {
        faqs: [],
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
        },
      },
    };
  }
}

export async function createFAQ(data: { question: string; answer: string; order?: number; isActive?: boolean }): Promise<FAQMutationResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const response = await api.post('/api/faqs', data, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return response.data;
  } catch (error: any) {
    console.error('Error creating FAQ:', error);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Failed to create FAQ',
    };
  }
}

export async function updateFAQ(id: string, data: { question?: string; answer?: string; order?: number; isActive?: boolean }): Promise<FAQMutationResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const response = await api.put(`/api/faqs/${id}`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return response.data;
  } catch (error: any) {
    console.error('Error updating FAQ:', error);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Failed to update FAQ',
    };
  }
}

export async function deleteFAQ(id: string): Promise<{ status: string; message: string }> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const response = await api.delete(`/api/faqs/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return response.data;
  } catch (error: any) {
    console.error('Error deleting FAQ:', error);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Failed to delete FAQ',
    };
  }
}