'use client';

import { useEffect, useState } from 'react';
import { getMe } from '@/app/(public)/auth/apiServices';

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        const profile = await getMe();

        if (!profile) {
          setAuthenticated(false);
          return;
        }

        setAuthenticated(true);
      } catch {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  return { loading, authenticated };
}
