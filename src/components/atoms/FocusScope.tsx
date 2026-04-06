'use client';

import { useEffect, useRef, type ReactNode } from 'react';

type FocusScopeProps = {
  children: ReactNode;
  autoFocus?: boolean;
  restoreFocus?: boolean;
  className?: string;
};

const selector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function FocusScope({ children, autoFocus = false, restoreFocus = true, className }: FocusScopeProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;

    if (autoFocus && ref.current) {
      ref.current.querySelector<HTMLElement>(selector)?.focus();
    }

    return () => {
      if (restoreFocus) {
        previous?.focus?.();
      }
    };
  }, [autoFocus, restoreFocus]);

  return <div ref={ref} className={className}>{children}</div>;
}
