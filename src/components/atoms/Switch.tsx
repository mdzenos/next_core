'use client';

import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

type SwitchProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> & {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

export default function Switch({ checked, onCheckedChange, className, type = 'button', ...props }: SwitchProps) {
  return (
    <button
      type={type}
      role="switch"
      aria-checked={checked}
      className={cn(
        'relative inline-flex h-7 w-12 items-center rounded-full border border-(--border-subtle) shadow-sm transition duration-200',
        checked ? 'bg-linear-to-r from-Zcolor13 to-Zcolor12' : 'bg-(--surface-muted)',
        className,
      )}
      onClick={() => onCheckedChange?.(!checked)}
      {...props}
    >
      <span
        className={cn(
          'inline-block h-5 w-5 rounded-full bg-(--surface) shadow transition duration-200',
          checked ? 'translate-x-6' : 'translate-x-1',
        )}
      />
    </button>
  );
}
