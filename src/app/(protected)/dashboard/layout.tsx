// src/app/dashboard/layout.tsx
import type { Metadata } from 'next';
import DashboardTemplate from '@/components/templates/DashboardTemplate';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Khu vực dashboard của ứng dụng NextJS Core',
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardTemplate>{children}</DashboardTemplate>;
}
