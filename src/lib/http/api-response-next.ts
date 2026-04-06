import { NextResponse } from 'next/server';
import {
  formatErrorResponse,
  formatSuccessResponse,
  formatValidationErrorResponse,
  type ApiErrorOptions,
  type ApiSuccessOptions,
} from '@/lib/http/api-response';

export function successResponse<T>(data: T, options: ApiSuccessOptions = {}) {
  const payload = formatSuccessResponse(data, options);
  return NextResponse.json(payload, { status: payload.status });
}

export function errorResponse<T = string[] | null>(options: ApiErrorOptions<T>) {
  const payload = formatErrorResponse(options);
  return NextResponse.json(payload, { status: payload.status });
}

export function validationErrorResponse(
  errors: string[],
  message?: string,
  status = 422
) {
  const payload = formatValidationErrorResponse(errors, message, status);
  return NextResponse.json(payload, { status: payload.status });
}
