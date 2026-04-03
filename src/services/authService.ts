import { authAdapter } from '@/adapters/auth';
import { setMockRefreshToken } from '@/lib/auth/mock-session-store';
import { setAccessToken, setCurrentUser } from '@/lib/auth-store';
import type {
  ApiResponse,
  AuthAdapterResponseData,
  AuthResponseData,
  LoginPayload,
  RegisterPayload,
  RequestOptions,
} from '@/types/auth';

function toPublicAuthResponse(
  response: ApiResponse<AuthAdapterResponseData>,
): ApiResponse<AuthResponseData> {
  const { refreshToken: _refreshToken, ...data } = response.data;

  return {
    ...response,
    data,
  };
}

function persistAuthState(response: ApiResponse<AuthAdapterResponseData>) {
  setAccessToken(response.data.accessToken);
  setCurrentUser(response.data.user);
  setMockRefreshToken(response.data.refreshToken);

  return toPublicAuthResponse(response);
}

export function loginForServer(payload: LoginPayload, options?: RequestOptions) {
  return authAdapter.login(payload, options);
}

export function registerForServer(payload: RegisterPayload, options?: RequestOptions) {
  return authAdapter.register(payload, options);
}

export type {
  ApiActions,
  ApiResponse,
  AuthAdapterResponseData,
  AuthResponseData,
  LoginPayload,
  RegisterPayload,
  SafeUser,
} from '@/types/auth';

export async function login(payload: LoginPayload, options?: RequestOptions) {
  const response = await authAdapter.login(payload, options);
  return persistAuthState(response);
}

export async function register(payload: RegisterPayload, options?: RequestOptions) {
  const response = await authAdapter.register(payload, options);
  return persistAuthState(response);
}
