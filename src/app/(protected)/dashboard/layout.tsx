// src/app/(protected)/dashboard/layout.tsx
import { buildMetadata } from '@/lib/metadata';
import DashboardTemplate from '@/components/templates/DashboardTemplate';

export const metadata = buildMetadata({
  title: 'Dashboard',
  description: 'Trang dashboard của ứng dụng NextJS Core',
});

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardTemplate>{children}</DashboardTemplate>;
}
