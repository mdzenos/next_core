import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

type PresenceGroupProps = {
  children: ReactNode;
  className?: string;
};

export default function PresenceGroup({ children, className }: PresenceGroupProps) {
  return <div className={cn('contents', className)}>{children}</div>;
}
