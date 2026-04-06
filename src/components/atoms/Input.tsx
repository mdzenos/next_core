import type { InputHTMLAttributes } from 'react';
import ErrorText from '@/components/atoms/ErrorText';
import HelperText from '@/components/atoms/HelperText';
import Label from '@/components/atoms/Label';
import { atomControlBaseClass, atomControlInvalidClass } from '@/components/atoms/styles';
import { cn } from '@/utils/cn';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
  wrapperClassName?: string;
};

export default function Input({ label, hint, error, className, wrapperClassName, id, ...props }: InputProps) {
  return (
    <div className={wrapperClassName}>
      {label ? <Label htmlFor={id}>{label}</Label> : null}

      <input
        id={id}
        className={cn(atomControlBaseClass, error && atomControlInvalidClass, className)}
        {...props}
      />

      {error ? <ErrorText>{error}</ErrorText> : null}
      {!error && hint ? <HelperText>{hint}</HelperText> : null}
    </div>
  );
}
