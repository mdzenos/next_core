import type { ReactNode } from 'react';
import { Badge, Text } from '@/components/atoms';
import { cn } from '@/utils/cn';

type TrendDirection = 'up' | 'down' | 'flat';

type MetricWithTrendProps = {
  label: string;
  value: ReactNode;
  trendText?: string;
  trendDirection?: TrendDirection;
  className?: string;
};

const trendClassMap: Record<TrendDirection, string> = {
  up: 'text-(--status-success-text)',
  down: 'text-(--status-danger-text)',
  flat: 'text-(--text-muted)',
};

export default function MetricWithTrend({
  label,
  value,
  trendText,
  trendDirection = 'flat',
  className,
}: MetricWithTrendProps) {
  return (
    <div className={cn('surface-card space-y-2 p-4', className)}>
      <Text tone="muted" size="sm">
        {label}
      </Text>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      {trendText ? (
        <Badge className={cn('border-(--border-subtle) bg-(--surface) text-xs', trendClassMap[trendDirection])}>
          {trendText}
        </Badge>
      ) : null}
    </div>
  );
}
