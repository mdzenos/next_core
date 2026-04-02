import { registerUser } from '@/data/api/auth';
import {
  errorResponse,
  validationErrorResponse,
  successResponse,
} from '@/lib/api-response-next';

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

    const user = await registerUser(fullName, email, password);

    return successResponse(user, {
      message: 'Đăng ký tài khoản thành công',
      status: 201,
      actions: {
        view: true,
        create: true,
      },
    });
  } catch (error) {
    console.error('POST /api/auth/register error:', error);

    return errorResponse({
      message: 'Đã xảy ra lỗi khi đăng ký',
      status: 500,
      data: ['Đã xảy ra lỗi khi đăng ký'],
    });
  }
}
