// src/components/molecules/Navbar.tsx
'use client';
import Avatar from '@/components/atoms/Avatar';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="flex items-center justify-between bg-white p-4 shadow-md sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-yellow-600">Dashboard</h1>
      <div className="flex items-center space-x-6">
        <Link href="/dashboard" className="hover:text-yellow-500 font-medium">Home</Link>
        <Link href="/profile/u1">
          <Avatar src="/next.svg" size={40} />
        </Link>
      </div>
    </header>
  );
}
