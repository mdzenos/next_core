export type ApiActions = Partial<{
  view: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
}>;

export type ApiResponse<T> = {
  message: string;
  data: T;
  success: boolean;
  status: number;
  totalRecord: number;
  actions: ApiActions;
};
