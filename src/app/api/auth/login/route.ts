import { apiError, apiOk } from "@/lib/http/response";
import { authenticate } from "@/server/auth/service";
import { setSessionToken } from "@/server/auth/session";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.login || !body?.password) {
    return apiError("VALIDATION_ERROR", "login và password là bắt buộc.", 422);
  }

  const user = await authenticate(body.login, body.password);

  if (!user) {
    return apiError("INVALID_CREDENTIALS", "Thông tin đăng nhập không hợp lệ.", 401);
  }

  // TODO: thay bằng session/JWT thật.
  await setSessionToken(user.id);

  return apiOk(user);
}
