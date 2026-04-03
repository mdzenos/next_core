'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import FloatingArrow from '@/components/atoms/FloatingArrow';
import Portal from '@/components/atoms/Portal';
import { atomFloatingClass } from '@/components/atoms/styles';
import { cn } from '@/utils/cn';

type PopoverProps = {
  trigger: ReactNode;
  content: ReactNode;
  className?: string;
  contentClassName?: string;
};

export default function Popover({ trigger, content, className, contentClassName }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleOutside);
    }

    return () => document.removeEventListener('mousedown', handleOutside);
  }, [open]);

  return (
    <div ref={ref} className={cn('relative inline-flex', className)}>
      <button type="button" className="contents" onClick={() => setOpen((current) => !current)}>
        {trigger}
      </button>
      {open ? (
        <Portal>
          <div className={cn('absolute left-0 top-full z-50 mt-3 min-w-56', contentClassName)}>
            <div className={cn(atomFloatingClass, 'relative rounded-2xl p-3')}>
              <FloatingArrow placement="bottom" />
              {content}
            </div>
          </div>
        </Portal>
      ) : null}
    </div>
  );
}
