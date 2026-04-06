import type { TextareaHTMLAttributes } from 'react';
import ErrorText from '@/components/atoms/ErrorText';
import HelperText from '@/components/atoms/HelperText';
import Label from '@/components/atoms/Label';
import { atomControlBaseClass, atomControlInvalidClass } from '@/components/atoms/styles';
import { cn } from '@/utils/cn';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  hint?: string;
  error?: string;
  wrapperClassName?: string;
};

export default function Textarea({ label, hint, error, className, wrapperClassName, id, rows = 5, ...props }: TextareaProps) {
  return (
    <div className={wrapperClassName}>
      {label ? <Label htmlFor={id}>{label}</Label> : null}

      <textarea
        id={id}
        rows={rows}
        className={cn(atomControlBaseClass, 'min-h-32 resize-y', error && atomControlInvalidClass, className)}
        {...props}
      />

      {error ? <ErrorText>{error}</ErrorText> : null}
      {!error && hint ? <HelperText>{hint}</HelperText> : null}
    </div>
  );
}
