export type ApiActions = Partial<{
  view: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
  export: boolean;
  import: boolean;
  approve: boolean;
}>;

export type ApiSuccessResponse<T> = {
  message: string;
  data: T;
  success: true;
  status: number;
  totalRecord: number;
  actions: ApiActions;
};

export type ApiErrorResponse<T = string[] | null> = {
  message: string;
  data: T;
  success: false;
  status: number;
  totalRecord: 0;
  actions: ApiActions;
};

export type ApiSuccessOptions = {
  message?: string;
  status?: number;
  totalRecord?: number;
  actions?: ApiActions;
};

export type ApiErrorOptions<T> = {
  message: string;
  status?: number;
  data?: T;
  actions?: ApiActions;
};

function resolveTotalRecord<T>(data: T, totalRecord?: number) {
  if (typeof totalRecord === 'number') {
    return totalRecord;
  }

  if (Array.isArray(data)) {
    return data.length;
  }

  if (data === null || data === undefined) {
    return 0;
  }

  return 1;
}

export function formatSuccessResponse<T>(data: T, options: ApiSuccessOptions = {}): ApiSuccessResponse<T> {
  const { message = 'Thành công!', status = 200, totalRecord, actions = {} } = options;

  return {
    message,
    data,
    success: true,
    status,
    totalRecord: resolveTotalRecord(data, totalRecord),
    actions,
  };
}

export function formatErrorResponse<T = string[] | null>(
  options: ApiErrorOptions<T>,
): ApiErrorResponse<T> {
  const { message, status = 400, data = null as T, actions = {} } = options;

  return {
    message,
    data,
    success: false,
    status,
    totalRecord: 0,
    actions,
  };
}

export function formatValidationErrorResponse(
  errors: string[],
  message = errors[0] || 'Dữ liệu không hợp lệ!',
  status = 422
): ApiErrorResponse<string[]> {
  return formatErrorResponse<string[]>({
    message,
    status,
    data: errors,
    actions: {},
  });
}
