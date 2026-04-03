import { errorResponse, successResponse } from '@/lib/api-response-next';
import { ApiError } from '@/services/api';
import { getMeForServer } from '@/services/authSessionService';

export async function GET(request: Request) {
  try {
    const authorization = request.headers.get('authorization');

    if (!authorization?.startsWith('Bearer ')) {
      return errorResponse({
        message: 'Bạn chưa đăng nhập',
        status: 401,
        data: ['Bạn chưa đăng nhập'],
      });
    }

    const accessToken = authorization.replace('Bearer ', '');
    const result = await getMeForServer(accessToken);

    return successResponse(result.data, {
      message: result.message,
      status: result.status,
      actions: result.actions,
    });
  } catch (error) {
    console.error('GET /api/auth/me error:', error);

    if (error instanceof ApiError) {
      return errorResponse({
        message: error.message,
        status: error.status,
        data: Array.isArray(error.data) ? error.data : [error.message],
      });
    }

    return errorResponse({
      message: 'Đã xảy ra lỗi khi lấy thông tin người dùng',
      status: 500,
      data: ['Đã xảy ra lỗi khi lấy thông tin người dùng'],
    });
  }
}
