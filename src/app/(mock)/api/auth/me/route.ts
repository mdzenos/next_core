import { errorResponse, successResponse } from '@/lib/http/api-response-next';
import {
  mockGetMe,
  mockGetMeByRefreshToken,
  mockUpdateProfile,
  MockHttpError,
} from '@/app/(mock)/be/auth/service';
import { isInternalKeyValid, internalKeyDenied } from '@/app/(mock)/_internal/verify-key';

function isJsonSyntaxError(error: unknown) {
  return error instanceof SyntaxError;
}

function getAccessTokenFromRequest(request: Request) {
  const authorization = request.headers.get('authorization');

  return authorization?.startsWith('Bearer ') ? authorization.replace('Bearer ', '') : undefined;
}

function getRefreshTokenFromRequest(request: Request) {
  const cookie = request.headers.get('cookie');
  if (!cookie) return undefined;

  const refreshCookie = cookie
    .split(';')
    .map((item) => item.trim())
    .find((item) => item.startsWith('refreshToken='));

  if (!refreshCookie) return undefined;

  const value = refreshCookie.slice('refreshToken='.length);
  return decodeURIComponent(value);
}

export async function GET(request: Request) {
  if (!isInternalKeyValid(request)) {
    return internalKeyDenied();
  }

  try {
    const accessToken = getAccessTokenFromRequest(request);

    if (!accessToken) {
      const refreshToken = getRefreshTokenFromRequest(request);

      if (!refreshToken) {
        throw new MockHttpError(401, 'Ban chua dang nhap');
      }

      const session = mockGetMeByRefreshToken(refreshToken);

      if (!session) {
        throw new MockHttpError(401, 'Token khong hop le hoac da het han');
      }

      return successResponse(
        {
          user: session.user,
          accessToken: session.accessToken,
        },
        {
          message: 'Lay thong tin nguoi dung thanh cong',
          status: 200,
          actions: { view: true },
        },
      );
    }

    const result = mockGetMe(accessToken);

    return successResponse(
      {
        user: result.data.user,
        accessToken,
      },
      {
        message: result.message,
        status: result.status,
        actions: result.actions,
      },
    );
  } catch (error) {
    if (error instanceof MockHttpError) {
      return errorResponse({
        message: error.message,
        status: error.status,
        data: error.data,
      });
    }

    console.error('GET /api/auth/me error:', error);

    return errorResponse({
      message: 'Đã xảy ra lỗi khi lấy thông tin người dùng',
      status: 500,
      data: ['Đã xảy ra lỗi khi lấy thông tin người dùng'],
    });
  }
}

export async function PATCH(request: Request) {
  if (!isInternalKeyValid(request)) {
    return internalKeyDenied();
  }

  try {
    let accessToken = getAccessTokenFromRequest(request);

    if (!accessToken) {
      const refreshToken = getRefreshTokenFromRequest(request);

      if (!refreshToken) {
        throw new MockHttpError(401, 'Ban chua dang nhap');
      }

      const session = mockGetMeByRefreshToken(refreshToken);

      if (!session) {
        throw new MockHttpError(401, 'Token khong hop le hoac da het han');
      }

      accessToken = session.accessToken;
    }

    const body = await request.json();
    const result = mockUpdateProfile(accessToken, body);

    return successResponse(result.data, {
      message: result.message,
      status: result.status,
      actions: result.actions,
    });
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

    console.error('PATCH /api/auth/me error:', error);

    return errorResponse({
      message: 'Da xay ra loi khi cap nhat thong tin nguoi dung',
      status: 500,
      data: ['Da xay ra loi khi cap nhat thong tin nguoi dung'],
    });
  }
}
