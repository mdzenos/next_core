// src/app/(public)/layout.tsx
import { buildMetadata } from '@/lib/metadata';
import PublicTemplate from '@/app/(public)/components/PublicTemplate';

export const metadata = buildMetadata({
  title: 'Trang chủ',
  description: 'Ứng dụng NextJS Core',
});

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PublicTemplate>{children}</PublicTemplate>;
}
