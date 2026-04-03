import { errorResponse, successResponse } from '@/lib/api-response-next';
import { ApiError } from '@/services/api';
import { refreshSessionForServer } from '@/services/authSessionService';
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

    const result = await refreshSessionForServer(refreshToken);

    return successResponse(
      {
        user: result.data.user,
        accessToken: result.data.accessToken,
        accessTokenExpiresAt: result.data.accessTokenExpiresAt,
      },
      {
        message: result.message,
        status: result.status,
        actions: result.actions,
      },
    );
  } catch (error) {
    console.error('POST /api/auth/refresh error:', error);

    if (error instanceof ApiError) {
      return errorResponse({
        message: error.message,
        status: error.status,
        data: Array.isArray(error.data) ? error.data : [error.message],
      });
    }

    return errorResponse({
      message: 'Đã xảy ra lỗi khi làm mới phiên đăng nhập',
      status: 500,
      data: ['Đã xảy ra lỗi khi làm mới phiên đăng nhập'],
    });
  }
}
