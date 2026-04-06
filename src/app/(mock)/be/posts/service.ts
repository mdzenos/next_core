import postsDb from '@/app/(mock)/be/db/posts.json';
import { MockHttpError } from '@/app/(mock)/be/shared/mock-http-error';
import type { ApiResponse } from '@/types/auth';
import type { Post } from '@/types/postContract';

const posts: Post[] = postsDb.map((item) => ({ ...item }));

export function mockGetPosts(): ApiResponse<Post[]> {
  return {
    success: true,
    message: 'Lay danh sach bai viet thanh cong',
    status: 200,
    totalRecord: posts.length,
    actions: { view: true },
    data: posts,
  };
}

export { MockHttpError };
