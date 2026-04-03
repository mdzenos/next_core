export type SafeUser = {
  id: string;
  fullName: string;
  email: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type AuthResponseData = {
  user: SafeUser;
  accessToken: string;
  accessTokenExpiresAt: number;
};

export type AuthAdapterResponseData = AuthResponseData & {
  refreshToken: string;
};

export type MeResponseData = {
  user: SafeUser;
};

export type ApiActions = {
  view?: boolean;
  create?: boolean;
  update?: boolean;
  delete?: boolean;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  status?: number;
  totalRecord?: number;
  actions?: ApiActions;
};

export type RequestOptions = {
  timeoutMs?: number;
};

export type AuthAdapter = {
  login: (
    payload: LoginPayload,
    options?: RequestOptions,
  ) => Promise<ApiResponse<AuthAdapterResponseData>>;
  register: (
    payload: RegisterPayload,
    options?: RequestOptions,
  ) => Promise<ApiResponse<AuthAdapterResponseData>>;
  refreshSession: (
    refreshToken?: string | null,
    options?: RequestOptions,
  ) => Promise<ApiResponse<AuthResponseData>>;
  getMe: (
    accessToken?: string | null,
    options?: RequestOptions,
  ) => Promise<ApiResponse<MeResponseData>>;
  logout: (
    refreshToken?: string | null,
    options?: RequestOptions,
  ) => Promise<ApiResponse<null>>;
};
