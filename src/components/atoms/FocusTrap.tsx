'use client';

import type { ReactNode } from 'react';
import FocusLock from '@/components/atoms/FocusLock';

type FocusTrapProps = {
  children: ReactNode;
  enabled?: boolean;
  className?: string;
};

export default function FocusTrap({ children, enabled = true, className }: FocusTrapProps) {
  return (
    <FocusLock enabled={enabled} className={className}>
      {children}
    </FocusLock>
  );
}
