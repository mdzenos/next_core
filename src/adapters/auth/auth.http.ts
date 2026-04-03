import type { AuthAdapter } from '@/types/auth';

export const authHttpAdapter: AuthAdapter = {
  async login(_payload, _options) {
    throw new Error('Not implemented');
  },

  async register(_payload, _options) {
    throw new Error('Not implemented');
  },

  async refreshSession(_refreshToken, _options) {
    throw new Error('Not implemented');
  },

  async getMe(_accessToken, _options) {
    throw new Error('Not implemented');
  },

  async logout(_refreshToken, _options) {
    throw new Error('Not implemented');
  },
};
