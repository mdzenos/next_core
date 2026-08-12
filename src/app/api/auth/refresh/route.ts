import { apiError } from "@/lib/http/response";

export async function POST() {
  return apiError("NOT_IMPLEMENTED", "Refresh session chưa được triển khai.", 501);
}
