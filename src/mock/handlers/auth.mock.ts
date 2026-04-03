import usersDb from '@/mock/db/users.json';
import sessionsDb from '@/mock/db/sessions.json';
import type { ApiResponse, AuthResponseData, MeResponseData, SafeUser } from '@/types/auth';

type MockUser = {
  id: string;
  fullName: string;
  email: string;
  password: string;
};

type MockSession = {
  userId: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  refreshTokenExpiresAt: number;
};

export type MockLoginPayload = {
  email?: string;
  password?: string;
};

export type MockRegisterPayload = {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export class MockHttpError extends Error {
  status: number;
  data: string[];

  constructor(status: number, message: string, data?: string[]) {
    super(message);
    this.name = 'MockHttpError';
    this.status = status;
    this.data = data ?? [message];
  }
}

let users: MockUser[] = usersDb.map((item) => ({ ...item }));
let sessions: MockSession[] = sessionsDb.map((item) => ({ ...item }));

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function toSafeUser(user: MockUser): SafeUser {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
  };
}

function createToken(prefix: string) {
  const randomPart =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2);

  return `${prefix}-${randomPart}`;
}

function findUserByAccessToken(accessToken: string) {
  const now = Date.now();
  const session = sessions.find(
    (item) => item.accessToken === accessToken && item.accessTokenExpiresAt > now,
  );

  if (!session) {
    return null;
  }

  return users.find((user) => user.id === session.userId) ?? null;
}

export function mockLogin(payload: MockLoginPayload): ApiResponse<AuthResponseData & { refreshToken: string }> {
  const email = payload.email?.trim();
  const password = payload.password;

  if (!email || !password) {
    throw new MockHttpError(400, 'Email va mat khau la bat buoc');
  }

  const user = users.find(
    (item) => item.email === normalizeEmail(email) && item.password === password,
  );

  if (!user) {
    throw new MockHttpError(401, 'Email hoac mat khau khong dung');
  }

  const accessToken = createToken('access');
  const refreshToken = createToken('refresh');
  const accessTokenExpiresAt = Date.now() + 60 * 60 * 1000;

  sessions = [
    ...sessions,
    {
      userId: user.id,
      accessToken,
      refreshToken,
      accessTokenExpiresAt,
      refreshTokenExpiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    },
  ];

  return {
    success: true,
    message: 'Dang nhap thanh cong',
    status: 200,
    totalRecord: 1,
    actions: { view: true },
    data: {
      user: toSafeUser(user),
      accessToken,
      refreshToken,
      accessTokenExpiresAt,
    },
  };
}

export function mockRegister(payload: MockRegisterPayload): ApiResponse<AuthResponseData & { refreshToken: string }> {
  const errors: string[] = [];
  const fullName = payload.fullName?.trim() ?? '';
  const email = payload.email?.trim() ?? '';
  const password = payload.password ?? '';
  const confirmPassword = payload.confirmPassword ?? '';

  if (!fullName) {
    errors.push('Chua nhap ho ten');
  }

  if (!email) {
    errors.push('Chua nhap email');
  }

  if (!password) {
    errors.push('Chua nhap mat khau');
  }

  if (!confirmPassword) {
    errors.push('Chua nhap mat khau xac nhan');
  }

  if (password && confirmPassword && password !== confirmPassword) {
    errors.push('Mat khau xac nhan khong khop');
  }

  if (errors.length > 0) {
    throw new MockHttpError(422, errors[0], errors);
  }

  const normalizedEmail = normalizeEmail(email);
  const existingUser = users.find((item) => item.email === normalizedEmail);

  if (existingUser) {
    throw new MockHttpError(409, 'Email da ton tai');
  }

  const newUser: MockUser = {
    id: `u${Date.now()}`,
    fullName,
    email: normalizedEmail,
    password,
  };

  users = [...users, newUser];

  const accessToken = createToken('access');
  const refreshToken = createToken('refresh');
  const accessTokenExpiresAt = Date.now() + 60 * 60 * 1000;

  sessions = [
    ...sessions,
    {
      userId: newUser.id,
      accessToken,
      refreshToken,
      accessTokenExpiresAt,
      refreshTokenExpiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    },
  ];

  return {
    success: true,
    message: 'Dang ky thanh cong',
    status: 201,
    totalRecord: 1,
    actions: { create: true, view: true },
    data: {
      user: toSafeUser(newUser),
      accessToken,
      refreshToken,
      accessTokenExpiresAt,
    },
  };
}

export function mockGetMe(accessToken?: string): ApiResponse<MeResponseData> {
  if (!accessToken) {
    throw new MockHttpError(401, 'Ban chua dang nhap');
  }

  const user = findUserByAccessToken(accessToken);

  if (!user) {
    throw new MockHttpError(401, 'Token khong hop le hoac da het han');
  }

  return {
    success: true,
    message: 'Lay thong tin nguoi dung thanh cong',
    status: 200,
    totalRecord: 1,
    actions: { view: true },
    data: {
      user: toSafeUser(user),
    },
  };
}
