import type { ReactNode } from 'react';

type ZIndexManagerProps = {
  children: (zIndex: { base: number; overlay: number; modal: number; toast: number }) => ReactNode;
  base?: number;
};

export default function ZIndexManager({ children, base = 0 }: ZIndexManagerProps) {
  return <>{children({ base, overlay: base + 40, modal: base + 50, toast: base + 60 })}</>;
}
