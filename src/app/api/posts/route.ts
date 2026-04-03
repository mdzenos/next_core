import { errorResponse, successResponse } from '@/lib/api-response-next';
import { mockGetPosts, MockHttpError } from '@/mock/handlers/posts.mock';

export async function GET() {
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
