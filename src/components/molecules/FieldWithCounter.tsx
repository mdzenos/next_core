import type { TextareaHTMLAttributes } from 'react';
import { Text, Textarea } from '@/components/atoms';
import { cn } from '@/utils/cn';

type FieldWithCounterProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  value: string;
  onValueChange: (value: string) => void;
  maxLength?: number;
  label?: string;
  hint?: string;
  error?: string;
  wrapperClassName?: string;
};

export default function FieldWithCounter({
  value,
  onValueChange,
  maxLength,
  label,
  hint,
  error,
  className,
  wrapperClassName,
  ...props
}: FieldWithCounterProps) {
  const currentLength = value.length;

  return (
    <div className={cn('space-y-2', wrapperClassName)}>
      <Textarea
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        maxLength={maxLength}
        label={label}
        hint={hint}
        error={error}
        className={className}
        {...props}
      />
      {maxLength ? (
        <div className="flex justify-end">
          <Text size="xs" tone={currentLength > maxLength ? 'danger' : 'muted'}>
            {currentLength}/{maxLength}
          </Text>
        </div>
      ) : null}
    </div>
  );
}
