'use client';

import { useRef, type HTMLAttributes, type ReactNode } from 'react';

type DragProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  onDragMove?: (position: { x: number; y: number }) => void;
};

export default function Drag({ children, onDragMove, ...props }: DragProps) {
  const activeRef = useRef(false);

  return (
    <div
      draggable
      onDragStart={() => {
        activeRef.current = true;
      }}
      onDrag={(event) => {
        if (!activeRef.current) {
          return;
        }

        onDragMove?.({ x: event.clientX, y: event.clientY });
      }}
      onDragEnd={() => {
        activeRef.current = false;
      }}
      {...props}
    >
      {children}
    </div>
  );
}
