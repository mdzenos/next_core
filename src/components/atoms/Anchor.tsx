import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  underline?: boolean;
};

export default function Anchor({ children, underline = true, className, ...props }: AnchorProps) {
  return (
    <a
      className={cn(
        'inline-flex items-center gap-1 text-sm font-medium text-Zcolor13 transition hover:text-Zcolor10',
        underline && 'underline underline-offset-4 decoration-Zcolor5 hover:decoration-Zcolor10',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
