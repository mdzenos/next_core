import type { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

type CaretDirection = 'up' | 'down' | 'left' | 'right';

type CaretProps = HTMLAttributes<HTMLSpanElement> & {
  direction?: CaretDirection;
  size?: number;
};

const rotationClasses: Record<CaretDirection, string> = {
  up: 'rotate-180',
  down: 'rotate-0',
  left: '-rotate-90',
  right: 'rotate-90',
};

export default function Caret({ direction = 'down', size = 10, className, ...props }: CaretProps) {
  return (
    <span
      className={cn('inline-block border-x-transparent border-b-0 border-solid transition', rotationClasses[direction], className)}
      style={{ borderLeftWidth: size / 2, borderRightWidth: size / 2, borderTopWidth: size, borderTopColor: 'currentColor' }}
      {...props}
    />
  );
}
