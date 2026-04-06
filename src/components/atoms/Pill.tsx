import type { ReactNode } from 'react';
import { atomChipToneClasses } from '@/components/atoms/styles';
import { cn } from '@/utils/cn';

type PillTone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger';

type PillProps = {
  children: ReactNode;
  tone?: PillTone;
  active?: boolean;
  className?: string;
};

export default function Pill({ children, tone = 'neutral', active = false, className }: PillProps) {
  return (
    <span
      className={cn('inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold transition duration-200', atomChipToneClasses[tone], active && 'ring-brand', className)}
    >
      {children}
    </span>
  );
}
