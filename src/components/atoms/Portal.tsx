'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  children: ReactNode;
  container?: HTMLElement | null;
};

export default function Portal({ children, container }: PortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(children, container ?? document.body);
}
