import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type AspectRatioProps = {
  ratio?: number;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export default function AspectRatio({
  ratio = 16 / 9,
  children,
  className,
  contentClassName,
}: AspectRatioProps) {
  const style = {
    paddingBottom: `${100 / ratio}%`,
  } satisfies CSSProperties;

  return (
    <div className={cn('relative w-full overflow-hidden', className)}>
      <div aria-hidden="true" style={style} />
      <div className={cn('absolute inset-0', contentClassName)}>{children}</div>
    </div>
  );
}
