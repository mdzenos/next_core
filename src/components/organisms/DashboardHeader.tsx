'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Avatar from '@/components/atoms/Avatar';
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
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<ReturnType<typeof getCurrentUser> | null>(null);

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);

  async function handleLogout() {
    try {
      setIsLoggingOut(true);
      await logoutSession();
      setIsMenuOpen(false);
      setCurrentUser(null);
      router.replace('/auth/login');
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div className="flex h-16 items-center justify-between border-b border-white/15 bg-gradient-to-r from-Zcolor12 via-Zcolor10 to-Zcolor8 px-6 text-white shadow-sm">
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

        <Link href="/" className="block rounded-lg px-1 py-1 transition hover:bg-white/10">
          <h1 className="text-xl font-bold text-Zcolor15 tracking-tight transition-colors duration-200 hover:text-Zcolor3">
            NextJS Core
          </h1>
        </Link>
      </div>

      <div className="flex items-center gap-3">
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

        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex items-center gap-3 rounded-full px-2 py-1 transition hover:bg-white/10"
            aria-label="Mở menu tài khoản"
            aria-expanded={isMenuOpen}
            aria-haspopup="menu"
          >
            <div className="text-right">
              <p className="text-sm font-medium">{currentUser?.fullName ?? 'Người dùng'}</p>
              {/* <p className="text-xs text-white/80">{currentUser?.email ?? ''}</p> */}
            </div>

            <Avatar name={currentUser?.fullName ?? 'Người dùng'} />

            <ChevronDownIcon
              className={`h-4 w-4 transition-transform duration-200 ${
                isMenuOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isMenuOpen ? (
            <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-60 overflow-hidden rounded-2xl border border-Zcolor3 bg-white shadow-xl">
              <div className="bg-Zcolor12 px-4 py-3 text-white">
                <p className="text-sm font-semibold">{currentUser?.fullName ?? 'Người dùng'}</p>
                <p className="text-xs text-white/80">{currentUser?.email ?? ''}</p>
              </div>

              <div className="py-2">
                <Link
                  href="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-Zcolor1"
                >
                  <UserCircleIcon className="h-5 w-5 text-Zcolor13" />
                  <span>Trang cá nhân</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  <span>{isLoggingOut ? 'Đang đăng xuất...' : 'Đăng xuất'}</span>
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
