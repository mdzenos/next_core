import { registerUser } from '@/data/api/auth';
import {
  errorResponse,
  validationErrorResponse,
  successResponse,
} from '@/lib/api-response-next';

const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const fullName = body?.fullName?.trim();
    const email = body?.email?.trim();
    const password = body?.password;
    const confirmPassword = body?.confirmPassword;

    const errors: string[] = [];

    if (!fullName) {
      errors.push('Chưa nhập tên khách hàng!');
    }

    if (!email) {
      errors.push('Chưa nhập email!');
    }

    if (!password) {
      errors.push('Chưa nhập mật khẩu!');
    }

    if (!confirmPassword) {
      errors.push('Chưa nhập mật khẩu xác nhận!');
    }

    if (password && confirmPassword && password !== confirmPassword) {
      errors.push('Mật khẩu xác nhận không khớp!');
    }

    if (errors.length > 0) {
      return validationErrorResponse(errors, errors[0], 403);
    }

    const result = await registerUser(fullName, email, password);

    const response = successResponse(
      {
        user: result.user,
        accessToken: result.accessToken,
        accessTokenExpiresAt: result.accessTokenExpiresAt,
      },
      {
        message: 'Đăng ký tài khoản thành công',
        status: 201,
        actions: {
          view: true,
          create: true,
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
    console.error('POST /api/auth/register error:', error);

    return errorResponse({
      message: error instanceof Error ? error.message : 'Đã xảy ra lỗi khi đăng ký',
      status: 500,
      data: [error instanceof Error ? error.message : 'Đã xảy ra lỗi khi đăng ký'],
    });
  }
}
