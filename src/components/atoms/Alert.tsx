import { cn } from '@/utils/cn';
import { atomStatusSurfaceClasses } from '@/components/atoms/styles';

type AlertVariant = 'success' | 'error' | 'info' | 'warning';

type AlertProps = {
  message?: string;
  variant?: AlertVariant;
  className?: string;
};

const variantClasses: Record<AlertVariant, string> = atomStatusSurfaceClasses;

export default function Alert({ message, variant = 'info', className }: AlertProps) {
  if (!message) {
    return null;
  }

  return (
    <div
      role="alert"
      className={cn(
        'rounded-2xl border px-4 py-3 text-sm font-medium shadow-sm',
        variantClasses[variant],
        className,
      )}
    >
      {message}
    </div>
  );
}
