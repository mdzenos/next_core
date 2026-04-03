import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

type KbdProps = {
  children: ReactNode;
  className?: string;
};

export default function Kbd({ children, className }: KbdProps) {
  return (
    <kbd
      className={cn(
        'inline-flex min-h-7 min-w-7 items-center justify-center rounded-xl border border-(--border-subtle) bg-(--surface) px-2.5 text-xs font-semibold text-(--text-muted) shadow-sm',
        className,
      )}
    >
      {children}
    </kbd>
  );
}
