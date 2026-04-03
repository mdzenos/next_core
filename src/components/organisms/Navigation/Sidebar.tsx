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
    <nav className="flex h-full flex-col space-y-2 p-4">
      {menuItems.map((item) => {
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center rounded px-3 py-2 text-Zcolor14 transition hover:bg-Zcolor12 hover:text-white"
          >
            <Icon className="mr-3 h-5 w-5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
