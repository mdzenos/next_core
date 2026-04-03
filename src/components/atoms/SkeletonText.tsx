import type { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

type SkeletonTextProps = HTMLAttributes<HTMLDivElement> & {
  lines?: number;
};

export default function SkeletonText({ lines = 3, className, ...props }: SkeletonTextProps) {
  return (
    <div className={cn('space-y-2', className)} {...props}>
      {Array.from({ length: lines }, (_, index) => (
        <div
          key={index}
          className={cn('animate-pulse rounded-lg bg-(--progress-track)', index === lines - 1 ? 'h-4 w-3/4' : 'h-4 w-full')}
        />
      ))}
    </div>
  );
}
