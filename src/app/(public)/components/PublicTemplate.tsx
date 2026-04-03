'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { UserMenu } from '@/components/molecules';
import { getCurrentUser } from '@/lib/auth-store';
import { logoutSession } from '@/services/authSessionService';

type PublicTemplateProps = {
  children: React.ReactNode;
};

export default function PublicTemplate({ children }: PublicTemplateProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());

  const isAuthenticated = !!currentUser;

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  function navClass(href: string) {
    return isActive(href)
      ? 'rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200'
      : 'rounded-full px-4 py-2 text-sm font-medium text-white/90 transition-all duration-200 hover:bg-white/10 hover:text-white';
  }

  async function handleLogout() {
    await logoutSession();
    setCurrentUser(null);
    router.replace('/');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-Zcolor13 via-Zcolor10 to-Zcolor7 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-linear-to-r from-Zcolor12/50 via-Zcolor10/45 to-Zcolor8/50 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl">
        <div className="app-shell flex items-center justify-between py-4">
          <Link
            href={isAuthenticated ? '/dashboard' : '/'}
            className="text-xl font-bold tracking-tight text-Zcolor15 transition-colors duration-200 hover:text-Zcolor3"
          >
            <h1>NextJS Core</h1>
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
                userInfoClassName="hidden text-right sm:block"
              />
            </div>
          )}
        </div>
      </header>

      <main className="app-shell flex min-h-[calc(100vh-72px)] items-center justify-center py-12">
        {children}
      </main>
    </div>
  );
}
