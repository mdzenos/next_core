'use client';

import { useRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import Pressable from '@/components/atoms/Pressable';

type LongPressProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  children: ReactNode;
  duration?: number;
  onLongPress?: () => void;
};

export default function LongPress({ children, duration = 500, onLongPress, ...props }: LongPressProps) {
  const timerRef = useRef<number | null>(null);

  const start = () => {
    timerRef.current = window.setTimeout(() => onLongPress?.(), duration);
  };

  const clear = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <Pressable onMouseDown={start} onMouseUp={clear} onMouseLeave={clear} onTouchStart={start} onTouchEnd={clear} {...props}>
      {children}
    </Pressable>
  );
}
