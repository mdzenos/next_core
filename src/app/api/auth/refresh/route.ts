import { refreshUserSession } from '@/data/api/auth';
import { errorResponse, successResponse } from '@/lib/api-response-next';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
      return errorResponse({
        message: 'Không tìm thấy refresh token',
        status: 401,
        data: ['Không tìm thấy refresh token'],
      });
    }

    const result = await refreshUserSession(refreshToken);

    if (!result) {
      return errorResponse({
        message: 'Refresh token không hợp lệ hoặc đã hết hạn',
        status: 401,
        data: ['Refresh token không hợp lệ hoặc đã hết hạn'],
      });
    }

    return successResponse(
      {
        user: result.user,
        accessToken: result.accessToken,
        accessTokenExpiresAt: result.accessTokenExpiresAt,
      },
      {
        message: 'Làm mới phiên đăng nhập thành công',
        status: 200,
        actions: {
          view: true,
        },
      }
    );
  } catch (error) {
    console.error('POST /api/auth/refresh error:', error);

    return errorResponse({
      message: 'Đã xảy ra lỗi khi làm mới phiên đăng nhập',
      status: 500,
      data: ['Đã xảy ra lỗi khi làm mới phiên đăng nhập'],
    });
  }
}
