import { errorResponse, successResponse } from '@/lib/api-response-next';
import { mockGetMe, MockHttpError } from '@/mock/handlers/auth.mock';

export async function GET(request: Request) {
  try {
    const authorization = request.headers.get('authorization');
    const accessToken = authorization?.startsWith('Bearer ')
      ? authorization.replace('Bearer ', '')
      : undefined;
    const result = mockGetMe(accessToken);

    return successResponse(result.data, {
      message: result.message,
      status: result.status,
      actions: result.actions,
    });
  } catch (error) {
    console.error('GET /api/auth/me error:', error);

    if (error instanceof MockHttpError) {
      return errorResponse({
        message: error.message,
        status: error.status,
        data: error.data,
      });
    }

    return errorResponse({
      message: 'Đã xảy ra lỗi khi lấy thông tin người dùng',
      status: 500,
      data: ['Đã xảy ra lỗi khi lấy thông tin người dùng'],
    });
  }
}
