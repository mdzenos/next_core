import { cn } from '@/utils/cn';
import { atomStatusFillClasses } from '@/components/atoms/styles';

type ProgressTone = 'default' | 'success' | 'warning' | 'danger';
type ProgressSize = 'sm' | 'md' | 'lg';

type ProgressBarProps = {
  value: number;
  max?: number;
  tone?: ProgressTone;
  size?: ProgressSize;
  showValue?: boolean;
  label?: string;
  className?: string;
};

const toneClasses: Record<ProgressTone, string> = {
  default: 'bg-Zcolor13',
  success: atomStatusFillClasses.success,
  warning: atomStatusFillClasses.warning,
  danger: atomStatusFillClasses.danger,
};

const sizeClasses: Record<ProgressSize, string> = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-3.5',
};

export default function ProgressBar({
  value,
  max = 100,
  tone = 'default',
  size = 'md',
  showValue = false,
  label,
  className = '',
}: ProgressBarProps) {
  const safeMax = max <= 0 ? 100 : max;
  const percentage = Math.max(0, Math.min(100, (value / safeMax) * 100));

  return (
    <div className={className}>
      {label || showValue ? (
        <div className="mb-2 flex items-center justify-between gap-3 text-sm">
          {label ? <span className="font-semibold text-Zcolor14">{label}</span> : <span />}
          {showValue ? <span className="text-(--text-muted)">{Math.round(percentage)}%</span> : null}
        </div>
      ) : null}

      <div className={cn('w-full overflow-hidden rounded-full bg-(--progress-track)', sizeClasses[size])}>
        <div
          className={cn(sizeClasses[size], 'rounded-full transition-all duration-300 shadow-sm', toneClasses[tone])}
          style={{ width: `${percentage}%` }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
