import { createUser, findUserById, listUsers } from "@/server/users/repository";

export function getUsers() {
  return listUsers();
}

export function getUser(id: string) {
  return findUserById(id);
}

export function registerUser(data: { email: string; name: string; password: string }) {
  return createUser(data);
}
