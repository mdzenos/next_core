import type { InputHTMLAttributes } from 'react';
import { atomChoiceControlClass, atomHelperTextClass } from '@/components/atoms/styles';
import { cn } from '@/utils/cn';

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string;
  description?: string;
  wrapperClassName?: string;
};

export default function Checkbox({ label, description, className, wrapperClassName, id, ...props }: CheckboxProps) {
  return (
    <label htmlFor={id} className={cn('flex items-start gap-3 rounded-2xl p-1 text-left', wrapperClassName)}>
      <input
        id={id}
        type="checkbox"
        className={cn(atomChoiceControlClass, className)}
        {...props}
      />

      <span className="min-w-0">
        <span className="block text-sm font-semibold text-Zcolor14">{label}</span>
        {description ? <span className={cn('mt-1 block', atomHelperTextClass)}>{description}</span> : null}
      </span>
    </label>
  );
}
