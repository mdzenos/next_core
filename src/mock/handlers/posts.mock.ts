import postsDb from '@/mock/db/posts.json';
import type { ApiResponse } from '@/types/auth';
import type { Post } from '@/types/postContract';

let posts: Post[] = postsDb.map((item) => ({ ...item }));

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
