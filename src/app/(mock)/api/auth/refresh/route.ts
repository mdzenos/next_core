import { errorResponse } from '@/lib/http/api-response-next';
import { mockRefreshSession, MockHttpError } from '@/app/(mock)/be/auth/service';
import { isInternalKeyValid, internalKeyDenied } from '@/app/(mock)/_internal/verify-key';

export async function POST(request: Request) {
  if (!isInternalKeyValid(request)) {
    return internalKeyDenied();
  }

  try {
    mockRefreshSession();
  } catch (error) {
    if (error instanceof MockHttpError) {
      return errorResponse({
        message: error.message,
        status: error.status,
        data: error.data,
      });
    }

    return errorResponse({
      message: 'Refresh endpoint is not available',
      status: 500,
      data: ['Refresh endpoint is not available'],
    });
  }
}
