import { apiError, apiOk } from "@/lib/http/response";
import { getUsers } from "@/server/users/service";

export async function GET() {
  try {
    return apiOk(await getUsers());
  } catch {
    return apiError("INTERNAL_ERROR", "Không thể lấy danh sách người dùng.", 500);
  }
}
