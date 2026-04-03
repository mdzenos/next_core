import { getUserByAccessToken } from '@/data/api/auth';
import { errorResponse, successResponse } from '@/lib/api-response-next';

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
    const user = await getUserByAccessToken(accessToken);

    if (!user) {
      return errorResponse({
        message: 'Phiên đăng nhập không hợp lệ hoặc đã hết hạn',
        status: 401,
        data: ['Phiên đăng nhập không hợp lệ hoặc đã hết hạn'],
      });
    }

    return successResponse(
      { user },
      {
        message: 'Lấy thông tin người dùng thành công',
        status: 200,
        actions: {
          view: true,
        },
      }
    );
  } catch (error) {
    console.error('GET /api/auth/me error:', error);

    return errorResponse({
      message: 'Đã xảy ra lỗi khi lấy thông tin người dùng',
      status: 500,
      data: ['Đã xảy ra lỗi khi lấy thông tin người dùng'],
    });
  }
}
