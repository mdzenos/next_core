import { db } from "@/server/db/client";

export function listPosts() {
  return db.post.findMany({
    include: { author: { select: { id: true, name: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export function findPostById(id: string) {
  return db.post.findUnique({
    where: { id },
    include: { author: { select: { id: true, name: true } } },
  });
}

export function createPost(data: { title: string; content?: string; authorId: string }) {
  return db.post.create({ data });
}
