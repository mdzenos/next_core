// src/app/(public)/auth/service.ts
import 'server-only';

import { createApiClient } from '@/lib/http/api-client';
import type {
  ApiResponse,
  LoginPayload,
  RegisterPayload,
  SafeUser,
  UpdateProfilePayload,
} from '@/types/auth';

export type AuthSessionData = {
  user: SafeUser;
  accessToken: string;
  accessTokenExpiresAt: number;
  refreshToken: string;
};

export async function loginService(payload: LoginPayload): Promise<AuthSessionData> {
  const result = await createApiClient().post<ApiResponse<AuthSessionData>>(
    `/api/auth/login`,
    payload,
  );

  return {
    user: result.data.user,
    accessToken: result.data.accessToken,
    accessTokenExpiresAt: result.data.accessTokenExpiresAt,
    refreshToken: result.data.refreshToken,
  };
}

export async function registerService(payload: RegisterPayload): Promise<AuthSessionData> {
  const result = await createApiClient().post<ApiResponse<AuthSessionData>>(
    `/api/auth/register`,
    payload,
  );

  return {
    user: result.data.user,
    accessToken: result.data.accessToken,
    accessTokenExpiresAt: result.data.accessTokenExpiresAt,
    refreshToken: result.data.refreshToken,
  };
}

export async function getSessionByRefreshToken(
  refreshToken: string,
  accessToken?: string | null,
): Promise<{ user: SafeUser; accessToken: string } | null> {
  const result = await createApiClient().get<ApiResponse<{ user: SafeUser; accessToken: string }>>(
    `/api/auth/me`,
    {
      headers: {
        ...(refreshToken
          ? { cookie: `refreshToken=${encodeURIComponent(refreshToken)}` }
          : {}),
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    },
  );

  return {
    user: result.data.user,
    accessToken: result.data.accessToken,
  };
}

export async function updateMeService(
  refreshToken: string,
  payload: UpdateProfilePayload,
  accessToken?: string | null,
): Promise<SafeUser> {
  const result = await createApiClient().patch<ApiResponse<{ user: SafeUser }>>(
    `/api/auth/me`,
    payload,
    {
      headers: {
        ...(refreshToken
          ? { cookie: `refreshToken=${encodeURIComponent(refreshToken)}` }
          : {}),
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    },
  );

  return result.data.user;
}

export async function logoutService(refreshToken: string): Promise<void> {
  await createApiClient().post<{ success: boolean }>(
    `/api/auth/logout`,
    undefined,
    {
      headers: {
        cookie: `refreshToken=${encodeURIComponent(refreshToken)}`,
      },
    },
  );
}
