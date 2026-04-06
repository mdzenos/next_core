// src/app/(mock)/api/auth/login/route.ts
import { errorResponse, successResponse } from '@/lib/http/api-response-next';
import { mockLogin, MockHttpError } from '@/app/(mock)/be/auth/service';
import { isInternalKeyValid, internalKeyDenied } from '@/app/(mock)/_internal/verify-key';

const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60;

function isJsonSyntaxError(error: unknown) {
  return error instanceof SyntaxError;
}

export async function POST(request: Request) {
  if (!isInternalKeyValid(request)) {
    return internalKeyDenied();
  }

  try {
    const body = await request.json();
    const result = mockLogin(body);

    const response = successResponse(
      {
        user: result.data.user,
        accessToken: result.data.accessToken,
        accessTokenExpiresAt: result.data.accessTokenExpiresAt,
        refreshToken: result.data.refreshToken,
      },
      {
        message: result.message,
        status: result.status,
        actions: result.actions,
      },
    );

    response.cookies.set('refreshToken', result.data.refreshToken, {
      httpOnly: true,
      secure: process.env.APP_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });

    return response;
  } catch (error) {
    if (error instanceof MockHttpError) {
      return errorResponse({
        message: error.message,
        status: error.status,
        data: error.data,
      });
    }

    if (isJsonSyntaxError(error)) {
      return errorResponse({
        message: 'Du lieu gui len khong phai JSON hop le',
        status: 400,
        data: ['Du lieu gui len khong phai JSON hop le'],
      });
    }

    console.error('POST /api/auth/login error:', error);

    return errorResponse({
      message: 'Đã xảy ra lỗi khi đăng nhập',
      status: 500,
      data: ['Đã xảy ra lỗi khi đăng nhập'],
    });
  }
}
