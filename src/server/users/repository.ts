import { db } from "@/server/db/client";

export function findUserByEmail(email: string) {
  return db.user.findUnique({ where: { email } });
}

export function findUserById(id: string) {
  return db.user.findUnique({ where: { id } });
}

export function createUser(data: { email: string; name: string; password: string }) {
  return db.user.create({ data });
}

export function listUsers() {
  return db.user.findMany({
    select: { id: true, email: true, name: true, createdAt: true, updatedAt: true },
    orderBy: { createdAt: "desc" },
  });
}
