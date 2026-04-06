// src/lib/http/api-client.ts
export type HttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS';

export type Primitive = string | number | boolean;

export type QueryValue =
  | Primitive
  | null
  | undefined
  | Primitive[]
  | readonly Primitive[];

export type ResponseType = 'json' | 'text' | 'blob' | 'arrayBuffer' | 'void';

export type QueryArrayFormat = 'repeat' | 'brackets' | 'comma';

export type ApiErrorPayload = {
  message?: string;
  [key: string]: unknown;
};

export type RequestBody =
  | BodyInit
  | FormData
  | URLSearchParams
  | Record<string, unknown>
  | unknown[]
  | string
  | null
  | undefined;

export type ApiRequestOptions = {
  method?: HttpMethod;
  headers?: HeadersInit;
  body?: RequestBody;
  query?: Record<string, QueryValue>;
  signal?: AbortSignal;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  mode?: RequestMode;
  redirect?: RequestRedirect;
  referrerPolicy?: ReferrerPolicy;
  keepalive?: boolean;
  next?: NextFetchRequestConfig;
  responseType?: ResponseType;
  timeoutMs?: number;
  token?: string;
  methodOverride?: Exclude<HttpMethod, 'GET' | 'HEAD' | 'OPTIONS'>;
  retry?: number;
  retryDelayMs?: number;
  retryOnStatuses?: number[];
  idempotencyKey?: string;
};

export type RequestContext = {
  url: string;
  init: RequestInit;
  options: ApiRequestOptions;
};

export type ResponseContext = {
  url: string;
  init: RequestInit;
  options: ApiRequestOptions;
  response: Response;
};

export type ErrorContext = {
  url: string;
  init: RequestInit;
  options: ApiRequestOptions;
  error: unknown;
};

export type BeforeRequestHook =
  | ((context: RequestContext) => RequestContext | Promise<RequestContext>)
  | undefined;

export type AfterResponseHook =
  | ((context: ResponseContext) => Response | Promise<Response>)
  | undefined;

export type OnErrorHook =
  | ((context: ErrorContext) => void | Promise<void>)
  | undefined;

export type ApiClientConfig = {
  baseUrl?: string;
  defaultHeaders?: HeadersInit;
  getAccessToken?: () => string | null | undefined;
  defaultTimeoutMs?: number;
  defaultRetry?: number;
  defaultRetryDelayMs?: number;
  retryOnStatuses?: number[];
  queryArrayFormat?: QueryArrayFormat;
  onRequest?: BeforeRequestHook;
  onResponse?: AfterResponseHook;
  onError?: OnErrorHook;
};

export class ApiError extends Error {
  status: number;
  data: unknown;
  response: Response;

  constructor(message: string, response: Response, data: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = response.status;
    this.data = data;
    this.response = response;
  }
}

export class ApiTimeoutError extends Error {
  constructor(message = 'Request timeout') {
    super(message);
    this.name = 'ApiTimeoutError';
  }
}

export class ApiAbortError extends Error {
  constructor(message = 'Request was aborted') {
    super(message);
    this.name = 'ApiAbortError';
  }
}

function isFormData(value: unknown): value is FormData {
  return typeof FormData !== 'undefined' && value instanceof FormData;
}

function isURLSearchParams(value: unknown): value is URLSearchParams {
  return typeof URLSearchParams !== 'undefined' && value instanceof URLSearchParams;
}

function isBlobLike(value: unknown): value is Blob {
  return typeof Blob !== 'undefined' && value instanceof Blob;
}

function isArrayBufferLike(value: unknown): value is ArrayBuffer {
  return typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Object.prototype.toString.call(value) === '[object Object]';
}

function mergeHeaders(...sources: (HeadersInit | undefined)[]) {
  const result = new Headers();

  sources.forEach((source) => {
    const headers = new Headers(source);
    headers.forEach((value, key) => {
      result.set(key, value);
    });
  });

  if (!result.has('Accept')) {
    result.set('Accept', 'application/json, text/plain, */*');
  }

  return result;
}

