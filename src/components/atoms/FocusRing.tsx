import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type FocusRingProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  inset?: boolean;
};

export default function FocusRing({ children, inset = false, className, ...props }: FocusRingProps) {
  return (
    <div className={cn('rounded-[inherit] transition-shadow focus-within:ring-brand', inset && 'ring-inset', className)} {...props}>
      {children}
    </div>
  );
}
