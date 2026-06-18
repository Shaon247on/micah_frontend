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

// ============================================================
// PUBLIC ACTIONS (No auth required)
// ============================================================

export async function getActiveBlogs(params?: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}): Promise<BlogResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    
    const response = await api.get(`/api/blogs?${queryParams.toString()}`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching active blogs:', error);
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
  } catch (error: any) {
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

// ============================================================
// ADMIN ACTIONS (Requires authentication)
// ============================================================

// ✅ Get ALL blogs (including inactive) - Admin only
export async function getAllBlogs(params?: {
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
    
    const response = await api.get(`/api/blogs/admin/all?${queryParams.toString()}`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching all blogs:', error);
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

// ✅ Get blog by ID (admin only)
export async function getBlogById(id: string): Promise<BlogSingleResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const response = await api.get(`/api/blogs/admin/${id}`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    
    return response.data;
  } catch (error: any) {
    console.error('Error fetching blog by ID:', error);
    return {
      status: 'error',
      data: {} as any,
    };
  }
}

// ✅ Toggle blog status (active/inactive)
export async function toggleBlogStatus(id: string, isActive: boolean): Promise<{ status: string; message: string; data?: any }> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const response = await api.patch(`/api/blogs/admin/${id}/toggle-status`, 
      { isActive },
      {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );
    
    return response.data;
  } catch (error: any) {
    console.error('Error toggling blog status:', error);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Failed to toggle blog status',
    };
  }
}

// Create blog
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

// Update blog
export async function updateBlog(data: UpdateBlogInput): Promise<BlogMutationResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    let payload: any = { ...data };
    if (data.title) {
      payload.slug = generateSlug(data.title);
    }
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

// Delete blog
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

// Bulk delete blogs
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

// Upload blog image
export async function uploadBlogImage(formData: FormData): Promise<{ status: string; message: string; imageUrl?: string }> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const response = await api.post('/api/blogs/upload-image', formData, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error: any) {
    console.error('Error uploading blog image:', error);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Failed to upload image',
    };
  }
}