function buildQueryString(
  query?: Record<string, QueryValue>,
  arrayFormat: QueryArrayFormat = 'repeat'
) {
  if (!query) {
    return '';
  }

  const searchParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    if (Array.isArray(value)) {
      if (arrayFormat === 'comma') {
        searchParams.set(key, value.map(String).join(','));
        return;
      }

      value.forEach((item) => {
        const targetKey = arrayFormat === 'brackets' ? `${key}[]` : key;
        searchParams.append(targetKey, String(item));
      });
      return;
    }

    searchParams.set(key, String(value));
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

function joinUrl(baseUrl: string | undefined, url: string) {
  const rawBase = (baseUrl ?? '').trim();
  const rawUrl = (url ?? '').trim();

  const normalizedBase = rawBase.replace(/\/+$/, '');

  if (!rawUrl) {
    return normalizedBase;
  }

  // Nếu url đã là endpoint đầy đủ hoặc protocol-relative thì giữ nguyên
  if (/^(?:[a-z][a-z\d+\-.]*:)?\/\//i.test(rawUrl)) {
    return rawUrl;
  }

  // Nếu chỉ là query hoặc hash
  if (rawUrl.startsWith('?') || rawUrl.startsWith('#')) {
    return normalizedBase ? `${normalizedBase}${rawUrl}` : rawUrl;
  }

  // Tách path khỏi query/hash để chỉ chuẩn hóa phần path
  const match = rawUrl.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/);
  const pathPart = match?.[1] ?? '';
  const queryPart = match?.[2] ?? '';
  const hashPart = match?.[3] ?? '';

  const normalizedPath = pathPart
    .replace(/\/{2,}/g, '/')
    .replace(/^\/+/, '');

  if (!normalizedBase) {
    const leadingSlash = pathPart.startsWith('/') ? '/' : '';
    return `${leadingSlash}${normalizedPath}${queryPart}${hashPart}` || '/';
  }

  if (!normalizedPath) {
    return `${normalizedBase}${queryPart}${hashPart}`;
  }

  return `${normalizedBase}/${normalizedPath}${queryPart}${hashPart}`;
}

function buildBodyAndHeaders(
  body: RequestBody,
  headers: Headers
): BodyInit | undefined {
  if (body === undefined || body === null) {
    return undefined;
  }

  if (isFormData(body)) {
    return body;
  }

  if (isURLSearchParams(body)) {
    if (!headers.has('Content-Type')) {
      headers.set(
        'Content-Type',
        'application/x-www-form-urlencoded;charset=UTF-8'
      );
    }
    return body;
  }

  if (typeof body === 'string') {
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'text/plain;charset=UTF-8');
    }
    return body;
  }

  if (isBlobLike(body)) {
    return body;
  }

  if (isArrayBufferLike(body)) {
    return body as unknown as BodyInit;
  }

  if (isPlainObject(body) || Array.isArray(body)) {
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
    return JSON.stringify(body);
  }

  return body as BodyInit;
}

async function safeReadText(response: Response) {
  try {
    return await response.text();
  } catch {
    return '';
  }
}

async function parseResponseByType<T>(
  response: Response,
  responseType: ResponseType
): Promise<T> {
  if (responseType === 'void' || response.status === 204) {
    return undefined as T;
  }

  const contentLength = response.headers.get('content-length');
  if (contentLength === '0') {
    return undefined as T;
  }

  if (responseType === 'text') {
    return (await response.text()) as T;
  }

  if (responseType === 'blob') {
    return (await response.blob()) as T;
  }

  if (responseType === 'arrayBuffer') {
    return (await response.arrayBuffer()) as T;
  }

  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');

  if (responseType === 'json' || isJson) {
    const text = await safeReadText(response);

    if (!text.trim()) {
      return undefined as T;
    }

    return JSON.parse(text) as T;
  }

  return (await response.text()) as T;
}

async function parseErrorResponse(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');

  try {
    if (isJson) {
      const text = await safeReadText(response);
      return text.trim() ? JSON.parse(text) : null;
    }

    return await response.text();
  } catch {
    return null;
  }
}

