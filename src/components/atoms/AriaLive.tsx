import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type AriaLiveProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  politeness?: 'polite' | 'assertive' | 'off';
  atomic?: boolean;
  visuallyHidden?: boolean;
};

export default function AriaLive({
  children,
  politeness = 'polite',
  atomic = true,
  visuallyHidden = true,
  className,
  ...props
}: AriaLiveProps) {
  return (
    <div
      aria-live={politeness}
      aria-atomic={atomic}
      className={cn(visuallyHidden && 'sr-only', className)}
      {...props}
    >
      {children}
    </div>
  );
}
