import { createPost, findPostById, listPosts } from "@/server/posts/repository";

export function getPosts() {
  return listPosts();
}

export function getPost(id: string) {
  return findPostById(id);
}

export function addPost(data: { title: string; content?: string; authorId: string }) {
  return createPost(data);
}
