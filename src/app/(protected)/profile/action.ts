'use server';

import { cookies } from 'next/headers';
import { updateProfileService } from './service';
import { ApiError } from '@/lib/http/api-client';
import type { SafeUser, UpdateProfilePayload } from '@/types/auth';

type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; errors?: string[]; status?: number };

export async function updateProfileAction(
  payload: UpdateProfilePayload,
): Promise<ActionResult<{ user: SafeUser }>> {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
      return { success: false, error: 'Bạn chưa đăng nhập', status: 401 };
    }

    const user = await updateProfileService(refreshToken, payload);
    return { success: true, data: { user } };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message,
        errors: Array.isArray((error.data as { data?: unknown })?.data)
          ? ((error.data as { data?: unknown }).data as string[])
          : undefined,
        status: error.status,
      };
    }
    return { success: false, error: 'Đã xảy ra lỗi khi cập nhật thông tin' };
  }
}
