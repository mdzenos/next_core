import type { InputHTMLAttributes } from 'react';
import {
  atomControlBaseClass,
  atomControlInvalidClass,
  atomErrorTextClass,
  atomHelperTextClass,
} from '@/components/atoms/styles';
import { cn } from '@/utils/cn';

type FileInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  hint?: string;
  error?: string;
};

export default function FileInput({ hint, error, className, ...props }: FileInputProps) {
  return (
    <div>
      <input
        type="file"
        className={cn(
          atomControlBaseClass,
          'file:mr-4 file:rounded-lg file:border-0 file:bg-Zcolor13 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-Zcolor14',
          error && atomControlInvalidClass,
          className,
        )}
        {...props}
      />
      {error ? <p className={atomErrorTextClass}>{error}</p> : null}
      {!error && hint ? <p className={atomHelperTextClass}>{hint}</p> : null}
    </div>
  );
}
