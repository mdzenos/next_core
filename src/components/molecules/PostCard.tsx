'use client';
import { Post } from '@/contracts/postContract';
import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm mb-4">
      <div className="flex items-center mb-2">
        <Avatar src={post.author.avatar} size={36} />
        <p className="ml-2 font-semibold text-gray-800">{post.author.name}</p>
      </div>
      <p className="text-gray-700 mb-2">{post.content}</p>
      <Button>Like</Button>
    </div>
  );
}
