import type { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

type AnnouncerProps = HTMLAttributes<HTMLDivElement> & {
  message?: string;
  politeness?: 'polite' | 'assertive' | 'off';
};

export default function Announcer({ message, politeness = 'polite', className, ...props }: AnnouncerProps) {
  return (
    <div className={cn('sr-only', className)} aria-live={politeness} aria-atomic="true" {...props}>
      {message}
    </div>
  );
}
