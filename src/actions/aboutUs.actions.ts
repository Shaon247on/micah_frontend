'use server';

import { cookies } from 'next/headers';
import api from '@/lib/axios';
import { AboutUsResponse, AboutUsUpdateResponse, AboutUsStory } from '@/types/aboutUs';

export async function getAboutUsStory(): Promise<AboutUsResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const response = await api.get('/api/about-us/story', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching about us story:', error);
    return {
      status: 'error',
      data: {
        id: '',
        title: 'About Us',
        subtitle: '',
        storyTitle: 'Our Story',
        storySubtitle: '',
        cards: [],
        createdAt: '',
        updatedAt: '',
      },
    };
  }
}

export async function updateAboutUsStory(data: Partial<AboutUsStory>): Promise<AboutUsUpdateResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const response = await api.put('/api/about-us/story', data, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return response.data;
  } catch (error: any) {
    console.error('Error updating about us story:', error);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Failed to update about us content',
    };
  }
}