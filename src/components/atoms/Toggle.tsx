'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import Pressable from '@/components/atoms/Pressable';
import { atomButtonBaseClass } from '@/components/atoms/styles';
import { cn } from '@/utils/cn';

type ToggleProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  children: ReactNode;
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
};

export default function Toggle({ children, pressed = false, onPressedChange, className, type = 'button', ...props }: ToggleProps) {
  return (
    <Pressable
      type={type}
      aria-pressed={pressed}
      className={cn(
        atomButtonBaseClass,
        'min-h-11 border px-4 py-2.5 text-sm',
        pressed ? 'border-Zcolor13 bg-linear-to-r from-Zcolor13 to-Zcolor12 text-white shadow-sm' : 'border-[var(--border-subtle)] bg-[var(--surface)] text-Zcolor13 hover:bg-Zcolor1',
        className,
      )}
      onClick={() => onPressedChange?.(!pressed)}
      {...props}
    >
      {children}
    </Pressable>
  );
}
