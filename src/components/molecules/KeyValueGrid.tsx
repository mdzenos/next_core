import type { ReactNode } from 'react';
import { Divider, Text } from '@/components/atoms';
import { cn } from '@/utils/cn';

type KeyValueItem = {
  key: string;
  label: ReactNode;
  value: ReactNode;
};

type KeyValueGridProps = {
  items: KeyValueItem[];
  columns?: 1 | 2;
  dense?: boolean;
  className?: string;
};

export default function KeyValueGrid({
  items,
  columns = 2,
  dense = false,
  className,
}: KeyValueGridProps) {
  return (
    <div className={cn('surface-card p-4', className)}>
      <div className={cn('grid gap-3', columns === 2 ? 'md:grid-cols-2' : 'grid-cols-1')}>
        {items.map((item, index) => (
          <div key={item.key} className={cn('space-y-1', !dense && 'py-1')}>
            <Text tone="muted" size="xs">
              {item.label}
            </Text>
            <Text className="font-semibold">{item.value}</Text>
            {index < items.length - 1 && columns === 1 ? <Divider className="pt-2" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
