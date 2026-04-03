import {
  clearAuth,
  getAccessToken,
  setAccessToken,
  setCurrentUser,
} from '@/lib/auth-store';
import type { ApiResponse, AuthResponseData, SafeUser } from '@/services/authService';
import { api } from '@/services/api';

type MeResponseData = {
  user: SafeUser;
};

export async function refreshSession() {
  try {
    const result = await api.post<ApiResponse<AuthResponseData>>(
      '/api/auth/refresh',
      undefined,
      {
        credentials: 'include',
      }
    );

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
    const result = await api.get<ApiResponse<MeResponseData>>('/api/auth/me', {
      token,
      credentials: 'include',
    });

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
    await api.post<ApiResponse<null>>('/api/auth/logout', undefined, {
      credentials: 'include',
    });
  } finally {
    clearAuth();
  }
}
