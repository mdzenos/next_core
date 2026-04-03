'use client';

import { useEffect, useState } from 'react';
import { refreshSession } from '@/services/authSessionService';

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        const refreshed = await refreshSession();

        if (!refreshed) {
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
