
// src/app/(public)/auth/guards/ProtectedGuard.tsx
'use client';

import GuardLoading from './GuardLoading';
import { useSessionGate } from './useSessionGate';

type ProtectedGuardProps = {
  children: React.ReactNode;
  redirectTo?: string;
};

export default function ProtectedGuard({
  children,
  redirectTo = '/auth/login',
}: ProtectedGuardProps) {
  const { isChecking, canRender } = useSessionGate({
    redirectTo,
    allowAuthenticated: true,
  });

  if (isChecking) {
    return <GuardLoading className="bg-Zcolor1" textClassName="text-Zcolor12" />;
  }

  if (!canRender) {
    return null;
  }

  return <>{children}</>;
}
