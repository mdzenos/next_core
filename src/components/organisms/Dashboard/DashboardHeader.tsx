'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Bars3Icon, BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import IconButton from '@/components/atoms/IconButton';
import UserMenu from '@/components/molecules/UserMenu';
import { getCurrentUser } from '@/lib/auth-store';
import { logoutSession } from '@/services/authSessionService';

type DashboardHeaderProps = {
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
};

export default function DashboardHeader({
  isSidebarCollapsed,
  onToggleSidebar,
}: DashboardHeaderProps) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());

  async function handleLogout() {
    await logoutSession();
    setCurrentUser(null);
    router.replace('/auth/login');
    router.refresh();
  }

  return (
    <div className="flex h-16 items-center justify-between border-b border-white/15 bg-gradient-to-r from-Zcolor12 via-Zcolor10 to-Zcolor8 px-6 text-white shadow-sm">
      <div className="flex items-center gap-4">
        <IconButton
          onClick={onToggleSidebar}
          label={isSidebarCollapsed ? 'Mở rộng sidebar' : 'Thu gọn sidebar'}
          className="rounded-lg p-2 transition hover:bg-white/10"
        >
          <Bars3Icon className="h-6 w-6" />
        </IconButton>

        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-Zcolor15 transition-colors duration-200 hover:text-Zcolor3"
        >
          <h1>NextJS Core</h1>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <IconButton label="Search" className="rounded-full p-2 transition hover:bg-white/10">
          <MagnifyingGlassIcon className="h-5 w-5" />
        </IconButton>

        <IconButton label="Notifications" className="rounded-full p-2 transition hover:bg-white/10">
          <BellIcon className="h-5 w-5" />
        </IconButton>

        <UserMenu
          fullName={currentUser?.fullName ?? 'Người dùng'}
          // email={currentUser?.email ?? ''}
          onLogout={handleLogout}
        />
      </div>
    </div>
  );
}
