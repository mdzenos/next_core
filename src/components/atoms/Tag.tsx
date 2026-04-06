import type { ReactNode } from 'react';
import { atomChipToneClasses } from '@/components/atoms/styles';
import { cn } from '@/utils/cn';

type TagProps = {
  children: ReactNode;
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
};

export default function Tag({ children, removable = false, onRemove, className }: TagProps) {
  return (
    <span className={cn('inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm', atomChipToneClasses.brand, className)}>
      {children}
      {removable ? (
        <button type="button" onClick={onRemove} className="rounded-full text-Zcolor10 transition hover:text-Zcolor13" aria-label="Remove tag">
          x
        </button>
      ) : null}
    </span>
  );
}
