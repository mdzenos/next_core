import crypto from 'crypto';

export function generateToken() {
  return crypto.randomUUID() + crypto.randomBytes(16).toString('hex');
}

export function getAccessTokenExpiresAt() {
  return Date.now() + 15 * 60 * 1000;
}

export function getRefreshTokenExpiresAt() {
  return Date.now() + 7 * 24 * 60 * 60 * 1000;
}
