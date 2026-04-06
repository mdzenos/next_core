import type { ReactNode } from 'react';
import Kbd from '@/components/atoms/Kbd';
import { cn } from '@/utils/cn';

type ShortcutProps = {
  keys: ReactNode[];
  className?: string;
};

export default function Shortcut({ keys, className }: ShortcutProps) {
  return (
    <span className={cn('inline-flex items-center gap-1', className)}>
      {keys.map((key, index) => (
        <Kbd key={`${String(key)}-${index}`}>{key}</Kbd>
      ))}
    </span>
  );
}
