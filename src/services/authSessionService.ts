import { authAdapter } from '@/adapters/auth';
import { clearMockRefreshToken, getMockRefreshToken } from '@/lib/auth/mock-session-store';
import { clearAuth, getAccessToken, setAccessToken, setCurrentUser } from '@/lib/auth-store';
import type { AuthResponseData, MeResponseData } from '@/types/auth';

export function refreshSessionForServer(refreshToken?: string | null) {
  return authAdapter.refreshSession(refreshToken);
}

export function getMeForServer(accessToken?: string | null) {
  return authAdapter.getMe(accessToken);
}

export function logoutSessionForServer(refreshToken?: string | null) {
  return authAdapter.logout(refreshToken);
}

export async function refreshSession() {
  try {
    const result = await authAdapter.refreshSession(getMockRefreshToken());

    if (!result?.data) {
      clearAuth();
      return null;
    }

    setAccessToken(result.data.accessToken);
    setCurrentUser(result.data.user);

    return result.data;
  } catch {
    clearAuth();
    return null;
  }
}

export async function getMe() {
  const token = getAccessToken();

  if (!token) {
    return null;
  }

  try {
    const result = await authAdapter.getMe(token);

    if (!result?.data) {
      return null;
    }

    setCurrentUser(result.data.user);

    return result.data;
  } catch {
    return null;
  }
}

export async function logoutSession() {
  try {
    await authAdapter.logout(getMockRefreshToken());
  } finally {
    clearMockRefreshToken();
    clearAuth();
  }
}
