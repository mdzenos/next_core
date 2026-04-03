import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type LayerLevel = 'base' | 'dropdown' | 'sticky' | 'overlay' | 'modal' | 'toast';

type LayerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  level?: LayerLevel;
};

const levelClasses: Record<LayerLevel, string> = {
  base: 'z-0',
  dropdown: 'z-20',
  sticky: 'z-30',
  overlay: 'z-40',
  modal: 'z-50',
  toast: 'z-[60]',
};

export default function Layer({ children, level = 'base', className, ...props }: LayerProps) {
  return (
    <div className={cn('relative', levelClasses[level], className)} {...props}>
      {children}
    </div>
  );
}
