type AlertVariant = 'success' | 'error' | 'info' | 'warning';

type AlertProps = {
  message?: string;
  variant?: AlertVariant;
  className?: string;
};

const variantClasses: Record<AlertVariant, string> = {
  success: 'border-green-200 bg-green-50 text-green-700',
  error: 'border-red-200 bg-red-50 text-red-600',
  info: 'border-Zcolor3 bg-Zcolor1 text-Zcolor13',
  warning: 'border-yellow-200 bg-yellow-50 text-yellow-700',
};

export default function Alert({ message, variant = 'info', className = '' }: AlertProps) {
  if (!message) {
    return null;
  }

  return (
    <div
      role="alert"
      className={`rounded-xl border px-4 py-3 text-sm ${variantClasses[variant]} ${className}`}
    >
      {message}
    </div>
  );
}
