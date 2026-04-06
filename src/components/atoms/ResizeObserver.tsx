'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type ResizeObserverProps = {
  children: (size: { width: number; height: number }) => ReactNode;
  className?: string;
};

export default function ResizeObserver({ children, className }: ResizeObserverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new window.ResizeObserver(([entry]) => {
      setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={className}>{children(size)}</div>;
}
