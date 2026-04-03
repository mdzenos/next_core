'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { checkAuthenticatedSession } from '@/lib/check-auth-session';

type UseSessionGateParams = {
  redirectTo: string;
  allowAuthenticated: boolean;
};

type UseSessionGateResult = {
  isChecking: boolean;
  canRender: boolean;
};

export function useSessionGate({
  redirectTo,
  allowAuthenticated,
}: UseSessionGateParams): UseSessionGateResult {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function validateSession() {
      try {
        const authenticated = await checkAuthenticatedSession();

        if (!isMounted) {
          return;
        }

        if (authenticated === allowAuthenticated) {
          setCanRender(true);
          return;
        }

        setCanRender(false);
        router.replace(redirectTo);
      } catch {
        if (!isMounted) {
          return;
        }

        if (allowAuthenticated) {
          setCanRender(false);
          router.replace(redirectTo);
          return;
        }

        setCanRender(true);
      } finally {
        if (isMounted) {
          setIsChecking(false);
        }
      }
    }

    validateSession();

    return () => {
      isMounted = false;
    };
  }, [allowAuthenticated, redirectTo, router]);

  return {
    isChecking,
    canRender,
  };
}
