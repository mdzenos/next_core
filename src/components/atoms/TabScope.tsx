'use client';

import type { HTMLAttributes, ReactNode } from 'react';
import RovingFocus from '@/components/atoms/RovingFocus';

type TabScopeProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export default function TabScope({ children, ...props }: TabScopeProps) {
  return (
    <RovingFocus orientation="horizontal" {...props}>
      {children}
    </RovingFocus>
  );
}
