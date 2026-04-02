import { NextResponse } from 'next/server';
import {
  formatErrorResponse,
  formatSuccessResponse,
  formatValidationErrorResponse,
  type ApiActions,
} from '@/lib/api-response';

type SuccessOptions = {
  message?: string;
  status?: number;
  totalRecord?: number;
  actions?: ApiActions;
};

type ErrorOptions<T> = {
  message: string;
  status?: number;
  data?: T;
  actions?: ApiActions;
};

export function successResponse<T>(data: T, options: SuccessOptions = {}) {
  const payload = formatSuccessResponse(data, options);
  return NextResponse.json(payload, { status: payload.status });
}

export function errorResponse<T = string[] | null>(
  options: ErrorOptions<T>
) {
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
