import NextLink from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type LinkProps = ComponentProps<typeof NextLink> & {
  children: ReactNode;
  muted?: boolean;
};

export default function Link({ children, className, muted = false, ...props }: LinkProps) {
  return (
    <NextLink
      className={cn(
        'inline-flex items-center gap-1 text-sm font-semibold transition duration-200 underline-offset-4 hover:underline',
        muted ? 'text-(--text-muted) hover:text-Zcolor10' : 'text-Zcolor13 hover:text-Zcolor10',
        className,
      )}
      {...props}
    >
      {children}
    </NextLink>
  );
}
