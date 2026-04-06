'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { checkSessionAction } from '../action';
import { clearAuth, getAccessToken, getCurrentUser, setAuth } from '../state';

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

    const cachedAccessToken = getAccessToken();
    const cachedUser = getCurrentUser();

    if (cachedAccessToken && cachedUser) {
      if (allowAuthenticated) {
        setCanRender(true);
        setIsChecking(false);
      } else {
        setCanRender(false);
        setIsChecking(false);
        router.replace(redirectTo);
      }
    }

    async function validateSession() {
      try {
        const result = await checkSessionAction();

        if (!isMounted) return;

        const authenticated = result.success;

        if (result.success) {
          setAuth(result.data.accessToken, result.data.user);
        } else {
          clearAuth();
        }

        if (authenticated === allowAuthenticated) {
          setCanRender(true);
          return;
        }

        setCanRender(false);
        router.replace(redirectTo);
      } catch {
        if (!isMounted) return;

        clearAuth();

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

  return { isChecking, canRender };
}
