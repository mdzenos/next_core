import { errorResponse, successResponse } from '@/lib/api-response-next';
import { mockLogin, MockHttpError } from '@/mock/handlers/auth.mock';

const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = mockLogin(body);

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

    if (error instanceof MockHttpError) {
      return errorResponse({
        message: error.message,
        status: error.status,
        data: error.data,
      });
    }

    return errorResponse({
      message: 'Đã xảy ra lỗi khi đăng nhập',
      status: 500,
      data: ['Đã xảy ra lỗi khi đăng nhập'],
    });
  }
}
