'use client';

import { useEffect, useState } from 'react';
import { getProfile } from '@/lib/auth-api';
import { refreshAccessToken } from '@/lib/api-client';

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        const refreshed = await refreshAccessToken();

        if (!refreshed) {
          setAuthenticated(false);
          return;
        }

        await getProfile();
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
