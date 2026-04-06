import type { ReactNode } from 'react';
import { Badge, ProgressBar, StatusDot, Text } from '@/components/atoms';

type MetricCardProps = {
  label: string;
  value: string;
  description?: string;
  badge?: string;
  progressValue?: number;
  progressMax?: number;
  progressTone?: 'default' | 'success' | 'warning' | 'danger';
  statusLabel?: string;
  statusTone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
  trend?: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export default function MetricCard({
  label,
  value,
  description,
  badge,
  progressValue,
  progressMax,
  progressTone = 'default',
  statusLabel,
  statusTone = 'neutral',
  trend,
  footer,
  className = '',
}: MetricCardProps) {
  return (
    <article className={`surface-card p-5 ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <Text tone="muted" size="sm">
            {label}
          </Text>
          <p className="mt-2 text-3xl font-bold tracking-tight text-Zcolor13">{value}</p>
        </div>

        {badge ? <Badge className="shrink-0">{badge}</Badge> : null}
      </div>

      {description ? (
        <Text tone="muted" size="sm" className="mt-3">
          {description}
        </Text>
      ) : null}
      {trend ? <div className="mt-3">{trend}</div> : null}
      {typeof progressValue === 'number' ? (
        <div className="mt-4">
          <ProgressBar value={progressValue} max={progressMax} tone={progressTone} showValue />
        </div>
      ) : null}
      {statusLabel ? <StatusDot label={statusLabel} tone={statusTone} className="mt-4" /> : null}
      {footer ? <div className="mt-4 border-t border-(--border-subtle) pt-4">{footer}</div> : null}
    </article>
  );
}
