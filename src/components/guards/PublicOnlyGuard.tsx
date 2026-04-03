'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import GuardLoading from '@/components/guards/GuardLoading';
import { checkAuthenticatedSession } from '@/lib/check-auth-session';

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
    let isMounted = true;

    async function checkAuth() {
      try {
        const authenticated = await checkAuthenticatedSession();

        if (!isMounted) return;

        if (authenticated) {
          router.replace(redirectTo);
          return;
        }

        setCanView(true);
      } catch {
        if (!isMounted) return;
        setCanView(true);
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
    return <GuardLoading textClassName="text-white/80" />;
  }

  if (!canView) {
    return null;
  }

  return <>{children}</>;
}
