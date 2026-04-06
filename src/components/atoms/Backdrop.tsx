import type { HTMLAttributes } from 'react';
import { atomOverlayClass } from '@/components/atoms/styles';
import { cn } from '@/utils/cn';

type BackdropProps = HTMLAttributes<HTMLDivElement> & {
  blur?: boolean;
};

export default function Backdrop({ blur = true, className, ...props }: BackdropProps) {
  return <div className={cn('fixed inset-0', atomOverlayClass, !blur && 'backdrop-blur-none', className)} {...props} />;
}
