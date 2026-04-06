import type { ReactNode } from 'react';
import { HelperText, Label, Switch, Text } from '@/components/atoms';
import { cn } from '@/utils/cn';

type LabeledSwitchRowProps = {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  helperText?: ReactNode;
  className?: string;
};

export default function LabeledSwitchRow({
  id,
  label,
  description,
  checked,
  onCheckedChange,
  helperText,
  className,
}: LabeledSwitchRowProps) {
  return (
    <div className={cn('surface-card space-y-2 p-4', className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <Label htmlFor={id} className="mb-1">
            {label}
          </Label>
          {description ? <Text tone="muted" size="sm">{description}</Text> : null}
        </div>
        <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
      </div>
      {helperText ? <HelperText className="mt-0">{helperText}</HelperText> : null}
    </div>
  );
}
