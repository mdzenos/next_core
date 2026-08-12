import type { ApiResponse } from "@/types/api";

export async function apiFetch<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init);
  const body = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !body.success) {
    throw new Error(body.success ? "Request failed" : body.error.message);
  }

  return body.data;
}
