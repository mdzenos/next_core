import { formatSuccessResponse } from '@/lib/api-response';
import { generateToken, getAccessTokenExpiresAt, getRefreshTokenExpiresAt } from '@/lib/auth-token';
import initialSessions from '@/mocks/sessions.json';
import initialUsers from '@/mocks/users.json';
import { ApiError } from '@/services/api';
import type {
  AuthAdapter,
  AuthAdapterResponseData,
  AuthResponseData,
  LoginPayload,
  MeResponseData,
  RegisterPayload,
  RequestOptions,
  SafeUser,
} from '@/types/auth';

type MockUser = {
  id: string;
  fullName: string;
  email: string;
  password: string;
};

type MockSession = {
  userId: string;
  refreshToken: string;
  accessToken: string;
  accessTokenExpiresAt: number;
  refreshTokenExpiresAt: number;
};

let users: MockUser[] = initialUsers.map((user) => ({ ...user }));
let sessions: MockSession[] = initialSessions.map((session) => ({ ...session }));

function toSafeUser(user: MockUser): SafeUser {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
  };
}

function createApiError(message: string, status: number, data?: unknown) {
  return new ApiError(message, new Response(null, { status }), data ?? [message]);
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function cleanupExpiredSessions() {
  const now = Date.now();
  sessions = sessions.filter((session) => session.refreshTokenExpiresAt > now);
}

function getRandomDelay() {
  return 200 + Math.floor(Math.random() * 301);
}

async function simulateNetwork(options?: RequestOptions) {
  void options;
  const mockErrorRate = Number(process.env.NEXT_PUBLIC_MOCK_ERROR_RATE ?? '0');

  await new Promise((resolve) => setTimeout(resolve, getRandomDelay()));

  if (Number.isFinite(mockErrorRate) && mockErrorRate > 0 && Math.random() < mockErrorRate) {
    throw createApiError('Lỗi mô phỏng từ mock adapter', 500);
  }
}

function buildAuthResult(user: MockUser): AuthAdapterResponseData {
  return {
    user: toSafeUser(user),
    accessToken: generateToken(),
    refreshToken: generateToken(),
    accessTokenExpiresAt: getAccessTokenExpiresAt(),
  };
}

function persistSession(userId: string, authResult: AuthAdapterResponseData) {
  const nextSession: MockSession = {
    userId,
    accessToken: authResult.accessToken,
    refreshToken: authResult.refreshToken,
    accessTokenExpiresAt: authResult.accessTokenExpiresAt,
    refreshTokenExpiresAt: getRefreshTokenExpiresAt(),
  };

  sessions = [...sessions, nextSession];
}

function updateSessionAccessToken(session: MockSession) {
  const nextAccessToken = generateToken();
  const nextAccessTokenExpiresAt = getAccessTokenExpiresAt();

  sessions = sessions.map((item) =>
    item.refreshToken === session.refreshToken
      ? {
          ...item,
          accessToken: nextAccessToken,
          accessTokenExpiresAt: nextAccessTokenExpiresAt,
        }
      : item,
  );

  return {
    accessToken: nextAccessToken,
    accessTokenExpiresAt: nextAccessTokenExpiresAt,
  };
}

function requireUserBySession(session: MockSession | undefined) {
  if (!session) {
    throw createApiError('Phiên đăng nhập không hợp lệ hoặc đã hết hạn', 401);
  }

  const user = users.find((item) => item.id === session.userId);

  if (!user) {
    throw createApiError('Phiên đăng nhập không hợp lệ hoặc đã hết hạn', 401);
  }

  return user;
}

function formatAuthSuccess(data: AuthAdapterResponseData, message: string, status: number) {
  return formatSuccessResponse<AuthAdapterResponseData>(data, {
    message,
    status,
    actions: {
      view: true,
      ...(status === 201 ? { create: true } : {}),
    },
  });
}

function formatSessionSuccess(data: AuthResponseData, message: string) {
  return formatSuccessResponse<AuthResponseData>(data, {
    message,
    status: 200,
    actions: {
      view: true,
    },
  });
}

function formatMeSuccess(user: SafeUser) {
  return formatSuccessResponse<MeResponseData>(
    { user },
    {
      message: 'Lấy thông tin người dùng thành công',
      status: 200,
      actions: {
        view: true,
      },
    },
  );
}

export const authMockAdapter: AuthAdapter = {
  async login(payload: LoginPayload, options?: RequestOptions) {
    await simulateNetwork(options);
    cleanupExpiredSessions();

    const user =
      users.find(
        (item) =>
          item.email === normalizeEmail(payload.email) && item.password === payload.password,
      ) ?? null;

    if (!user) {
      throw createApiError('Email hoặc mật khẩu không đúng', 401);
    }

    const authResult = buildAuthResult(user);
    persistSession(user.id, authResult);

    return formatAuthSuccess(authResult, 'Đăng nhập thành công', 200);
  },

  async register(payload: RegisterPayload, options?: RequestOptions) {
    await simulateNetwork(options);
    cleanupExpiredSessions();

    const normalizedEmail = normalizeEmail(payload.email);
    const existingUser = users.find((item) => item.email === normalizedEmail);

    if (existingUser) {
      throw createApiError('Email đã tồn tại', 409);
    }

    const newUser: MockUser = {
      id: `u${Date.now()}`,
      fullName: payload.fullName.trim(),
      email: normalizedEmail,
      password: payload.password,
    };

    users = [...users, newUser];

    const authResult = buildAuthResult(newUser);
    persistSession(newUser.id, authResult);

    return formatAuthSuccess(authResult, 'Đăng ký tài khoản thành công', 201);
  },

  async refreshSession(refreshToken, options?: RequestOptions) {
    await simulateNetwork(options);
    cleanupExpiredSessions();

    if (!refreshToken) {
      throw createApiError('Không tìm thấy refresh token', 401);
    }

    const session = sessions.find(
      (item) =>
        item.refreshToken === refreshToken && item.refreshTokenExpiresAt > Date.now(),
    );

    if (!session) {
      throw createApiError('Refresh token không hợp lệ hoặc đã hết hạn', 401);
    }

    const user = requireUserBySession(session);
    const nextAccess = updateSessionAccessToken(session);

    return formatSessionSuccess(
      {
        user: toSafeUser(user),
        accessToken: nextAccess.accessToken,
        accessTokenExpiresAt: nextAccess.accessTokenExpiresAt,
      },
      'Làm mới phiên đăng nhập thành công',
    );
  },

  async getMe(accessToken, options?: RequestOptions) {
    await simulateNetwork(options);
    cleanupExpiredSessions();

    if (!accessToken) {
      throw createApiError('Bạn chưa đăng nhập', 401);
    }

    const session = sessions.find(
      (item) => item.accessToken === accessToken && item.accessTokenExpiresAt > Date.now(),
    );

    const user = requireUserBySession(session);
    return formatMeSuccess(toSafeUser(user));
  },

  async logout(refreshToken, options?: RequestOptions) {
    await simulateNetwork(options);

    if (refreshToken) {
      sessions = sessions.filter((item) => item.refreshToken !== refreshToken);
    }

    return formatSuccessResponse<null>(null, {
      message: 'Đăng xuất thành công',
      status: 200,
    });
  },
};
