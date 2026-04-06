import type { HTMLAttributes, ReactNode } from 'react';
import { atomErrorTextClass } from '@/components/atoms/styles';
import { cn } from '@/utils/cn';

type ErrorTextProps = HTMLAttributes<HTMLParagraphElement> & {
  children?: ReactNode;
};

export default function ErrorText({ children, className, ...props }: ErrorTextProps) {
  if (!children) {
    return null;
  }

  return (
    <p className={cn(atomErrorTextClass, className)} role="alert" {...props}>
      {children}
    </p>
  );
}
