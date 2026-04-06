import ProtectedGuard from '@/app/(public)/auth/guards/ProtectedGuard';

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedGuard>{children}</ProtectedGuard>;
}
