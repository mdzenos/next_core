'use client';

import { useEffect, useState, type ReactNode } from 'react';

type DelayProps = {
  children: ReactNode;
  ms?: number;
  fallback?: ReactNode;
};

export default function Delay({ children, ms = 150, fallback = null }: DelayProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), ms);
    return () => window.clearTimeout(timer);
  }, [ms]);

  return ready ? <>{children}</> : <>{fallback}</>;
}
