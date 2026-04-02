import { ApiError, ApiTimeoutError, ApiAbortError } from '@/services/api';

export function getApiErrorMessage(
  error: unknown,
  fallback = 'Không thể kết nối tới máy chủ.'
) {
  if (error instanceof ApiTimeoutError) {
    return 'Yêu cầu quá thời gian chờ. Vui lòng thử lại.';
  }

  if (error instanceof ApiAbortError) {
    return 'Yêu cầu đã bị hủy.';
  }

  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}
