'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';

const PortalGroupContext = createContext<HTMLElement | null>(null);

type PortalGroupProps = {
  children: ReactNode;
  container?: HTMLElement | null;
};

export function usePortalGroupContainer() {
  return useContext(PortalGroupContext);
}

export default function PortalGroup({ children, container = null }: PortalGroupProps) {
  const value = useMemo(() => container, [container]);
  return <PortalGroupContext.Provider value={value}>{children}</PortalGroupContext.Provider>;
}
