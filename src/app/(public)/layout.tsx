// src/app/(public)/layout.tsx
import type { Metadata } from 'next';
// import AuthTemplate from '@/components/templates/AuthTemplate';
import PublicTemplate from '@/components/templates/PublicTemplate';

export const metadata: Metadata = {
  title: 'Trang chủ',
  description: 'Trang chủ của ứng dụng NextJS Social Dashboard',
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PublicTemplate>{children}</PublicTemplate>;
}
