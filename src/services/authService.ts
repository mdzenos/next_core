import { api, type ApiRequestOptions } from '@/services/api';
import type { ApiResponse } from '@/types/api';

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type SafeUser = {
  id: string;
  fullName: string;
  email: string;
};

type AuthRequestOptions = Omit<
  ApiRequestOptions,
  'method' | 'body' | 'methodOverride'
>;

const API_PREFIX = process.env.NEXT_PUBLIC_API_URL || '';

function buildApiUrl(path: string) {
  return `${API_PREFIX}${path}`;
}

export const authService = {
  login(payload: LoginPayload, options?: AuthRequestOptions) {
    return api.post<ApiResponse<SafeUser>>(
      buildApiUrl('/api/auth/login'),
      payload,
      options
    );
  },

  register(payload: RegisterPayload, options?: AuthRequestOptions) {
    return api.post<ApiResponse<SafeUser>>(
      buildApiUrl('/api/auth/register'),
      payload,
      options
    );
  },
};

export const { login, register } = authService;
