import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { logoutSessionForServer } from '@/services/authSessionService';

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  await logoutSessionForServer(refreshToken);

  const response = NextResponse.json({ success: true });

  response.cookies.set('refreshToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(0),
  });

  return response;
}
