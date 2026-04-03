import { errorResponse } from '@/lib/api-response-next';

export async function POST() {
  return errorResponse({
    message: 'Refresh endpoint is not enabled in this mock architecture',
    status: 501,
    data: ['Refresh endpoint is not enabled in this mock architecture'],
  });
}
