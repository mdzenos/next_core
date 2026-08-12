import { apiError, apiOk } from "@/lib/http/response";
import { getUser } from "@/server/users/service";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const user = await getUser(id);

  if (!user) {
    return apiError("USER_NOT_FOUND", "Không tìm thấy người dùng.", 404);
  }

  return apiOk(user);
}
