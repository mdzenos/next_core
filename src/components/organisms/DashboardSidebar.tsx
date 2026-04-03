'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeftIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  PencilSquareIcon,
  UserGroupIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { Squares2X2Icon } from '@heroicons/react/24/solid';

type DashboardSidebarProps = {
  isCollapsed?: boolean;
};

type MenuNode = {
  label: string;
  href?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  children?: MenuNode[];
};

const menuItems: MenuNode[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: Squares2X2Icon,
  },
  {
    label: 'Roots',
    icon: PencilSquareIcon,
    children: [
      {
        label: 'Trunks',
        icon: FolderIcon,
        children: [
          {
            label: 'Branches',
            icon: FolderIcon,
            children: [
              {
                label: 'Leafs',
                href: '/profile',
                icon: PencilSquareIcon,
              },
              {
                label: 'All Posts',
                href: '/dashboard/posts',
                icon: PencilSquareIcon,
              },
            ],
          },
          {
            label: 'Posts Overview',
            href: '/dashboard/posts',
            icon: PencilSquareIcon,
          },
        ],
      },
      {
        label: 'Categories',
        icon: FolderIcon,
        children: [
          {
            label: 'Category List',
            href: '/dashboard/posts/categories',
          },
          {
            label: 'Create Category',
            href: '/dashboard/posts/categories/create',
          },
        ],
      },
    ],
  },
  {
    label: 'Users',
    icon: UserGroupIcon,
    children: [
      {
        label: 'Management',
        icon: FolderIcon,
        children: [
          {
            label: 'User List',
            href: '/dashboard/users',
          },
          {
            label: 'User Roles',
            href: '/dashboard/users/roles',
          },
        ],
      },
    ],
  },
  {
    label: 'Analytics',
    icon: ChartBarIcon,
    href: '/profile',
  },
];

function isNodeActive(node: MenuNode, pathname: string): boolean {
  if (node.href && (pathname === node.href || pathname.startsWith(`${node.href}/`))) {
    return true;
  }

  return (node.children ?? []).some((child) => isNodeActive(child, pathname));
}

function findActiveTrail(nodes: MenuNode[], pathname: string, trail: MenuNode[] = []): MenuNode[] {
  for (const node of nodes) {
    const nextTrail = [...trail, node];

    if (node.href && (pathname === node.href || pathname.startsWith(`${node.href}/`))) {
      return nextTrail;
    }

    if (node.children?.length) {
      const result = findActiveTrail(node.children, pathname, nextTrail);
      if (result.length) return result;
    }
  }

  return [];
}

function getVisibleNodes(root: MenuNode[], stack: MenuNode[]) {
  if (stack.length === 0) return root;
  return stack[stack.length - 1].children ?? [];
}

