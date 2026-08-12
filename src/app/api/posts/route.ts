import { apiError, apiOk } from "@/lib/http/response";
import { getPosts } from "@/server/posts/service";

export async function GET() {
  try {
    return apiOk(await getPosts());
  } catch {
    return apiError("INTERNAL_ERROR", "Không thể lấy danh sách bài viết.", 500);
  }
}
