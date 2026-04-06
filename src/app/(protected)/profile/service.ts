import 'server-only';

import { createApiClient } from '@/lib/http/api-client';
import type { ApiResponse, SafeUser, UpdateProfilePayload } from '@/types/auth';

export async function getProfileService(
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

export async function updateProfileService(
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
