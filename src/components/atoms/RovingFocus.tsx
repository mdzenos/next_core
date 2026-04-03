'use client';

import { useRef, type HTMLAttributes, type ReactNode } from 'react';

type RovingFocusProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  selector?: string;
  orientation?: 'horizontal' | 'vertical';
};

const defaultSelector = '[data-roving-focus-item="true"]';

export default function RovingFocus({
  children,
  selector = defaultSelector,
  orientation = 'horizontal',
  onKeyDown,
  ...props
}: RovingFocusProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented || !ref.current) {
          return;
        }

        const isNextKey = orientation === 'horizontal' ? event.key === 'ArrowRight' : event.key === 'ArrowDown';
        const isPreviousKey = orientation === 'horizontal' ? event.key === 'ArrowLeft' : event.key === 'ArrowUp';

        if (!isNextKey && !isPreviousKey) {
          return;
        }

        const items = Array.from(ref.current.querySelectorAll<HTMLElement>(selector));
        const currentIndex = items.findIndex((item) => item === document.activeElement);
        if (currentIndex === -1 || items.length === 0) {
          return;
        }

        event.preventDefault();
        const nextIndex = isNextKey
          ? (currentIndex + 1) % items.length
          : (currentIndex - 1 + items.length) % items.length;

        items[nextIndex]?.focus();
      }}
      {...props}
    >
      {children}
    </div>
  );
}
