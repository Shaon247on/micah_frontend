import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    
    // Clear the cookies
    cookieStore.delete('auth_token');
    cookieStore.delete('user_info');
    
    // Also try to clear from backend if needed
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Cookie': request.headers.get('cookie') || '',
      },
    }).catch(() => {});
    
    return NextResponse.json({
      status: 'success',
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Logout failed' },
      { status: 500 }
    );
  }
}