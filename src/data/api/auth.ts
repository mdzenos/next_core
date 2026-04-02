import { readJsonFile, writeJsonFile } from '@/data/lib/file-db';

type User = {
  id: string;
  fullName: string;
  email: string;
  password: string;
};

const USERS_FILE = 'src/data/json/users.json';

export async function loginUser(email: string, password: string) {
  const users = await readJsonFile<User[]>(USERS_FILE);

  const user =
    users.find(
      (item) => item.email === email.trim() && item.password === password
    ) ?? null;

  if (!user) {
    return null;
  }

  const { password: _password, ...safeUser } = user;
  return safeUser;
}

export async function registerUser(
  fullName: string,
  email: string,
  password: string
) {
  const users = await readJsonFile<User[]>(USERS_FILE);

  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = users.find(
    (item) => item.email.toLowerCase() === normalizedEmail
  );

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

  const { password: _password, ...safeUser } = newUser;
  return safeUser;
}
