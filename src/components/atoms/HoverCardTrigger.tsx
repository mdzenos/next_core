'use client';

import { useState, type ReactNode } from 'react';
import Floating from '@/components/atoms/Floating';
import FloatingArrow from '@/components/atoms/FloatingArrow';
import { cn } from '@/utils/cn';

type HoverCardTriggerProps = {
  children: ReactNode;
  content: ReactNode;
  className?: string;
  contentClassName?: string;
};

export default function HoverCardTrigger({ children, content, className, contentClassName }: HoverCardTriggerProps) {
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
        <Floating placement="bottom" className={cn('min-w-64 p-4', contentClassName)}>
          <FloatingArrow placement="bottom" />
          {content}
        </Floating>
      ) : null}
    </span>
  );
}
