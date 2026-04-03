const MOCK_REFRESH_TOKEN_KEY = 'nextjs-core.mock-refresh-token';

let currentRefreshToken: string | null = null;

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function getMockRefreshToken() {
  if (currentRefreshToken) {
    return currentRefreshToken;
  }

  if (!canUseStorage()) {
    return null;
  }

  currentRefreshToken = window.localStorage.getItem(MOCK_REFRESH_TOKEN_KEY);
  return currentRefreshToken;
}

export function setMockRefreshToken(refreshToken: string | null) {
  currentRefreshToken = refreshToken;

  if (!canUseStorage()) {
    return;
  }

  if (refreshToken) {
    window.localStorage.setItem(MOCK_REFRESH_TOKEN_KEY, refreshToken);
    return;
  }

  window.localStorage.removeItem(MOCK_REFRESH_TOKEN_KEY);
}

export function clearMockRefreshToken() {
  setMockRefreshToken(null);
}
