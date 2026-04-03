import type { ReactNode } from 'react';
import { Button, Divider, Heading, Text } from '@/components/atoms';
import { LabeledSwitchRow } from '@/components/molecules';
import { cn } from '@/utils/cn';

type PreferenceItem = {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  helperText?: ReactNode;
};

type PreferenceGroupProps = {
  title: string;
  description?: string;
  items: PreferenceItem[];
  onToggle?: (id: string, checked: boolean) => void;
  onSave?: () => void;
  saveLabel?: string;
  className?: string;
};

export default function PreferenceGroup({
  title,
  description,
  items,
  onToggle,
  onSave,
  saveLabel = 'Save changes',
  className,
}: PreferenceGroupProps) {
  return (
    <section className={cn('surface-panel space-y-4 p-5', className)}>
      <header className="space-y-1">
        <Heading as="h3" size="md">
          {title}
        </Heading>
        {description ? <Text tone="muted">{description}</Text> : null}
      </header>

      <Divider />

      <div className="space-y-3">
        {items.map((item) => (
          <LabeledSwitchRow
            key={item.id}
            id={item.id}
            label={item.label}
            description={item.description}
            checked={item.checked}
            helperText={item.helperText}
            onCheckedChange={onToggle ? (checked) => onToggle(item.id, checked) : undefined}
          />
        ))}
      </div>

      {onSave ? (
        <div className="flex justify-end">
          <Button onClick={onSave}>{saveLabel}</Button>
        </div>
      ) : null}
    </section>
  );
}
