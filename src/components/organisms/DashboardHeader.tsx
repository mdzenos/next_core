'use client';

import {
  Bars3Icon,
  BellIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import Avatar from '@/components/atoms/Avatar';

type DashboardHeaderProps = {
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
};

export default function DashboardHeader({
  isSidebarCollapsed,
  onToggleSidebar,
}: DashboardHeaderProps) {
  return (
    <div className="flex h-16 items-center justify-between border-b bg-primary px-6 text-white shadow-sm">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="rounded-lg p-2 transition hover:bg-white/10"
          aria-label={isSidebarCollapsed ? 'Mở rộng sidebar' : 'Thu gọn sidebar'}
          title={isSidebarCollapsed ? 'Mở rộng sidebar' : 'Thu gọn sidebar'}
        >
          <Bars3Icon className="h-6 w-6" />
        </button>

        <div>
          <h1 className="text-lg font-semibold">NextJS Core</h1>
          <p className="text-xs text-white/80">
            Social Dashboard / Mini Social Media Platform
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="rounded-full p-2 transition hover:bg-white/10"
          aria-label="Search"
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>

        <button
          type="button"
          className="rounded-full p-2 transition hover:bg-white/10"
          aria-label="Notifications"
        >
          <BellIcon className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-white/80">admin@nextjscore.dev</p>
          </div>
          <Avatar name="Admin User" />
        </div>
      </div>
    </div>
  );
}
