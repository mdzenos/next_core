'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAccessToken } from '@/lib/auth-store';
import { getMe, refreshSession } from '@/services/authSessionService';

type ProtectedGuardProps = {
  children: React.ReactNode;
  redirectTo?: string;
};

export default function ProtectedGuard({
  children,
  redirectTo = '/auth/login',
}: ProtectedGuardProps) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const token = getAccessToken();

        if (token) {
          const me = await getMe();

          if (me) {
            setIsAuthenticated(true);
            return;
          }
        }

        const refreshed = await refreshSession();

        if (refreshed) {
          setIsAuthenticated(true);
          return;
        }

        setIsAuthenticated(false);
        router.replace(redirectTo);
      } catch {
        setIsAuthenticated(false);
        router.replace(redirectTo);
      } finally {
        setIsChecking(false);
      }
    }

    checkAuth();
  }, [redirectTo, router]);

  if (isChecking) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-Zcolor1 text-sm text-Zcolor12">
        Đang kiểm tra phiên đăng nhập...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
