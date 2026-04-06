import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type AutoPlacementProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  preferred?: 'top' | 'bottom' | 'left' | 'right';
  fallback?: 'top' | 'bottom' | 'left' | 'right';
};

const placementClasses = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

export default function AutoPlacement({ children, preferred = 'bottom', fallback = 'top', className, ...props }: AutoPlacementProps) {
  const placement = preferred ?? fallback;

  return (
    <div className={cn('absolute z-50', placementClasses[placement], className)} {...props}>
      {children}
    </div>
  );
}
