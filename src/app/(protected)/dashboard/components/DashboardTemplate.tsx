'use client';

import { useState } from 'react';
import DashboardFooter from '@/app/(protected)/dashboard/components/DashboardFooter';
import DashboardHeader from '@/app/(protected)/dashboard/components/DashboardHeader';
import DashboardSidebar from '@/app/(protected)/dashboard/components/DashboardSidebar';

type DashboardTemplateProps = Readonly<{
  children: React.ReactNode;
}>;

export default function DashboardTemplate({ children }: DashboardTemplateProps) {
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
        <div className="surface-card p-6">{children}</div>
      </main>

      <footer className="col-span-2">
        <DashboardFooter />
      </footer>
    </div>
  );
}
