'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth-store';
import { logoutSession } from '@/services/authSessionService';
import { useState } from 'react';
import UserMenu from '@/components/molecules/UserMenu';

type PublicTemplateProps = {
  children: React.ReactNode;
};

export default function PublicTemplate({ children }: PublicTemplateProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());

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
    await logoutSession();
    setCurrentUser(null);
    router.replace('/');
    router.refresh();
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
              <UserMenu
                fullName={currentUser?.fullName ?? 'Người dùng'}
                email={currentUser?.email ?? ''}
                profileHref="/profile"
                dashboardHref="/dashboard"
                showDashboardLink
                onLogout={handleLogout}
              />
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
