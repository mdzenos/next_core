import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type FlexProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  direction?: 'row' | 'col';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  gap?: '0' | '1' | '2' | '3' | '4' | '5' | '6';
  wrap?: boolean;
};

const directionClasses = {
  row: 'flex-row',
  col: 'flex-col',
};

const alignClasses = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const justifyClasses = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
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

export default function Flex({
  children,
  direction = 'row',
  align = 'stretch',
  justify = 'start',
  gap = '0',
  wrap = false,
  className,
  ...props
}: FlexProps) {
  return (
    <div
      className={cn(
        'flex',
        directionClasses[direction],
        alignClasses[align],
        justifyClasses[justify],
        gapClasses[gap],
        wrap && 'flex-wrap',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
