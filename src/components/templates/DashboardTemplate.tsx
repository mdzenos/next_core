'use client';

import { useState } from 'react';
import DashboardFooter from '@/components/organisms/DashboardFooter';
import DashboardHeader from '@/components/organisms/DashboardHeader';
import DashboardSidebar from '@/components/organisms/DashboardSidebar';

export default function DashboardTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div
      className={`grid min-h-screen bg-Zcolor1 transition-all duration-300 ${
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

      <aside className="border-r border-Zcolor3 bg-white">
        <DashboardSidebar isCollapsed={isSidebarCollapsed} />
      </aside>

      <main className="bg-Zcolor1 p-6">
        <div className="rounded-2xl border border-Zcolor3 bg-white p-6 shadow-sm">{children}</div>
      </main>

      <footer className="col-span-2">
        <DashboardFooter />
      </footer>
    </div>
  );
}
