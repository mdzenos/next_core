'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Avatar from '@/components/atoms/Avatar';
import { getCurrentUser } from '@/lib/auth-store';
import { logoutSession } from '@/services/authSessionService';

type PublicTemplateProps = {
  children: React.ReactNode;
};

export default function PublicTemplate({ children }: PublicTemplateProps) {
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [currentUser, setCurrentUser] = useState<ReturnType<typeof getCurrentUser> | null>(null);

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);

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

  const isAuthenticated = !!currentUser;

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const navClass = (href: string) =>
    isActive(href)
      ? 'rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200'
      : 'rounded-full px-4 py-2 text-sm font-medium text-white/90 transition-all duration-200 hover:bg-white/10 hover:text-white';

  async function handleLogout() {
    try {
      setIsLoggingOut(true);
      await logoutSession();
      setIsMenuOpen(false);
      setCurrentUser(null);
      router.replace('/');
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-Zcolor12 via-Zcolor10 to-Zcolor8 text-white">
      <header className="sticky top-0 z-50 border-b border-white/15 bg-white/10 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href={isAuthenticated ? '/dashboard' : '/'}
            className="text-xl font-bold tracking-tight text-Zcolor15 transition-colors duration-200 hover:text-Zcolor3"
          >
            NextJS Core
          </Link>

          {!isAuthenticated ? (
            <nav className="flex items-center gap-2 md:gap-3">
              <Link href="/" className={navClass('/')}>
                Trang chủ
              </Link>
              <Link href="/auth/login" className={navClass('/auth/login')}>
                Đăng nhập
              </Link>
              <Link href="/auth/register" className={navClass('/auth/register')}>
                Đăng ký
              </Link>
            </nav>
          ) : (
            <div className="flex items-center gap-3">
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                  className="flex items-center gap-3 rounded-full px-2 py-1 transition hover:bg-white/10"
                  aria-label="Mở menu tài khoản"
                  aria-expanded={isMenuOpen}
                  aria-haspopup="menu"
                >
                  <div className="hidden text-right sm:block">
                    <p className="text-sm font-medium">{currentUser?.fullName ?? 'Người dùng'}</p>
                    <p className="text-xs text-white/80">{currentUser?.email ?? ''}</p>
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
                      <p className="text-sm font-semibold">
                        {currentUser?.fullName ?? 'Người dùng'}
                      </p>
                      <p className="text-xs text-white/80">{currentUser?.email ?? ''}</p>
                    </div>

                    <div className="py-2">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-Zcolor1"
                      >
                        <span className="h-2 w-2 rounded-full bg-Zcolor13" />
                        <span>Dashboard</span>
                      </Link>

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
          )}
        </div>
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-72px)] w-full max-w-7xl items-center justify-center px-6 py-12 md:px-8">
        {children}
      </main>
    </div>
  );
}
