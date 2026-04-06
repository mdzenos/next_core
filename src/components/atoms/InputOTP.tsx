'use client';

import { useMemo } from 'react';
import { cn } from '@/utils/cn';

type InputOTPProps = {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  inputClassName?: string;
};

export default function InputOTP({ length = 6, value, onChange, className, inputClassName }: InputOTPProps) {
  const items = useMemo(() => Array.from({ length }, (_, index) => value[index] ?? ''), [length, value]);

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {items.map((digit, index) => (
        <input
          key={index}
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(event) => {
            const nextChar = event.target.value.replace(/\D/g, '').slice(-1);
            const chars = value.split('');
            chars[index] = nextChar;
            onChange(chars.join('').slice(0, length));
          }}
          className={cn(
            'h-12 w-12 rounded-xl border border-(--border-subtle) bg-(--surface) text-center text-lg font-semibold text-Zcolor13',
            inputClassName,
          )}
        />
      ))}
    </div>
  );
}
