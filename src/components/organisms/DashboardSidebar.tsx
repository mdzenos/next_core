'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChartBarIcon,
  HomeIcon,
  PencilSquareIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

type DashboardSidebarProps = {
  isCollapsed?: boolean;
};

const menuItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: HomeIcon,
  },
  {
    label: 'Create Post',
    href: '/dashboard/posts/create',
    icon: PencilSquareIcon,
  },
  {
    label: 'Users',
    href: '/dashboard/users',
    icon: UserGroupIcon,
  },
  {
    label: 'Analytics',
    href: '/dashboard/analytics',
    icon: ChartBarIcon,
  },
];

export default function DashboardSidebar({
  isCollapsed = false,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className={`flex h-full flex-col py-6 transition-all duration-300 ${
        isCollapsed ? 'px-2' : 'px-4'
      }`}
    >
      <div className="mb-6">
        {!isCollapsed && (
          <h2 className="px-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            Navigation
          </h2>
        )}
      </div>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center rounded-xl py-3 text-sm font-medium transition ${
                isCollapsed ? 'justify-center px-2' : 'gap-3 px-4'
              } ${
                isActive
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-700 hover:bg-secondary hover:text-primary'
              }`}
              title={item.label}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {!isCollapsed && (
        <div className="mt-auto rounded-xl bg-secondary p-4">
          <p className="text-sm font-semibold text-primary">Social Dashboard</p>
          <p className="mt-1 text-xs text-gray-700">
            Quản lý người dùng, bài viết và thống kê trong một giao diện thống nhất.
          </p>
        </div>
      )}
    </div>
  );
}
