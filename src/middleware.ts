// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // const { pathname } = request.nextUrl;

  // const token = request.cookies.get('access_token')?.value;

  // const isProtected =
  //   pathname === '/dashboard' ||
  //   pathname.startsWith('/dashboard/') ||
  //   pathname === '/profile' ||
  //   pathname.startsWith('/profile/');

  // const isAuthPage =
  //   pathname === '/auth' ||
  //   pathname.startsWith('/auth/');

  // // Protected → cần login
  // if (isProtected && !token) {
  //   const loginUrl = new URL('/auth/login', request.url);
  //   loginUrl.searchParams.set('redirect', pathname);
  //   return NextResponse.redirect(loginUrl);
  // }

  // // Auth page → đã login thì redirect
  // if (isAuthPage && token) {
  //   return NextResponse.redirect(new URL('/dashboard', request.url));
  // }

  return NextResponse.next();
}
// ===== MATCHER =====
export const config = {
  matcher: [
    /*
     * Áp dụng cho tất cả route trừ:
     * - _next (internal)
     * - static files (png, svg, etc.)
     * - api (mock hoặc backend)
     */
    '/((?!_next|.*\\..*|api).*)',
  ],
};
