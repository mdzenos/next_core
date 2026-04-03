// src/lib/check-auth-session.ts
import { getAccessToken } from '@/lib/auth-store';
import { getMe, refreshSession } from '@/services/authSessionService';

export async function checkAuthenticatedSession(): Promise<boolean> {
  const token = getAccessToken();

  if (token) {
    const me = await getMe();
    if (me) return true;
  }

  const refreshed = await refreshSession();
  return !!refreshed;
}
