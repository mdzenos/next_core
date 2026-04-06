import type { ReactNode } from 'react';
import { ErrorText, HelperText, Label } from '@/components/atoms';

type FormFieldProps = {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  htmlFor?: string;
  children: ReactNode;
  className?: string;
};

export default function FormField({
  label,
  hint,
  error,
  required = false,
  htmlFor,
  children,
  className = '',
}: FormFieldProps) {
  return (
    <div className={className}>
      {label ? (
        <Label htmlFor={htmlFor} requiredMark={required}>
          {label}
        </Label>
      ) : null}

      {children}

      {error ? <ErrorText>{error}</ErrorText> : null}
      {!error && hint ? <HelperText>{hint}</HelperText> : null}
    </div>
  );
}
