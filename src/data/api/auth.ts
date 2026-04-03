// src/data/api/auth.ts
import { readJsonFile, writeJsonFile } from '@/data/lib/file-db';
import { generateToken, getAccessTokenExpiresAt, getRefreshTokenExpiresAt } from '@/lib/auth-token';

type User = {
  id: string;
  fullName: string;
  email: string;
  password: string;
};

type SafeUser = {
  id: string;
  fullName: string;
  email: string;
};

type Session = {
  userId: string;
  refreshToken: string;
  accessToken: string;
  accessTokenExpiresAt: number;
  refreshTokenExpiresAt: number;
};

const USERS_FILE = 'src/data/json/users.json';
const SESSIONS_FILE = 'src/data/json/sessions.json';

function toSafeUser(user: User): SafeUser {
  const { password: _password, ...safeUser } = user;
  return safeUser;
}

export async function loginUser(email: string, password: string) {
  const users = await readJsonFile<User[]>(USERS_FILE);

  const user =
    users.find((item) => item.email === email.trim().toLowerCase() && item.password === password) ??
    null;

  if (!user) {
    return null;
  }

  const sessions = await readJsonFile<Session[]>(SESSIONS_FILE);

  const accessToken = generateToken();
  const refreshToken = generateToken();

  const nextSession: Session = {
    userId: user.id,
    accessToken,
    refreshToken,
    accessTokenExpiresAt: getAccessTokenExpiresAt(),
    refreshTokenExpiresAt: getRefreshTokenExpiresAt(),
  };

  await writeJsonFile(SESSIONS_FILE, [...sessions, nextSession]);

  return {
    user: toSafeUser(user),
    accessToken,
    refreshToken,
    accessTokenExpiresAt: nextSession.accessTokenExpiresAt,
  };
}

export async function registerUser(fullName: string, email: string, password: string) {
  const users = await readJsonFile<User[]>(USERS_FILE);

  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = users.find((item) => item.email.toLowerCase() === normalizedEmail);

  if (existingUser) {
    throw new Error('Email đã tồn tại');
  }

  const newUser: User = {
    id: `u${Date.now()}`,
    fullName: fullName.trim(),
    email: normalizedEmail,
    password,
  };

  const nextUsers = [...users, newUser];
  await writeJsonFile(USERS_FILE, nextUsers);

  const accessToken = generateToken();
  const refreshToken = generateToken();

  const sessions = await readJsonFile<Session[]>(SESSIONS_FILE);

  const nextSession: Session = {
    userId: newUser.id,
    accessToken,
    refreshToken,
    accessTokenExpiresAt: getAccessTokenExpiresAt(),
    refreshTokenExpiresAt: getRefreshTokenExpiresAt(),
  };

  await writeJsonFile(SESSIONS_FILE, [...sessions, nextSession]);

  return {
    user: toSafeUser(newUser),
    accessToken,
    refreshToken,
    accessTokenExpiresAt: nextSession.accessTokenExpiresAt,
  };
}

export async function refreshUserSession(refreshToken: string) {
  const sessions = await readJsonFile<Session[]>(SESSIONS_FILE);
  const users = await readJsonFile<User[]>(USERS_FILE);

  const session = sessions.find(
    (item) => item.refreshToken === refreshToken && item.refreshTokenExpiresAt > Date.now(),
  );

  if (!session) {
    return null;
  }

  const user = users.find((item) => item.id === session.userId);
  if (!user) {
    return null;
  }

  const newAccessToken = generateToken();
  const newAccessTokenExpiresAt = getAccessTokenExpiresAt();

  const nextSessions = sessions.map((item) =>
    item.refreshToken === refreshToken
      ? {
          ...item,
          accessToken: newAccessToken,
          accessTokenExpiresAt: newAccessTokenExpiresAt,
        }
      : item,
  );

  await writeJsonFile(SESSIONS_FILE, nextSessions);

  return {
    user: toSafeUser(user),
    accessToken: newAccessToken,
    accessTokenExpiresAt: newAccessTokenExpiresAt,
  };
}

export async function getUserByAccessToken(accessToken: string) {
  const sessions = await readJsonFile<Session[]>(SESSIONS_FILE);
  const users = await readJsonFile<User[]>(USERS_FILE);

  const session = sessions.find(
    (item) => item.accessToken === accessToken && item.accessTokenExpiresAt > Date.now(),
  );

  if (!session) {
    return null;
  }

  const user = users.find((item) => item.id === session.userId);
  if (!user) {
    return null;
  }

  return toSafeUser(user);
}

export async function logoutUser(refreshToken: string) {
  const sessions = await readJsonFile<Session[]>(SESSIONS_FILE);
  const nextSessions = sessions.filter((item) => item.refreshToken !== refreshToken);

  await writeJsonFile(SESSIONS_FILE, nextSessions);
}
