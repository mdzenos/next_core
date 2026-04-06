import { atomStatusFillClasses } from '@/components/atoms/styles';
import { cn } from '@/utils/cn';

type StatusTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

type StatusDotProps = {
  label?: string;
  tone?: StatusTone;
  pulse?: boolean;
  className?: string;
};

const dotClasses: Record<StatusTone, string> = {
  neutral: atomStatusFillClasses.neutral,
  success: atomStatusFillClasses.success,
  warning: atomStatusFillClasses.warning,
  danger: atomStatusFillClasses.danger,
  info: atomStatusFillClasses.info,
};

export default function StatusDot({
  label,
  tone = 'neutral',
  pulse = false,
  className,
}: StatusDotProps) {
  return (
    <span className={cn('inline-flex items-center gap-2 text-sm text-(--text-muted)', className)}>
      <span className={cn('h-2.5 w-2.5 rounded-full', dotClasses[tone], pulse && 'animate-pulse')} aria-hidden="true" />
      {label ? <span>{label}</span> : null}
    </span>
  );
}
