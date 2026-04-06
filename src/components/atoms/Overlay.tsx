import type { HTMLAttributes, ReactNode } from 'react';
import { atomOverlayClass } from '@/components/atoms/styles';
import { cn } from '@/utils/cn';

type OverlayProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  fixed?: boolean;
};

export default function Overlay({ children, fixed = false, className, ...props }: OverlayProps) {
  return <div className={cn(fixed ? 'fixed inset-0 z-50' : 'absolute inset-0', atomOverlayClass, className)} {...props}>{children}</div>;
}
