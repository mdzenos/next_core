import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import ErrorText from '@/components/atoms/ErrorText';
import HelperText from '@/components/atoms/HelperText';
import Label from '@/components/atoms/Label';

type FieldProps = HTMLAttributes<HTMLDivElement> & {
  label?: ReactNode;
  helperText?: ReactNode;
  errorText?: ReactNode;
  requiredMark?: boolean;
  htmlFor?: string;
  children: ReactNode;
};

export default function Field({
  label,
  helperText,
  errorText,
  requiredMark = false,
  htmlFor,
  children,
  className,
  ...props
}: FieldProps) {
  return (
    <div className={cn('w-full', className)} {...props}>
      {label ? <Label htmlFor={htmlFor} requiredMark={requiredMark}>{label}</Label> : null}
      {children}
      {!errorText && helperText ? <HelperText>{helperText}</HelperText> : null}
      {errorText ? <ErrorText>{errorText}</ErrorText> : null}
    </div>
  );
}
