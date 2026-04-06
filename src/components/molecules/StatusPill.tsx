import type { ReactNode } from 'react';
import { Pill, StatusDot } from '@/components/atoms';
import { cn } from '@/utils/cn';

type StatusTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';
type PillTone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger';

type StatusPillProps = {
  label: ReactNode;
  tone?: StatusTone;
  pulse?: boolean;
  emphasis?: PillTone;
  className?: string;
};

const mapToneToPill: Record<StatusTone, PillTone> = {
  neutral: 'neutral',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  info: 'brand',
};

export default function StatusPill({
  label,
  tone = 'neutral',
  pulse = false,
  emphasis,
  className,
}: StatusPillProps) {
  const pillTone = emphasis ?? mapToneToPill[tone];

  return (
    <Pill tone={pillTone} className={cn('inline-flex items-center gap-2', className)}>
      <StatusDot tone={tone} pulse={pulse} />
      <span>{label}</span>
    </Pill>
  );
}
