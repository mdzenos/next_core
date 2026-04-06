'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type MeasuredRect = {
  width: number;
  height: number;
};

type MeasureProps = {
  children: (rect: MeasuredRect) => ReactNode;
  className?: string;
};

export default function Measure({ children, className }: MeasureProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<MeasuredRect>({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new window.ResizeObserver(([entry]) => {
      setRect({ width: entry.contentRect.width, height: entry.contentRect.height });
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={className}>{children(rect)}</div>;
}
