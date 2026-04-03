import { apiFetch } from '@/lib/api-client';
import { clearAccessToken, setAccessToken } from '@/lib/auth-store';

type LoginPayload = {
  email: string;
  password: string;
};

export async function login(payload: LoginPayload) {
  const response = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Đăng nhập thất bại.');
  }

  const data = await response.json();

  if (data?.accessToken) {
    setAccessToken(data.accessToken);
  }

  return data;
}

export async function logout() {
  try {
    await apiFetch('/auth/logout', {
      method: 'POST',
      auth: true,
    });
  } finally {
    clearAccessToken();
  }
}

export async function getProfile() {
  const response = await apiFetch('/auth/me', {
    method: 'GET',
    auth: true,
  });

  if (!response.ok) {
    throw new Error('Không thể lấy thông tin người dùng.');
  }

  return response.json();
}
