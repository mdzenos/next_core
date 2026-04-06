import type { ReactNode } from 'react';
import { Badge, Text } from '@/components/atoms';
import { cn } from '@/utils/cn';

type KPIHighlightCardProps = {
  title: string;
  value: ReactNode;
  subtitle?: string;
  delta?: string;
  deltaTone?: 'success' | 'danger' | 'muted';
  className?: string;
};

const deltaToneClassMap = {
  success: 'text-(--status-success-text)',
  danger: 'text-(--status-danger-text)',
  muted: 'text-(--text-muted)',
} as const;

export default function KPIHighlightCard({
  title,
  value,
  subtitle,
  delta,
  deltaTone = 'muted',
  className,
}: KPIHighlightCardProps) {
  return (
    <div className={cn('surface-panel space-y-2 p-4', className)}>
      <Text tone="muted" size="sm">
        {title}
      </Text>
      <div className="text-3xl font-bold text-foreground">{value}</div>
      <div className="flex items-center gap-2">
        {delta ? <Badge className={cn('border-(--border-subtle) bg-(--surface)', deltaToneClassMap[deltaTone])}>{delta}</Badge> : null}
        {subtitle ? <Text tone="muted" size="xs">{subtitle}</Text> : null}
      </div>
    </div>
  );
}
