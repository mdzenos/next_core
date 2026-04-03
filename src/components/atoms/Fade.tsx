import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type FadeProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  show?: boolean;
};

export default function Fade({ children, show = true, className, ...props }: FadeProps) {
  return (
    <div className={cn('transition-opacity duration-300', show ? 'opacity-100' : 'pointer-events-none opacity-0', className)} {...props}>
      {children}
    </div>
  );
}
