import type { ElementType, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type BoxProps<T extends ElementType = 'div'> = {
  as?: T;
  children?: ReactNode;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

export default function Box<T extends ElementType = 'div'>({
  as,
  children,
  className,
  ...props
}: BoxProps<T>) {
  const Component = as ?? 'div';

  return (
    <Component className={cn(className)} {...props}>
      {children}
    </Component>
  );
}
