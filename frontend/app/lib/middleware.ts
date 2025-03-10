import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { CACHE_CONTROL } from './cache-config';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add cache headers based on the request path
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Don't cache user-specific endpoints
    if (request.nextUrl.pathname.includes('/api/auth/')) {
      response.headers.set('Cache-Control', 'no-store');
    } else {
      response.headers.set('Cache-Control', CACHE_CONTROL.PUBLIC.API);
    }
  } else if (
    request.nextUrl.pathname.match(/\.(jpg|jpeg|png|webp|avif|gif|ico)$/)
  ) {
    response.headers.set('Cache-Control', CACHE_CONTROL.PUBLIC.IMAGES);
  } else if (
    request.nextUrl.pathname.match(/\.(css|js|woff|woff2|ttf|eot)$/)
  ) {
    response.headers.set('Cache-Control', CACHE_CONTROL.PUBLIC.STATIC);
  }

  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};