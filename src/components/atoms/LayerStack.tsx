import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type LayerStackProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  gap?: '0' | '1' | '2' | '3' | '4';
};

const gapClasses = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
};

export default function LayerStack({ children, gap = '2', className, ...props }: LayerStackProps) {
  return (
    <div className={cn('relative flex flex-col', gapClasses[gap], className)} {...props}>
      {children}
    </div>
  );
}
