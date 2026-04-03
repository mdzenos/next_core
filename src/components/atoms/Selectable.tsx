'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { atomSurfaceCardClass } from '@/components/atoms/styles';
import { cn } from '@/utils/cn';

type SelectableProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  children: ReactNode;
  selected?: boolean;
};

export default function Selectable({ children, selected = false, className, type = 'button', ...props }: SelectableProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cn(
        atomSurfaceCardClass,
        'px-4 py-3 text-left text-sm transition duration-200',
        selected ? 'border-Zcolor13 bg-Zcolor1 text-Zcolor13 ring-brand' : 'text-foreground hover:border-Zcolor6',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
