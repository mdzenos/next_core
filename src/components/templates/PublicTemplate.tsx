'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type PublicTemplateProps = {
  children: React.ReactNode;
};

export default function PublicTemplate({ children }: PublicTemplateProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const navClass = (href: string) =>
    isActive(href)
      ? 'rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200'
      : 'rounded-full px-4 py-2 text-sm font-medium text-white/90 transition-all duration-200 hover:bg-white/10 hover:text-white';

  return (
    <div className="min-h-screen bg-gradient-to-br from-deepBlue3 to-secondary text-white">
      <header className="sticky top-0 z-50 border-b border-white/20 bg-white/10 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-secondary transition-colors duration-200 hover:text-lightBlue"
          >
            NextJS Core
          </Link>

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
        </div>
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-72px)] w-full max-w-7xl items-center justify-center px-6 py-12 md:px-8">
        {children}
      </main>
    </div>
  );
}
