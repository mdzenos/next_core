import { errorResponse, successResponse } from '@/lib/api-response-next';
import { ApiError } from '@/services/api';
import { loginForServer } from '@/services/authService';

const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = body?.email?.trim();
    const password = body?.password;

    if (!email || !password) {
      return errorResponse({
        message: 'Email và mật khẩu là bắt buộc',
        status: 400,
        data: ['Email và mật khẩu là bắt buộc'],
      });
    }

    const result = await loginForServer({ email, password });

    const response = successResponse(
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

    response.cookies.set('refreshToken', result.data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });

    return response;
  } catch (error) {
    console.error('POST /api/auth/login error:', error);

    if (error instanceof ApiError) {
      return errorResponse({
        message: error.message,
        status: error.status,
        data: Array.isArray(error.data) ? error.data : [error.message],
      });
    }

    return errorResponse({
      message: 'Đã xảy ra lỗi khi đăng nhập',
      status: 500,
      data: ['Đã xảy ra lỗi khi đăng nhập'],
    });
  }
}
