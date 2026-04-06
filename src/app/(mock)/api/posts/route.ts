import { errorResponse, successResponse } from '@/lib/http/api-response-next';
import { mockGetPosts, MockHttpError } from '@/app/(mock)/be/posts/service';
import { isInternalKeyValid, internalKeyDenied } from '@/app/(mock)/_internal/verify-key';

export async function GET(request: Request) {
  if (!isInternalKeyValid(request)) {
    return internalKeyDenied();
  }

  try {
    const result = mockGetPosts();

    return successResponse(result.data, {
      message: result.message,
      status: result.status,
      actions: result.actions,
    });
  } catch (error) {
    if (error instanceof MockHttpError) {
      return errorResponse({
        message: error.message,
        status: error.status,
        data: error.data,
      });
    }

    return errorResponse({
      message: 'Da xay ra loi khi lay danh sach bai viet',
      status: 500,
      data: ['Da xay ra loi khi lay danh sach bai viet'],
    });
  }
}
