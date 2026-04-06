import { errorResponse } from '@/lib/http/api-response-next';

export function isInternalKeyValid(request: Request): boolean {
  const key = process.env.MOCK_INTERNAL_KEY;
  if (!key) return false;
  return request.headers.get('x-internal-key') === key;
}

export function internalKeyDenied() {
  return errorResponse({ message: 'Forbidden: internal API only', status: 403 });
}
