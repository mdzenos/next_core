import { redirect } from "next/navigation";
import { getSessionToken } from "@/server/auth/session";

export async function requireAuth() {
  const token = await getSessionToken();

  if (!token) {
    redirect("/auth/login");
  }

  return token;
}
