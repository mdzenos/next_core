import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type StackProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  gap?: '0' | '1' | '2' | '3' | '4' | '5' | '6';
  align?: 'start' | 'center' | 'end' | 'stretch';
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

const alignClasses = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

export default function Stack({ children, gap = '4', align = 'stretch', className, ...props }: StackProps) {
  return (
    <div className={cn('flex flex-col', gapClasses[gap], alignClasses[align], className)} {...props}>
      {children}
    </div>
  );
}
