import { loginUser } from '@/data/api/auth';
import { errorResponse, successResponse } from '@/lib/api-response-next';

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

    const result = await loginUser(email, password);

    if (!result) {
      return errorResponse({
        message: 'Email hoặc mật khẩu không đúng',
        status: 401,
        data: ['Email hoặc mật khẩu không đúng'],
      });
    }

    const response = successResponse(
      {
        user: result.user,
        accessToken: result.accessToken,
        accessTokenExpiresAt: result.accessTokenExpiresAt,
      },
      {
        message: 'Đăng nhập thành công',
        status: 200,
        actions: {
          view: true,
        },
      },
    );

    response.cookies.set('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });

    return response;
  } catch (error) {
    console.error('POST /api/auth/login error:', error);

    return errorResponse({
      message: 'Đã xảy ra lỗi khi đăng nhập',
      status: 500,
      data: ['Đã xảy ra lỗi khi đăng nhập'],
    });
  }
}
