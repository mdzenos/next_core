'use client';

import { useEffect, useRef, type ReactNode } from 'react';

type FocusLockProps = {
  children: ReactNode;
  enabled?: boolean;
  className?: string;
};

const selector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function FocusLock({ children, enabled = true, className }: FocusLockProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !ref.current) {
      return;
    }

    const root = ref.current;
    const focusables = Array.from(root.querySelectorAll<HTMLElement>(selector));
    focusables[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') {
        return;
      }

      const items = Array.from(root.querySelectorAll<HTMLElement>(selector));
      if (items.length === 0) {
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      }

      if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    root.addEventListener('keydown', onKeyDown);
    return () => root.removeEventListener('keydown', onKeyDown);
  }, [enabled]);

  return <div ref={ref} className={className}>{children}</div>;
}
