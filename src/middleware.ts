import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCurrentUser } from '@/actions/auth.actions';

// Protected routes that require authentication
const protectedRoutes = ['/dashboard', '/admin', '/profile'];

// Auth routes (redirect to dashboard if already logged in)
const authRoutes = ['/login', '/forgot-password', '/verify-otp', '/reset-password'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if user is authenticated
  const user = await getCurrentUser();
  const isAuthenticated = !!user;
  
  // Redirect to login if accessing protected route without auth
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !isAuthenticated) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }
  
  // Redirect to dashboard if accessing auth route while authenticated
  if (authRoutes.includes(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/profile/:path*',
    '/login',
    '/forgot-password',
    '/verify-otp',
    '/reset-password',
  ],
};