export default function DashboardSidebar({
  isCollapsed = false,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  const activeTrail = useMemo(() => findActiveTrail(menuItems, pathname), [pathname]);

  const derivedStack = useMemo(
    () => activeTrail.filter((node) => (node.children ?? []).length > 0),
    [activeTrail],
  );

  const [navigationStack, setNavigationStack] = useState<MenuNode[]>(derivedStack);

  useEffect(() => {
    setNavigationStack(derivedStack);
  }, [derivedStack]);

  const currentParent = navigationStack[navigationStack.length - 1] ?? null;
  const visibleNodes = getVisibleNodes(menuItems, navigationStack);

  function enterNode(node: MenuNode) {
    if ((node.children ?? []).length > 0) {
      setNavigationStack((prev) => [...prev, node]);
    }
  }

  function goBack() {
    setNavigationStack((prev) => prev.slice(0, -1));
  }

  function goRoot() {
    setNavigationStack([]);
  }

  function goToLevel(index: number) {
    setNavigationStack((prev) => prev.slice(0, index + 1));
  }

  const title = currentParent?.label ?? 'Navigation';

  if (isCollapsed) {
    return (
      <div className="flex h-full flex-col bg-gradient-to-b from-Zcolor3 via-Zcolor2 to-Zcolor1 px-5 py-6 transition-all duration-300">
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon ?? FolderIcon;
            const active = isNodeActive(item, pathname);
            const hasChildren = (item.children ?? []).length > 0;

            if (hasChildren) {
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => enterNode(item)}
                  className={`flex items-center justify-center rounded-2xl p-3 transition-all duration-200 ${
                    active
                      ? 'bg-white text-Zcolor13 shadow-sm'
                      : 'text-slate-700 hover:bg-white hover:text-Zcolor13 hover:shadow-sm'
                  }`}
                  title={item.label}
                >
                  <Icon className={`h-5 w-5 ${active ? 'text-Zcolor13' : 'text-Zcolor10'}`} />
                </button>
              );
            }

            if (item.href) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center justify-center rounded-2xl p-3 transition-all duration-200 ${
                    active
                      ? 'bg-gradient-to-r from-Zcolor15 to-Zcolor13 text-white shadow-lg shadow-Zcolor13/20'
                      : 'text-slate-700 hover:bg-white hover:text-Zcolor13 hover:shadow-sm'
                  }`}
                  title={item.label}
                >
                  <Icon className={`h-5 w-5 ${active ? 'text-white' : 'text-Zcolor10'}`} />
                </Link>
              );
            }

            return null;
          })}
        </nav>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-Zcolor3 via-Zcolor2 to-Zcolor1 px-1 py-6 transition-all duration-300">
      <div className="mb-6">
        <div className="grid grid-cols-[36px_minmax(0,1fr)_36px] items-center gap-3 px-2">
          <button
            type="button"
            onClick={goRoot}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-Zcolor3 bg-white text-Zcolor13 transition hover:bg-Zcolor1"
            aria-label="Về menu gốc"
            title="Về menu gốc"
          >
            <HomeIcon className="h-6 w-6" />
          </button>

          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold uppercase tracking-[0.18em] text-Zcolor10/80">
              {title}
            </h2>

            <div className="mt-1 flex flex-wrap items-center gap-x-1 text-xs text-slate-500">
              {navigationStack.length > 0 ? (
                navigationStack.map((item, index) => {
                  const isLast = index === navigationStack.length - 1;

                  return (
                    <div key={`${item.label}-${index}`} className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => goToLevel(index)}
                        className={`truncate transition hover:text-Zcolor13 ${
                          isLast ? 'font-medium text-Zcolor13' : ''
                        }`}
                        title={item.label}
                      >
                        {item.label}
                      </button>

                      {!isLast ? <span className="text-slate-400">/</span> : null}
                    </div>
                  );
                })
              ) : (
                <span className="truncate">Danh sách chức năng</span>
              )}
            </div>
          </div>

          {navigationStack.length > 0 ? (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-Zcolor3 bg-white text-Zcolor13 transition hover:bg-Zcolor1"
              aria-label="Quay lại"
              title="Quay lại"
            >
              <ArrowLeftIcon className="h-6 w-6" />
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        {visibleNodes.map((node) => {
          const Icon = node.icon ?? FolderIcon;
          const hasChildren = (node.children ?? []).length > 0;
          const active = isNodeActive(node, pathname);

          if (hasChildren) {
            return (
              <button
                key={node.label}
                type="button"
                onClick={() => enterNode(node)}
                className={`group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-white text-Zcolor13 shadow-sm'
                    : 'text-slate-700 hover:bg-white hover:text-Zcolor13 hover:shadow-sm'
                }`}
                title={node.label}
              >
                <Icon
                  className={`h-5 w-5 shrink-0 ${
                    active ? 'text-Zcolor13' : 'text-Zcolor10 group-hover:text-Zcolor13'
                  }`}
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate">{node.label}</p>
                  {/* <p className="mt-0.5 text-xs text-slate-500">
                    {(node.children ?? []).length} mục con
                  </p> */}
                </div>
                <ArrowRightIcon className="h-5 w-5 shrink-0 text-slate-400 transition group-hover:text-Zcolor13" />
              </button>
            );
          }

          if (node.href) {
            return (
              <Link
                key={node.label}
                href={node.href}
                className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-gradient-to-r from-Zcolor15 to-Zcolor13 text-white shadow-lg shadow-Zcolor13/20'
                    : 'text-slate-700 hover:bg-white hover:text-Zcolor13 hover:shadow-sm'
                }`}
                title={node.label}
              >
                <Icon
                  className={`h-5 w-5 shrink-0 ${
                    active ? 'text-white' : 'text-Zcolor10 group-hover:text-Zcolor13'
                  }`}
                />
                <span className="truncate">{node.label}</span>
              </Link>
            );
          }

          return null;
        })}
      </nav>

      <div className="mt-auto overflow-hidden rounded-2xl border border-Zcolor3 bg-gradient-to-br from-Zcolor15 to-Zcolor13 p-4 text-white shadow-lg">
        <p className="text-sm font-semibold">Social Dashboard</p>
        <p className="mt-1 text-xs leading-5 text-white/85">
          Quản lý người dùng, bài viết và thống kê trong một giao diện thống nhất.
        </p>

        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
          <div className="h-full w-2/3 rounded-full bg-Zcolor6" />
        </div>
      </div>
    </div>
  );
}
