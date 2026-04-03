// src/lib/check-auth-session.ts
import { getAccessToken } from '@/lib/auth-store';
import { getMe } from '@/app/(public)/auth/apiServices';

export async function checkAuthenticatedSession(): Promise<boolean> {
  const token = getAccessToken();

  if (token) {
    const me = await getMe();
    if (me) return true;
  }

  return false;
}
