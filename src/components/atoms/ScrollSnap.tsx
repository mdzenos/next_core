import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type ScrollSnapProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  axis?: 'x' | 'y';
  strictness?: 'mandatory' | 'proximity';
};

export default function ScrollSnap({ children, axis = 'x', strictness = 'proximity', className, ...props }: ScrollSnapProps) {
  return (
    <div
      className={cn(
        axis === 'x' ? 'overflow-x-auto overflow-y-hidden' : 'overflow-y-auto overflow-x-hidden',
        axis === 'x' ? 'snap-x' : 'snap-y',
        strictness === 'mandatory' ? 'snap-mandatory' : 'snap-proximity',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
