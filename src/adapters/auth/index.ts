import { authHttpAdapter } from '@/adapters/auth/auth.http';
import { authMockAdapter } from '@/adapters/auth/auth.mock';

const isMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export const authAdapter = isMock ? authMockAdapter : authHttpAdapter;
