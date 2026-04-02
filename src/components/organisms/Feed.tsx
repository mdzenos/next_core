'use client';
import PostCard from '@/components/molecules/PostCard';
import { Post } from '@/contracts/postContract';

// Mock data
const posts: Post[] = [
  {
    id: '1',
    content: 'Hello world!',
    author: { id: 'u1', name: 'Alice', avatar: '/next.svg' },
  },
  {
    id: '2',
    content: 'Học Next.js thật thú vị!',
    author: { id: 'u2', name: 'Bob', avatar: '/vercel.svg' },
  },
];

export default function Feed() {
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
