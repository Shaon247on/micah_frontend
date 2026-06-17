'use server';

import { cookies } from 'next/headers';
import api from '@/lib/axios';
import { 
  BlogResponse, 
  BlogSingleResponse, 
  BlogMutationResponse,
  BlogCategoriesResponse,
  CreateBlogInput,
  UpdateBlogInput 
} from '@/types/blog.types';
import { generateSlug, calculateReadingTime } from '@/schemas/blog.schema';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getBlogs(params?: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  isActive?: boolean;
}): Promise<BlogResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());
    
    const response = await api.get(`/api/blogs?${queryParams.toString()}`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return {
      status: 'error',
      data: {
        blogs: [],
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

export async function getBlogBySlug(slug: string): Promise<BlogSingleResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const response = await api.get(`/api/blogs/${slug}`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return {
      status: 'error',
      data: {} as any,
    };
  }
}

export async function getBlogById(id: string): Promise<BlogSingleResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const response = await api.get(`/api/blogs/id/${id}`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return {
      status: 'error',
      data: {} as any,
    };
  }
}

export async function getBlogCategories(): Promise<BlogCategoriesResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const response = await api.get('/api/blogs/categories', {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return {
      status: 'error',
      data: [],
    };
  }
}

export async function createBlog(data: CreateBlogInput): Promise<BlogMutationResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const slug = generateSlug(data.title);
    const readingTime = data.readingTime || calculateReadingTime(data.content);
    
    const payload = {
      ...data,
      slug,
      readingTime,
    };
    
    const response = await api.post('/api/blogs', payload, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    
    return response.data;
  } catch (error: any) {
    console.error('Error creating blog:', error);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Failed to create blog',
    };
  }
}

export async function updateBlog(data: UpdateBlogInput): Promise<BlogMutationResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    // If title is updated, regenerate slug
    let payload: any = { ...data };
    if (data.title) {
      payload.slug = generateSlug(data.title);
    }
    
    // Recalculate reading time if content changed
    if (data.content) {
      payload.readingTime = calculateReadingTime(data.content);
    }
    
    const response = await api.put(`/api/blogs/${data.id}`, payload, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    
    return response.data;
  } catch (error: any) {
    console.error('Error updating blog:', error);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Failed to update blog',
    };
  }
}

export async function deleteBlog(id: string): Promise<{ status: string; message: string }> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const response = await api.delete(`/api/blogs/${id}`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    
    return response.data;
  } catch (error: any) {
    console.error('Error deleting blog:', error);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Failed to delete blog',
    };
  }
}

export async function bulkDeleteBlogs(ids: string[]): Promise<{ status: string; message: string }> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const response = await api.post('/api/blogs/bulk-delete', { ids }, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    
    return response.data;
  } catch (error: any) {
    console.error('Error bulk deleting blogs:', error);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Failed to delete blogs',
    };
  }
}