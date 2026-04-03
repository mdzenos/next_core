import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  size?: ContainerSize;
};

const sizeClasses: Record<ContainerSize, string> = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-none',
};

export default function Container({ children, size = 'xl', className, ...props }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizeClasses[size], className)} {...props}>
      {children}
    </div>
  );
}
