'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

type ScrollRestorationProps = {
  storageKey?: string;
};

export default function ScrollRestoration({ storageKey = 'scroll-restoration' }: ScrollRestorationProps) {
  const pathname = usePathname();

  useEffect(() => {
    const key = `${storageKey}:${pathname}`;
    const saved = sessionStorage.getItem(key);
    if (saved) {
      window.scrollTo({ top: Number(saved) || 0, behavior: 'auto' });
    }

    const save = () => sessionStorage.setItem(key, String(window.scrollY));
    window.addEventListener('beforeunload', save);

    return () => {
      save();
      window.removeEventListener('beforeunload', save);
    };
  }, [pathname, storageKey]);

  return null;
}
