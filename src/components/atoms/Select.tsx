import type { SelectHTMLAttributes } from 'react';
import Caret from '@/components/atoms/Caret';
import ErrorText from '@/components/atoms/ErrorText';
import HelperText from '@/components/atoms/HelperText';
import Label from '@/components/atoms/Label';
import { atomControlBaseClass, atomControlInvalidClass } from '@/components/atoms/styles';
import { cn } from '@/utils/cn';

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: SelectOption[];
  label?: string;
  hint?: string;
  error?: string;
  placeholder?: string;
  wrapperClassName?: string;
};

export default function Select({ options, label, hint, error, placeholder, className, wrapperClassName, id, ...props }: SelectProps) {
  return (
    <div className={wrapperClassName}>
      {label ? <Label htmlFor={id}>{label}</Label> : null}

      <div className="relative">
        <select
          id={id}
          className={cn(atomControlBaseClass, 'appearance-none pr-11', error && atomControlInvalidClass, className)}
          {...props}
        >
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((option) => (
            <option key={`${option.value}-${option.label}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-Zcolor10">
          <Caret />
        </span>
      </div>

      {error ? <ErrorText>{error}</ErrorText> : null}
      {!error && hint ? <HelperText>{hint}</HelperText> : null}
    </div>
  );
}
