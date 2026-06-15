import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Forward request to backend
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    
    // Create Next.js response
    const nextResponse = NextResponse.json(data);
    
    // Forward the auth_token cookie from backend response
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      // Parse and forward the auth_token cookie
      const cookies = setCookieHeader.split(',').map(c => c.trim());
      for (const cookie of cookies) {
        if (cookie.includes('auth_token') || cookie.includes('user_info')) {
          nextResponse.headers.append('Set-Cookie', cookie);
        }
      }
    }
    
    return nextResponse;
  } catch (error) {
    console.error('Login proxy error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Login failed' },
      { status: 500 }
    );
  }
}