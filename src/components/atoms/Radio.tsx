import type { InputHTMLAttributes } from 'react';
import { atomChoiceControlClass, atomHelperTextClass } from '@/components/atoms/styles';
import { cn } from '@/utils/cn';

type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string;
  description?: string;
};

export default function Radio({ label, description, className, id, ...props }: RadioProps) {
  return (
    <label htmlFor={id} className="flex items-start gap-3 rounded-2xl p-1 text-left">
      <input id={id} type="radio" className={cn(atomChoiceControlClass, 'rounded-full', className)} {...props} />
      <span>
        <span className="block text-sm font-semibold text-Zcolor14">{label}</span>
        {description ? <span className={cn('mt-1 block', atomHelperTextClass)}>{description}</span> : null}
      </span>
    </label>
  );
}
