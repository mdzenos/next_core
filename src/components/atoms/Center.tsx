import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type CenterProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  inline?: boolean;
};

export default function Center({ children, inline = false, className, ...props }: CenterProps) {
  return (
    <div
      className={cn(inline ? 'inline-flex items-center justify-center' : 'flex items-center justify-center', className)}
      {...props}
    >
      {children}
    </div>
  );
}
