// src/components/molecules/Sidebar.tsx
'use client';
import Link from 'next/link';
import { HomeIcon, PlusCircleIcon, UserIcon } from '@heroicons/react/24/outline';

const menuItems = [
  { label: 'Feed', href: '/dashboard', icon: HomeIcon },
  { label: 'New Post', href: '/dashboard/posts/create', icon: PlusCircleIcon },
  { label: 'Profile', href: '/profile/1', icon: UserIcon },
];

export default function Sidebar() {
  return (
    <nav className="flex flex-col h-full p-4 space-y-2">
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center px-3 py-2 rounded hover:bg-darkBlue2 transition"
          >
            <Icon className="h-5 w-5 mr-3" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
