import { loginUser } from '@/data/api/auth';
import { errorResponse, successResponse } from '@/lib/api-response-next';

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

    const user = await loginUser(email, password);

    if (!user) {
      return errorResponse({
        message: 'Email hoặc mật khẩu không đúng',
        status: 401,
        data: ['Email hoặc mật khẩu không đúng'],
      });
    }

    return successResponse(user, {
      message: 'Đăng nhập thành công',
      status: 200,
      actions: {
        view: true,
      },
    });
  } catch (error) {
    console.error('POST /api/auth/login error:', error);

    return errorResponse({
      message: 'Đã xảy ra lỗi khi đăng nhập',
      status: 500,
      data: ['Đã xảy ra lỗi khi đăng nhập'],
    });
  }
}
