'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Avatar from '@/components/atoms/Avatar';

type UserMenuProps = {
  fullName?: string;
  email?: string;
  profileHref?: string;
  dashboardHref?: string;
  showDashboardLink?: boolean;
  onLogout: () => Promise<void> | void;
  logoutLabel?: string;
};

export default function UserMenu({
  fullName = 'Người dùng',
  email = '',
  profileHref = '/profile',
  dashboardHref = '/dashboard',
  showDashboardLink = false,
  onLogout,
  logoutLabel = 'Đăng xuất',
}: UserMenuProps) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  async function handleLogoutClick() {
    try {
      setIsLoggingOut(true);
      await onLogout();
      setIsMenuOpen(false);
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
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
          <p className="text-sm font-medium">{fullName}</p>
          {email ? <p className="text-xs text-white/80">{email}</p> : null}
        </div>

        <Avatar name={fullName} />

        <ChevronDownIcon
          className={`h-4 w-4 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isMenuOpen ? (
        <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-60 overflow-hidden rounded-2xl border border-Zcolor3 bg-white shadow-xl">
          <div className="bg-Zcolor12 px-4 py-3 text-white">
            <p className="text-sm font-semibold">{fullName}</p>
            <p className="text-xs text-white/80">{email}</p>
          </div>

          <div className="py-2">
            {showDashboardLink ? (
              <Link
                href={dashboardHref}
                onClick={() => setIsMenuOpen(false)}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-Zcolor1"
              >
                <span className="h-2 w-2 rounded-full bg-Zcolor13" />
                <span>Dashboard</span>
              </Link>
            ) : null}

            <Link
              href={profileHref}
              onClick={() => setIsMenuOpen(false)}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-Zcolor1"
            >
              <UserCircleIcon className="h-5 w-5 text-Zcolor13" />
              <span>Trang cá nhân</span>
            </Link>

            <button
              type="button"
              onClick={handleLogoutClick}
              disabled={isLoggingOut}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              <span>{isLoggingOut ? 'Đang đăng xuất...' : logoutLabel}</span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
