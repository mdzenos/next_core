'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAccessToken } from '@/lib/auth-store';
import { getMe, refreshSession } from '@/services/authSessionService';

type PublicOnlyGuardProps = {
  children: React.ReactNode;
  redirectTo?: string;
};

export default function PublicOnlyGuard({
  children,
  redirectTo = '/dashboard',
}: PublicOnlyGuardProps) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [canView, setCanView] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const token = getAccessToken();

        if (token) {
          const me = await getMe();

          if (me) {
            router.replace(redirectTo);
            return;
          }
        }

        const refreshed = await refreshSession();

        if (refreshed) {
          router.replace(redirectTo);
          return;
        }

        setCanView(true);
      } catch {
        setCanView(true);
      } finally {
        setIsChecking(false);
      }
    }

    checkAuth();
  }, [redirectTo, router]);

  if (isChecking) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-white/80">
        Đang kiểm tra phiên đăng nhập...
      </div>
    );
  }

  if (!canView) {
    return null;
  }

  return <>{children}</>;
}
