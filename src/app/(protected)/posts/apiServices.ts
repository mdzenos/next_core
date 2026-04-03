import { api } from '@/services/api';
import type { ApiResponse } from '@/types/auth';
import type { Post } from '@/types/postContract';

const BASE =
  process.env.NEXT_PUBLIC_API_MODE === 'mock'
    ? '/api'
    : process.env.NEXT_PUBLIC_API_URL;

function postsUrl(path: string) {
  return `${BASE}${path}`;
}

export async function getPosts() {
  return api.get<ApiResponse<Post[]>>(postsUrl('/posts'), {
    credentials: 'include',
    timeoutMs: 10000,
  });
}
