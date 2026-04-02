// src/components/molecules/Sidebar.tsx
'use client';
import Link from 'next/link';
import { HomeIcon, PlusCircleIcon, UserIcon } from '@heroicons/react/24/outline';

const menuItems = [
  { label: 'Feed', href: '/dashboard', icon: HomeIcon },
  { label: 'Create Post', href: '/dashboard/posts/create', icon: PlusCircleIcon },
  { label: 'Profile', href: '/profile/u1', icon: UserIcon },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-white shadow-lg min-h-screen p-6 flex flex-col">
      <h2 className="text-2xl font-bold text-yellow-600 mb-8">Social Dashboard</h2>
      <nav className="flex flex-col space-y-4">
        {menuItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center space-x-3 p-3 rounded hover:bg-yellow-50 transition"
          >
            <Icon className="h-5 w-5 text-yellow-500" />
            <span className="font-medium text-gray-800">{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
