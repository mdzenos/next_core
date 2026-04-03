'use client';

import { useEffect } from 'react';

type ScrollLockProps = {
  locked?: boolean;
};

export default function ScrollLock({ locked = true }: ScrollLockProps) {
  useEffect(() => {
    if (!locked) {
      return;
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);

  return null;
}
