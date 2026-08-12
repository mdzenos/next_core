import { requireAuth } from "@/server/auth/guard";

export default async function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireAuth();

  return children;
}
