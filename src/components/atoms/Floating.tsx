import type { HTMLAttributes, ReactNode } from 'react';
import { atomFloatingClass } from '@/components/atoms/styles';
import { cn } from '@/utils/cn';

type FloatingPlacement = 'top' | 'bottom' | 'left' | 'right';

type FloatingProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  placement?: FloatingPlacement;
  offset?: number;
};

const placementClasses: Record<FloatingPlacement, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2',
  bottom: 'top-full left-1/2 -translate-x-1/2',
  left: 'right-full top-1/2 -translate-y-1/2',
  right: 'left-full top-1/2 -translate-y-1/2',
};

export default function Floating({ children, placement = 'bottom', offset = 8, className, style, ...props }: FloatingProps) {
  const spacingStyle =
    placement === 'top'
      ? { marginBottom: offset }
      : placement === 'bottom'
        ? { marginTop: offset }
        : placement === 'left'
          ? { marginRight: offset }
          : { marginLeft: offset };

  return (
    <div className={cn('absolute z-50', placementClasses[placement], atomFloatingClass, className)} style={{ ...spacingStyle, ...style }} {...props}>
      {children}
    </div>
  );
}
