// src/app/(public)/auth/action.ts
'use server';

import { cookies } from 'next/headers';
import {
  loginService,
  registerService,
  getSessionByRefreshToken,
  logoutService,
} from './service';
import { ApiError } from '@/lib/http/api-client';
import type { LoginPayload, RegisterPayload, SafeUser } from '@/types/auth';

type ActionSuccess<T> = { success: true; data: T };
type ActionFailure = { success: false; error: string; errors?: string[]; status?: number };
type ActionResult<T> = ActionSuccess<T> | ActionFailure;

type AuthResult = { user: SafeUser; accessToken: string };

const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60;

async function setRefreshTokenCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set('refreshToken', token, {
    httpOnly: true,
    secure: process.env.APP_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });
}

export async function loginAction(payload: LoginPayload): Promise<ActionResult<AuthResult>> {
  try {
    const result = await loginService(payload);
    await setRefreshTokenCookie(result.refreshToken);
    return { success: true, data: { user: result.user, accessToken: result.accessToken } };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message,
        errors: Array.isArray((error.data as { data?: unknown })?.data)
          ? ((error.data as { data?: unknown }).data as string[])
          : undefined,
        status: error.status,
      };
    }
    console.error('loginAction unexpected error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Đã xảy ra lỗi khi đăng nhập',
    };
  }
}

export async function registerAction(payload: RegisterPayload): Promise<ActionResult<AuthResult>> {
  try {
    const result = await registerService(payload);
    await setRefreshTokenCookie(result.refreshToken);
    return { success: true, data: { user: result.user, accessToken: result.accessToken } };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message,
        errors: Array.isArray((error.data as { data?: unknown })?.data)
          ? ((error.data as { data?: unknown }).data as string[])
          : undefined,
        status: error.status,
      };
    }
    console.error('registerAction unexpected error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Đã xảy ra lỗi khi đăng ký',
    };
  }
}

export async function logoutAction(): Promise<{ success: boolean }> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (refreshToken) {
    try {
      await logoutService(refreshToken);
    } catch {
      // Cookie will still be cleared below even if internal API call fails.
    }
  }

  cookieStore.set('refreshToken', '', {
    httpOnly: true,
    secure: process.env.APP_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(0),
  });
  return { success: true };
}

export async function checkSessionAction(): Promise<ActionResult<AuthResult>> {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
      return { success: false, error: 'No session' };
    }

    const session = await getSessionByRefreshToken(refreshToken);

    if (!session) {
      return { success: false, error: 'Session expired or not found' };
    }

    return { success: true, data: { user: session.user, accessToken: session.accessToken } };
  } catch (error) {
    if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
      return { success: false, error: error.message, status: error.status };
    }

    console.error('checkSessionAction unexpected error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Session check failed',
    };
  }
}
