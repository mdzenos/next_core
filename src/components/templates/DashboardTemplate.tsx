'use client';

import { useState } from 'react';
import DashboardHeader from '@/components/organisms/DashboardHeader';
import DashboardSidebar from '@/components/organisms/DashboardSidebar';
import DashboardFooter from '@/components/organisms/DashboardFooter';

export default function DashboardTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div
      className={`grid min-h-screen bg-gray-50 transition-all duration-300 ${
        isSidebarCollapsed
          ? 'grid-cols-[88px_1fr] grid-rows-[64px_1fr_56px]'
          : 'grid-cols-[260px_1fr] grid-rows-[64px_1fr_56px]'
      }`}
    >
      <header className="col-span-2">
        <DashboardHeader
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)}
        />
      </header>

      <aside className="border-r bg-white">
        <DashboardSidebar isCollapsed={isSidebarCollapsed} />
      </aside>

      <main className="bg-gray-50 p-6">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          {children}
        </div>
      </main>

      <footer className="col-span-2">
        <DashboardFooter />
      </footer>
    </div>
  );
}
