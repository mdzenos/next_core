import type { ReactNode } from 'react';
import { Center } from '@/components/atoms';
import { cn } from '@/utils/cn';

type ImageFallbackProps = {
  children?: ReactNode;
  className?: string;
};

export default function ImageFallback({ children = 'No image', className }: ImageFallbackProps) {
  return <Center className={cn('h-full w-full bg-(--surface-muted) text-sm font-medium text-(--text-muted)', className)}>{children}</Center>;
}
