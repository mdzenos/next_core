import type { HTMLAttributes, ReactNode } from 'react';
import { atomHelperTextClass } from '@/components/atoms/styles';
import { cn } from '@/utils/cn';

type HelperTextProps = HTMLAttributes<HTMLParagraphElement> & {
  children?: ReactNode;
};

export default function HelperText({ children, className, ...props }: HelperTextProps) {
  if (!children) {
    return null;
  }

  return <p className={cn(atomHelperTextClass, className)} {...props}>{children}</p>;
}
