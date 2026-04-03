import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type GridProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: '0' | '1' | '2' | '3' | '4' | '5' | '6';
};

const colsClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  12: 'grid-cols-12',
};

const gapClasses = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
};

export default function Grid({ children, cols = 1, gap = '4', className, ...props }: GridProps) {
  return (
    <div className={cn('grid', colsClasses[cols], gapClasses[gap], className)} {...props}>
      {children}
    </div>
  );
}
