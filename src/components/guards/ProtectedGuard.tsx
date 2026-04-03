'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import GuardLoading from '@/components/guards/GuardLoading';
import { checkAuthenticatedSession } from '@/lib/check-auth-session';

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
    let isMounted = true;

    async function checkAuth() {
      try {
        const authenticated = await checkAuthenticatedSession();

        if (!isMounted) return;

        if (authenticated) {
          setIsAuthenticated(true);
          return;
        }

        setIsAuthenticated(false);
        router.replace(redirectTo);
      } catch {
        if (!isMounted) return;
        setIsAuthenticated(false);
        router.replace(redirectTo);
      } finally {
        if (isMounted) {
          setIsChecking(false);
        }
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [redirectTo, router]);

  if (isChecking) {
    return <GuardLoading className="bg-Zcolor1" textClassName="text-Zcolor12" />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
