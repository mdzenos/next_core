import type { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

type DotProps = HTMLAttributes<HTMLSpanElement> & {
  size?: 'sm' | 'md' | 'lg';
};

const sizeClasses = {
  sm: 'h-1.5 w-1.5',
  md: 'h-2.5 w-2.5',
  lg: 'h-3.5 w-3.5',
};

export default function Dot({ size = 'md', className, ...props }: DotProps) {
  return <span className={cn('inline-block rounded-full bg-current', sizeClasses[size], className)} {...props} />;
}
