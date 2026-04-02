// src/app/dashboard/layout.tsx
import { ReactNode } from 'react';
import Sidebar from '@/components/molecules/Sidebar';
import Navbar from '@/components/molecules/Navbar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
