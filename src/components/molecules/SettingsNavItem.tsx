import type { ReactNode } from 'react';
import { Link, Text } from '@/components/atoms';
import { cn } from '@/utils/cn';

type SettingsNavItemProps = {
  href: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  active?: boolean;
  className?: string;
};

export default function SettingsNavItem({
  href,
  label,
  description,
  icon,
  active = false,
  className,
}: SettingsNavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        'surface-card w-full items-start justify-between gap-3 p-3 no-underline hover:no-underline',
        active && 'border-Zcolor8 ring-brand',
        className,
      )}
    >
      <div className="min-w-0 space-y-1">
        <div className="flex items-center gap-2">
          {icon ? <span className="text-Zcolor12">{icon}</span> : null}
          <span className="font-semibold text-Zcolor13">{label}</span>
        </div>
        {description ? <Text tone="muted" size="xs">{description}</Text> : null}
      </div>
    </Link>
  );
}
