'use client';

import { useRef, type HTMLAttributes, type ReactNode } from 'react';

type PanProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  onPan?: (offset: { x: number; y: number }) => void;
};

export default function Pan({ children, onPan, ...props }: PanProps) {
  const originRef = useRef<{ x: number; y: number } | null>(null);

  return (
    <div
      onPointerDown={(event) => {
        originRef.current = { x: event.clientX, y: event.clientY };
      }}
      onPointerMove={(event) => {
        if (!originRef.current) {
          return;
        }

        onPan?.({ x: event.clientX - originRef.current.x, y: event.clientY - originRef.current.y });
      }}
      onPointerUp={() => {
        originRef.current = null;
      }}
      onPointerLeave={() => {
        originRef.current = null;
      }}
      {...props}
    >
      {children}
    </div>
  );
}
