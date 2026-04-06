import type { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

type FloatingArrowProps = HTMLAttributes<HTMLSpanElement> & {
  placement?: 'top' | 'bottom' | 'left' | 'right';
};

const placementClasses = {
  top: 'bottom-[-6px] left-1/2 -translate-x-1/2 rotate-180',
  bottom: 'top-[-6px] left-1/2 -translate-x-1/2',
  left: 'right-[-6px] top-1/2 -translate-y-1/2 -rotate-90',
  right: 'left-[-6px] top-1/2 -translate-y-1/2 rotate-90',
};

export default function FloatingArrow({ placement = 'bottom', className, ...props }: FloatingArrowProps) {
  return (
    <span
      className={cn(
        'absolute h-3 w-3 rotate-45 border-l border-t border-(--border-subtle) bg-(--surface)',
        placementClasses[placement],
        className,
      )}
      {...props}
    />
  );
}
