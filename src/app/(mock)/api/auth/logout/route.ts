import { NextResponse } from 'next/server';
import { isInternalKeyValid, internalKeyDenied } from '@/app/(mock)/_internal/verify-key';

export async function POST(request: Request) {
  if (!isInternalKeyValid(request)) {
    return internalKeyDenied();
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set('refreshToken', '', {
    httpOnly: true,
    secure: process.env.APP_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(0),
  });

  return response;
}
