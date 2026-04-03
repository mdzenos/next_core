import { clearAccessToken, getAccessToken, setAccessToken } from '@/lib/auth-store';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type ApiFetchOptions = RequestInit & {
  auth?: boolean;
};

export async function apiFetch(
  endpoint: string,
  options: ApiFetchOptions = {}
) {
  const { auth = false, headers, ...restOptions } = options;
  const token = getAccessToken();

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...restOptions,
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
      ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: 'include',
  });

  if (response.status !== 401 || !auth) {
    return response;
  }

  const refreshed = await refreshAccessToken();

  if (!refreshed) {
    clearAccessToken();
    throw new Error('Phiên đăng nhập đã hết hạn.');
  }

  const newToken = getAccessToken();

  return fetch(`${API_BASE_URL}${endpoint}`, {
    ...restOptions,
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
      ...(auth && newToken ? { Authorization: `Bearer ${newToken}` } : {}),
    },
    credentials: 'include',
  });
}

export async function refreshAccessToken() {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();

    if (!data?.accessToken) {
      return false;
    }

    setAccessToken(data.accessToken);
    return true;
  } catch {
    return false;
  }
}
