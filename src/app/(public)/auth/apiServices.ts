'use client';

import { api } from '@/services/api';
import { clearAuth, getAccessToken, setAccessToken, setCurrentUser } from '@/lib/auth-store';
import type { ApiResponse, AuthResponseData, LoginPayload, MeResponseData, RegisterPayload } from '@/types/auth';

const BASE =
  process.env.NEXT_PUBLIC_API_MODE === 'mock'
    ? '/api'
    : process.env.NEXT_PUBLIC_API_URL;

function authUrl(path: string) {
  return `${BASE}${path}`;
}

export type { LoginPayload, RegisterPayload };

export async function login(payload: LoginPayload) {
  const response = await api.post<ApiResponse<AuthResponseData>>(
    authUrl('/auth/login'),
    payload,
    {
      credentials: 'include',
      timeoutMs: 10000,
    },
  );

  setAccessToken(response.data.accessToken);
  setCurrentUser(response.data.user);

  return response;
}

export async function register(payload: RegisterPayload) {
  const response = await api.post<ApiResponse<AuthResponseData>>(
    authUrl('/auth/register'),
    payload,
    {
      credentials: 'include',
      timeoutMs: 10000,
    },
  );

  setAccessToken(response.data.accessToken);
  setCurrentUser(response.data.user);

  return response;
}

export async function getMe() {
  const accessToken = getAccessToken();

  if (!accessToken) {
    return null;
  }

  const response = await api.get<ApiResponse<MeResponseData>>(authUrl('/auth/me'), {
    token: accessToken,
    credentials: 'include',
    timeoutMs: 10000,
  });

  setCurrentUser(response.data.user);
  return response.data;
}

export async function logout() {
  try {
    await api.post<ApiResponse<null>>(authUrl('/auth/logout'), undefined, {
      credentials: 'include',
      timeoutMs: 5000,
    });
  } finally {
    clearAuth();
  }
}