function extractErrorMessage(data: unknown, fallback = 'Request failed') {
  if (
    typeof data === 'object' &&
    data !== null &&
    'message' in data &&
    typeof (data as ApiErrorPayload).message === 'string'
  ) {
    return (data as ApiErrorPayload).message!;
  }

  if (typeof data === 'string' && data.trim()) {
    return data;
  }

  return fallback;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function defaultRetryDelayStrategy(attempt: number) {
  const base = 300;
  const max = 5000;
  const delay = Math.min(base * 2 ** (attempt - 1), max);
  const jitter = Math.floor(Math.random() * 100);
  return delay + jitter;
}

function isMethodRetryable(method: HttpMethod) {
  return method === 'GET' || method === 'HEAD' || method === 'OPTIONS';
}

function shouldRetryRequest(
  attempt: number,
  retry: number,
  error: unknown,
  method: HttpMethod,
  retryOnStatuses: number[],
  hasIdempotencyKey: boolean
) {
  if (attempt > retry) {
    return false;
  }

  if (error instanceof ApiTimeoutError) {
    return true;
  }

  if (error instanceof ApiAbortError) {
    return false;
  }

  if (error instanceof ApiError) {
    const canRetryUnsafeMethod = method === 'POST' && hasIdempotencyKey;
    const canRetryMethod = isMethodRetryable(method) || canRetryUnsafeMethod;

    return canRetryMethod && retryOnStatuses.includes(error.status);
  }

  return isMethodRetryable(method);
}

export function createApiClient(config: ApiClientConfig = {}) {
  const {
    baseUrl = process.env.NEXT_PUBLIC_API_URL || '',
    defaultHeaders,
    getAccessToken,
    defaultTimeoutMs = 15000,
    defaultRetry = 0,
    defaultRetryDelayMs = 300,
    retryOnStatuses = [408, 425, 429, 500, 502, 503, 504],
    queryArrayFormat = 'repeat',
    onRequest,
    onResponse,
    onError,
  } = config;

  async function request<T>(
    url: string,
    options: ApiRequestOptions = {}
  ): Promise<T> {
    const {
      method = 'GET',
      headers,
      body,
      query,
      signal,
      cache,
      credentials = 'same-origin',
      mode,
      redirect,
      referrerPolicy,
      keepalive,
      next,
      responseType = 'json',
      timeoutMs = defaultTimeoutMs,
      token,
      methodOverride,
      retry = defaultRetry,
      retryDelayMs = defaultRetryDelayMs,
      retryOnStatuses: requestRetryOnStatuses = retryOnStatuses,
      idempotencyKey,
    } = options;

    const finalUrl = `${joinUrl(baseUrl, url)}${buildQueryString(
      query,
      queryArrayFormat
    )}`;

    const requestHeaders = mergeHeaders(defaultHeaders, headers);

    const internalModeEnabled = process.env.MOCK_INTERNAL_MODE === 'true';

    if (internalModeEnabled) {
      const internalKey = process.env.MOCK_INTERNAL_KEY;

      if (!internalKey) {
        throw new Error('MOCK_INTERNAL_KEY chua duoc dinh nghia khi MOCK_INTERNAL_MODE=true');
      }

      if (!requestHeaders.has('x-internal-key')) {
        requestHeaders.set('x-internal-key', internalKey);
      }
    }

    const accessToken = token ?? getAccessToken?.();

    if (accessToken && !requestHeaders.has('Authorization')) {
      requestHeaders.set('Authorization', `Bearer ${accessToken}`);
    }

    if (idempotencyKey && !requestHeaders.has('Idempotency-Key')) {
      requestHeaders.set('Idempotency-Key', idempotencyKey);
    }

    let finalMethod = method;

    if (methodOverride) {
      requestHeaders.set('X-HTTP-Method-Override', methodOverride);
      finalMethod = 'POST';
    }

    const requestBody = buildBodyAndHeaders(body, requestHeaders);
    const shouldDebug = process.env.APP_ENV === 'development';

    let attempt = 0;

    while (true) {
      attempt += 1;

      const controller = signal ? null : new AbortController();
      const finalSignal = signal ?? controller?.signal;

      let didTimeout = false;

      const timeoutId =
        controller && timeoutMs > 0
          ? setTimeout(() => {
              didTimeout = true;
              controller.abort();
            }, timeoutMs)
          : null;

      try {
        const requestInit: RequestInit = {
          method: finalMethod,
          headers: requestHeaders,
          body: requestBody,
          signal: finalSignal,
          cache,
          credentials,
          mode,
          redirect,
          referrerPolicy,
          keepalive,
          next,
        };

        const requestContext = onRequest
          ? await onRequest({
              url: finalUrl,
              init: requestInit,
              options,
            })
          : {
              url: finalUrl,
              init: requestInit,
              options,
            };

          if (shouldDebug) {
            console.log('[api-request]', {
              method: finalMethod,
              url: requestContext.url,
              hasInternalKey: requestHeaders.has('x-internal-key'),
              hasAuthorization: requestHeaders.has('Authorization'),
              credentials,
            });
          }

        let response = await fetch(requestContext.url, requestContext.init);

        if (onResponse) {
          response = await onResponse({
            url: requestContext.url,
            init: requestContext.init,
            options,
            response,
          });
        }

        if (!response.ok) {
          if (shouldDebug) {
            console.log('[api-error]', {
              method: finalMethod,
              url: requestContext.url,
              status: response.status,
            });
          }

          const errorData = await parseErrorResponse(response);
          const message = extractErrorMessage(
            errorData,
            `Request failed with status ${response.status}`
          );
          throw new ApiError(message, response, errorData);
        }

        if (shouldDebug) {
          console.log('[api-success]', {
            method: finalMethod,
            url: requestContext.url,
            status: response.status,
          });
        }

        return await parseResponseByType<T>(response, responseType);
      } catch (error) {
        if (shouldDebug) {
          console.log('[api-exception]', {
            method: finalMethod,
            url: finalUrl,
            errorName: error instanceof Error ? error.name : 'UnknownError',
            errorMessage: error instanceof Error ? error.message : String(error),
          });
        }

        let normalizedError: unknown = error;

        if (error instanceof DOMException && error.name === 'AbortError') {
          normalizedError = didTimeout
            ? new ApiTimeoutError('Request timeout')
            : new ApiAbortError('Request was aborted');
        }

        if (onError) {
          await onError({
            url: finalUrl,
            init: {
              method: finalMethod,
              headers: requestHeaders,
              body: requestBody,
              signal: finalSignal,
              cache,
              credentials,
              mode,
              redirect,
              referrerPolicy,
              keepalive,
              next,
            },
            options,
            error: normalizedError,
          });
        }

        const canRetry = shouldRetryRequest(
          attempt,
          retry,
          normalizedError,
          finalMethod,
          requestRetryOnStatuses,
          Boolean(idempotencyKey)
        );

        if (!canRetry) {
          throw normalizedError;
        }

        const delay =
          typeof retryDelayMs === 'number'
            ? Math.max(retryDelayMs, defaultRetryDelayStrategy(attempt))
            : defaultRetryDelayStrategy(attempt);

        await sleep(delay);
      } finally {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      }
    }
  }

  return {
    request,

    get<T>(
      url: string,
      options?: Omit<ApiRequestOptions, 'method' | 'body' | 'methodOverride'>
    ) {
      return request<T>(url, { ...options, method: 'GET' });
    },

    post<T>(
      url: string,
      body?: RequestBody,
      options?: Omit<ApiRequestOptions, 'method' | 'body'>
    ) {
      return request<T>(url, { ...options, method: 'POST', body });
    },

    put<T>(
      url: string,
      body?: RequestBody,
      options?: Omit<ApiRequestOptions, 'method' | 'body'>
    ) {
      return request<T>(url, { ...options, method: 'PUT', body });
    },

    patch<T>(
      url: string,
      body?: RequestBody,
      options?: Omit<ApiRequestOptions, 'method' | 'body'>
    ) {
      return request<T>(url, { ...options, method: 'PATCH', body });
    },

    delete<T>(
      url: string,
      options?: Omit<ApiRequestOptions, 'method' | 'body' | 'methodOverride'>
    ) {
      return request<T>(url, { ...options, method: 'DELETE' });
    },

    head(
      url: string,
      options?: Omit<ApiRequestOptions, 'method' | 'body' | 'responseType'>
    ) {
      return request<void>(url, {
        ...options,
        method: 'HEAD',
        responseType: 'void',
      });
    },

    options<T>(
      url: string,
      options?: Omit<ApiRequestOptions, 'method' | 'body'>
    ) {
      return request<T>(url, { ...options, method: 'OPTIONS' });
    },

    postAsUpdate<T>(
      url: string,
      body?: RequestBody,
      options?: Omit<ApiRequestOptions, 'method' | 'body' | 'methodOverride'>
    ) {
      return request<T>(url, {
        ...options,
        method: 'POST',
        methodOverride: 'PUT',
        body,
      });
    },

    postAsPatch<T>(
      url: string,
      body?: RequestBody,
      options?: Omit<ApiRequestOptions, 'method' | 'body' | 'methodOverride'>
    ) {
      return request<T>(url, {
        ...options,
        method: 'POST',
        methodOverride: 'PATCH',
        body,
      });
    },

    postAsDelete<T>(
      url: string,
      body?: RequestBody,
      options?: Omit<ApiRequestOptions, 'method' | 'body' | 'methodOverride'>
    ) {
      return request<T>(url, {
        ...options,
        method: 'POST',
        methodOverride: 'DELETE',
        body,
      });
    },

    upload<T>(
      url: string,
      formData: FormData,
      options?: Omit<ApiRequestOptions, 'method' | 'body'>
    ) {
      return request<T>(url, {
        ...options,
        method: 'POST',
        body: formData,
      });
    },

    uploadAsUpdate<T>(
      url: string,
      formData: FormData,
      options?: Omit<ApiRequestOptions, 'method' | 'body' | 'methodOverride'>
    ) {
      return request<T>(url, {
        ...options,
        method: 'POST',
        methodOverride: 'PUT',
        body: formData,
      });
    },
  };
}

export const api = createApiClient();
