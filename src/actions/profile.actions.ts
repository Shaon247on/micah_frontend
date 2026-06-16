'use server';

import { cookies } from 'next/headers';
import api from '@/lib/axios';
import { ProfileResponse, ProfileUpdateResponse, PasswordUpdateResponse, AvatarUploadResponse } from '@/types/profile';


export async function getProfile(): Promise<ProfileResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const response = await api.get('/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return {
      status: 'error',
      data: {
        id: '',
        name: '',
        email: '',
        role: '',
        avatar: null,
      },
    };
  }
}

export async function updateProfile(data: { name: string; email: string; avatar?: string | null }): Promise<ProfileUpdateResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const response = await api.put('/api/auth/profile', data, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return response.data;
  } catch (error: any) {
    console.error('Error updating profile:', error);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Failed to update profile',
    };
  }
}

export async function updatePassword(data: { currentPassword: string; newPassword: string; confirmPassword: string }): Promise<PasswordUpdateResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const response = await api.put('/api/auth/password', data, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return response.data;
  } catch (error: any) {
    console.error('Error updating password:', error);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Failed to update password',
    };
  }
}

// Upload avatar - Accept base64 string
export async function uploadAvatar(base64Data: string, fileName: string): Promise<AvatarUploadResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const response = await api.post('/api/auth/upload-avatar', 
      { image: base64Data, fileName },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    
    return response.data;
  } catch (error: any) {
    console.error('Error uploading avatar:', error);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Failed to upload avatar',
    };
  }
}

// Delete avatar
export async function deleteAvatar(): Promise<{ status: string; message: string }> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const response = await api.delete('/api/auth/avatar', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return response.data;
  } catch (error: any) {
    console.error('Error deleting avatar:', error);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Failed to delete avatar',
    };
  }
}