'use client';

import { useState, type ReactNode } from 'react';
import FloatingArrow from '@/components/atoms/FloatingArrow';
import { cn } from '@/utils/cn';

type TooltipProps = {
  content: ReactNode;
  children: ReactNode;
  className?: string;
};

export default function Tooltip({ content, children, className }: TooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <span
      className={cn('relative inline-flex', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      {open ? (
        <span className="absolute bottom-full left-1/2 z-50 mb-3 -translate-x-1/2">
          <span className="relative inline-flex rounded-xl bg-Zcolor15 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
            <FloatingArrow placement="top" className="border-Zcolor15 bg-Zcolor15" />
            {content}
          </span>
        </span>
      ) : null}
    </span>
  );
}
