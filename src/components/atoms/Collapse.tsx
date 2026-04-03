'use client';

import { useId, useState, type ReactNode } from 'react';
import { atomSurfaceCardClass } from '@/components/atoms/styles';
import { cn } from '@/utils/cn';
import Caret from '@/components/atoms/Caret';

type CollapseProps = {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
  contentClassName?: string;
};

export default function Collapse({ title, children, defaultOpen = false, className, contentClassName }: CollapseProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <div className={cn(atomSurfaceCardClass, className)}>
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-Zcolor13"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{title}</span>
        <Caret direction="down" className={cn('text-Zcolor10', open && 'rotate-180')} />
      </button>
      <div id={contentId} hidden={!open} className={cn('px-4 pb-4 text-sm text-(--text-muted)', contentClassName)}>
        {children}
      </div>
    </div>
  );
}
