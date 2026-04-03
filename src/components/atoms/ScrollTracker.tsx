'use client';

import { useEffect, useState, type ReactNode } from 'react';

type ScrollTrackerProps = {
  children: (scroll: { x: number; y: number }) => ReactNode;
};

export default function ScrollTracker({ children }: ScrollTrackerProps) {
  const [scroll, setScroll] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const update = () => setScroll({ x: window.scrollX, y: window.scrollY });
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return <>{children(scroll)}</>;
}
