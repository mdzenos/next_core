import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type ScrollShadowProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  axis?: 'x' | 'y';
};

export default function ScrollShadow({ children, axis = 'y', className, ...props }: ScrollShadowProps) {
  return (
    <div className={cn(axis === 'y' ? 'mask-fade-bottom' : 'mask-fade-x', className)} {...props}>
      {children}
    </div>
  );
}
