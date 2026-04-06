export class MockHttpError extends Error {
  status: number;
  data: string[];

  constructor(status: number, message: string, data?: string[]) {
    super(message);
    this.name = 'MockHttpError';
    this.status = status;
    this.data = data ?? [message];
  }
}
