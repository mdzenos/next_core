export const atomSurfaceCardClass = 'surface-card';

export const atomPanelClass = 'surface-panel text-[var(--foreground)]';

export const atomControlBaseClass =
  'w-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--foreground)] shadow-sm transition duration-200 placeholder:text-[var(--text-muted)] focus:border-Zcolor8 focus:bg-[var(--surface)] disabled:cursor-not-allowed disabled:opacity-60';

export const atomControlInvalidClass =
  'border-[var(--status-danger-border)] text-[var(--status-danger-text)] focus:border-[var(--status-danger-solid)]';

export const atomChoiceControlClass =
  'mt-1 h-4 w-4 shrink-0 rounded border-[var(--border-subtle)] bg-[var(--surface)] text-Zcolor13 transition focus:ring-0';

export const atomLabelClass = 'mb-2 block text-sm font-semibold tracking-tight text-Zcolor14';

export const atomHelperTextClass = 'mt-2 text-sm leading-6 text-[var(--text-muted)]';

export const atomErrorTextClass = 'mt-2 text-sm font-medium leading-6 text-[var(--status-danger-text)]';

export const atomButtonBaseClass =
  'inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-50';

export const atomButtonVariantClasses = {
  primary: 'bg-linear-to-r from-Zcolor13 to-Zcolor12 text-white shadow-sm hover:from-Zcolor12 hover:to-Zcolor11',
  secondary: 'surface-muted text-Zcolor14 hover:border-Zcolor5',
  outline: 'border border-[var(--border-subtle)] bg-[var(--surface)] text-Zcolor13 hover:bg-Zcolor1',
} as const;

export const atomButtonSizeClasses = {
  sm: 'min-h-10 px-3.5 text-sm',
  md: 'min-h-11 px-5 text-sm',
  lg: 'min-h-12 px-6 text-base',
} as const;

export const atomIconButtonClass =
  'inline-flex items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-2.5 text-Zcolor13 shadow-sm transition duration-200 hover:bg-Zcolor1 disabled:cursor-not-allowed disabled:opacity-50';

export const atomChipToneClasses = {
  neutral: 'border-[var(--border-subtle)] bg-[var(--surface)] text-[var(--text-muted)]',
  brand: 'border-Zcolor5 bg-Zcolor1 text-Zcolor14',
  success:
    'border-[var(--status-success-border)] bg-[var(--status-success-bg)] text-[var(--status-success-text)]',
  warning:
    'border-[var(--status-warning-border)] bg-[var(--status-warning-bg)] text-[var(--status-warning-text)]',
  danger: 'border-[var(--status-danger-border)] bg-[var(--status-danger-bg)] text-[var(--status-danger-text)]',
} as const;

export const atomFloatingClass =
  'rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-[var(--foreground)] shadow-[var(--shadow-soft)] backdrop-blur-md';

export const atomOverlayClass = 'bg-[var(--overlay)]/70 backdrop-blur-sm';

export const atomTextToneClasses = {
  default: 'text-[var(--foreground)]',
  muted: 'text-[var(--text-muted)]',
  brand: 'text-Zcolor13',
  danger: 'text-[var(--status-danger-text)]',
  success: 'text-[var(--status-success-text)]',
} as const;

export const atomStatusSurfaceClasses = {
  success:
    'border-[var(--status-success-border)] bg-[var(--status-success-bg)] text-[var(--status-success-text)]',
  error: 'border-[var(--status-danger-border)] bg-[var(--status-danger-bg)] text-[var(--status-danger-text)]',
  info: 'border-[var(--status-info-border)] bg-[var(--status-info-bg)] text-[var(--status-info-text)]',
  warning:
    'border-[var(--status-warning-border)] bg-[var(--status-warning-bg)] text-[var(--status-warning-text)]',
} as const;

export const atomStatusFillClasses = {
  neutral: 'bg-[var(--text-muted)]',
  success: 'bg-[var(--status-success-solid)]',
  warning: 'bg-[var(--status-warning-solid)]',
  danger: 'bg-[var(--status-danger-solid)]',
  info: 'bg-[var(--status-info-solid)]',
} as const;

export const atomTextSizeClasses = {
  xs: 'text-xs leading-5',
  sm: 'text-sm leading-6',
  md: 'text-base leading-7',
  lg: 'text-lg leading-7',
} as const;

export const atomHeadingSizeClasses = {
  xs: 'text-sm font-semibold tracking-tight',
  sm: 'text-base font-semibold tracking-tight',
  md: 'text-xl font-bold tracking-tight',
  lg: 'text-2xl font-bold tracking-tight',
  xl: 'text-3xl font-bold tracking-tight text-balance',
  '2xl': 'text-4xl font-bold tracking-tight text-balance',
} as const;
