'use server';

import { cookies } from 'next/headers';
import { 
  ForgotPasswordFormData, 
  VerifyOtpFormData,
} from '@/schemas/auth.schema';
import { redirect } from 'next/navigation';
import api from '@/lib/axios';

// Forgot password - Send OTP
export async function forgotPassword(data: ForgotPasswordFormData) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    
    if (result.status === 'success') {
      return { 
        success: true, 
        message: result.message,
        email: data.email
      };
    }
    
    return { success: false, error: result.message };
  } catch (error: any) {
    return { 
      success: false, 
      error: 'Failed to send OTP. Please try again.' 
    };
  }
}

// Verify OTP - Returns reset token
export async function verifyOtp(data: VerifyOtpFormData) {
  try {
    console.log('Sending verify OTP request:', data);
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    console.log('Verify OTP response:', result);
    
    if (result.status === 'success') {
      // Store reset token in session storage for the reset password step
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('reset_token', result.data.resetToken);
      }
      
      return { 
        success: true, 
        message: result.message,
        email: data.email,
        resetToken: result.data.resetToken
      };
    }
    
    return { success: false, error: result.message };
  } catch (error: any) {
    console.error('Verify OTP error:', error);
    return { 
      success: false, 
      error: 'Failed to verify OTP. Please try again.' 
    };
  }
}

// Reset Password using token (no OTP needed)
export async function resetPassword(data: { resetToken: string; newPassword: string }) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resetToken: data.resetToken,
        newPassword: data.newPassword,
      }),
    });
    
    const result = await response.json();
    
    if (result.status === 'success') {
      return { 
        success: true, 
        message: result.message,
      };
    }
    
    return { success: false, error: result.message };
  } catch (error: any) {
    return { 
      success: false, 
      error: 'Failed to reset password. Please try again.' 
    };
  }
}
// Fetch complete user info from API
export async function fetchUserInfo() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    if (!token) {
      return null;
    }
    
    const response = await api.get('/api/auth/user-info', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (response.data.status === 'success') {
      return response.data.data;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching user info:', error);
    return null;
  }
}


// Get current user from cookie
export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const userInfoCookie = cookieStore.get('user_info')?.value;
    
    if (!userInfoCookie) {
      return null;
    }
    
    const user = JSON.parse(userInfoCookie);
    return user;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}

// Check if authenticated
export async function isAuthenticated() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    return !!token;
  } catch (error) {
    return false;
  }
}



export async function refreshUserInfo() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const response = await api.post('/api/auth/refresh', {}, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return response.data;
  } catch (error: any) {
    console.error('Error refreshing user info:', error);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Failed to refresh user info',
    };
  }
}


export async function logout() {
  try {
    // Call backend logout to clear cookies
    await api.post('/api/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  }
  
  // Clear cookies on server side
  const cookieStore = await cookies();
  cookieStore.delete('auth_token');
  cookieStore.delete('user_info');
  
  // Redirect to login page
  redirect('/login');
}