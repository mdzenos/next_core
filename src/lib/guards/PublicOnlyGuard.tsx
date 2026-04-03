'use client';

import GuardLoading from '@/lib/guards/GuardLoading';
import { useSessionGate } from '@/lib/guards/useSessionGate';

type PublicOnlyGuardProps = {
  children: React.ReactNode;
  redirectTo?: string;
};

export default function PublicOnlyGuard({
  children,
  redirectTo = '/dashboard',
}: PublicOnlyGuardProps) {
  const { isChecking, canRender } = useSessionGate({
    redirectTo,
    allowAuthenticated: false,
  });

  if (isChecking) {
    return <GuardLoading textClassName="text-white/80" />;
  }

  if (!canRender) {
    return null;
  }

  return <>{children}</>;
}
