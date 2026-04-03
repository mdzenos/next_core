'use client';

import Link from 'next/link';
import { ArrowRightIcon, FolderIcon } from '@heroicons/react/24/outline';

type SidebarDrilldownItemProps = {
  label: string;
  href?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  active?: boolean;
  hasChildren?: boolean;
  onClick?: () => void;
};

export default function SidebarDrilldownItem({
  label,
  href,
  icon: Icon = FolderIcon,
  active = false,
  hasChildren = false,
  onClick,
}: SidebarDrilldownItemProps) {
  if (hasChildren) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
          active
            ? 'bg-white text-Zcolor13 shadow-sm'
            : 'text-slate-700 hover:bg-white hover:text-Zcolor13 hover:shadow-sm'
        }`}
        title={label}
      >
        <Icon
          className={`h-5 w-5 shrink-0 ${
            active ? 'text-Zcolor13' : 'text-Zcolor10 group-hover:text-Zcolor13'
          }`}
        />

        <div className="min-w-0 flex-1">
          <p className="truncate">{label}</p>
        </div>

        <ArrowRightIcon className="h-5 w-5 shrink-0 text-slate-400 transition group-hover:text-Zcolor13" />
      </button>
    );
  }

  if (href) {
    return (
      <Link
        href={href}
        className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
          active
            ? 'bg-gradient-to-r from-Zcolor15 to-Zcolor13 text-white shadow-lg shadow-Zcolor13/20'
            : 'text-slate-700 hover:bg-white hover:text-Zcolor13 hover:shadow-sm'
        }`}
        title={label}
      >
        <Icon
          className={`h-5 w-5 shrink-0 ${
            active ? 'text-white' : 'text-Zcolor10 group-hover:text-Zcolor13'
          }`}
        />
        <span className="truncate">{label}</span>
      </Link>
    );
  }

  return null;
}
