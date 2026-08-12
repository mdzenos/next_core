import { apiError, apiOk } from "@/lib/http/response";
import { getPost } from "@/server/posts/service";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return apiError("POST_NOT_FOUND", "Không tìm thấy bài viết.", 404);
  }

  return apiOk(post);
}
