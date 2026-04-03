'use client';

import { useEffect, useState, type ReactNode } from 'react';

type PresenceProps = {
  children: ReactNode;
  present?: boolean;
  exitDelay?: number;
};

export default function Presence({ children, present = true, exitDelay = 160 }: PresenceProps) {
  const [mounted, setMounted] = useState(present);

  useEffect(() => {
    if (present) {
      setMounted(true);
      return;
    }

    const timer = window.setTimeout(() => setMounted(false), exitDelay);
    return () => window.clearTimeout(timer);
  }, [present, exitDelay]);

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}
