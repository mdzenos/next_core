import type { LabelHTMLAttributes, ReactNode } from 'react';
import { atomLabelClass } from '@/components/atoms/styles';
import { cn } from '@/utils/cn';

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children: ReactNode;
  requiredMark?: boolean;
};

export default function Label({ children, requiredMark = false, className, ...props }: LabelProps) {
  return (
    <label className={cn(atomLabelClass, className)} {...props}>
      {children}
      {requiredMark ? <span className="ml-1 text-(--status-danger-text)">*</span> : null}
    </label>
  );
}
