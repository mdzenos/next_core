// src/app/(public)/layout.tsx
// import AuthTemplate from '@/components/templates/AuthTemplate';
import { buildMetadata } from '@/lib/metadata';
import PublicTemplate from '@/components/templates/PublicTemplate';
// import PublicOnlyGuard from '@/components/guards/PublicOnlyGuard';

export const metadata = buildMetadata({
  title: 'Trang chủ',
  description: 'Ứng dụng NextJS Core',
});

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <PublicOnlyGuard>
      <PublicTemplate>{children}</PublicTemplate>
    // </PublicOnlyGuard>
  );
}
