import { apiError, apiOk } from "@/lib/http/response";
import { getSessionToken } from "@/server/auth/session";

export async function GET() {
  const token = await getSessionToken();

  if (!token) {
    return apiError("UNAUTHENTICATED", "Chưa đăng nhập.", 401);
  }

  // TODO: verify session/token và lấy user thật từ DB.
  return apiOk({ token });
}
