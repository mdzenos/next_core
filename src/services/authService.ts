export type SafeUser = {
  id: string;
  fullName: string;
  email: string;
};

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

export type AuthResponseData = {
  user: SafeUser;
  accessToken: string;
  accessTokenExpiresAt: number;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

type RequestOptions = {
  timeoutMs?: number;
};

async function postJson<T>(
  url: string,
  body: unknown,
  options?: RequestOptions,
): Promise<ApiResponse<T>> {
  const controller = new AbortController();
  const timeoutMs = options?.timeoutMs ?? 10000;

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    return result;
  } finally {
    clearTimeout(timeoutId);
  }
}

export function login(payload: LoginPayload, options?: RequestOptions) {
  return postJson<AuthResponseData>('/api/auth/login', payload, options);
}

export function register(payload: RegisterPayload, options?: RequestOptions) {
  return postJson<AuthResponseData>('/api/auth/register', payload, options);
}
