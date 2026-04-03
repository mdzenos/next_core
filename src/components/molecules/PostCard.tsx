'use client';

import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';
import { Post } from '@/types/postContract';

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="mb-4 rounded-lg border border-Zcolor3 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center">
        <Avatar name={post.author.name} imageUrl={post.author.avatar} />
        <p className="ml-2 font-semibold text-gray-800">{post.author.name}</p>
      </div>

      <p className="mb-2 text-gray-700">{post.content}</p>

      <Button size="sm">Like</Button>
    </div>
  );
}
