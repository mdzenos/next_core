import { findUserByEmail } from "@/server/users/repository";

export async function authenticate(login: string, password: string) {
  const user = await findUserByEmail(login);

  if (!user) {
    return null;
  }

  // TODO: thay bằng password hashing thực tế (bcrypt/argon2) trước khi production.
  if (user.password !== password) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}
