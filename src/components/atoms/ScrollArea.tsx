import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type ScrollAreaProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  axis?: 'x' | 'y' | 'both';
  maxHeight?: string;
};

const axisClasses = {
  x: 'overflow-x-auto overflow-y-hidden',
  y: 'overflow-y-auto overflow-x-hidden',
  both: 'overflow-auto',
};

export default function ScrollArea({ children, axis = 'y', maxHeight, className, style, ...props }: ScrollAreaProps) {
  return (
    <div className={cn(axisClasses[axis], className)} style={{ maxHeight, ...style }} {...props}>
      {children}
    </div>
  );
}
