import type { ReactNode } from 'react';
import { Badge, Heading, Text } from '@/components/atoms';
import { BreadcrumbTrail } from '@/components/molecules';

type BreadcrumbItem = {
  label: string;
};

type AppHeaderProps = {
  title: string;
  description?: string;
  badge?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
  aside?: ReactNode;
  className?: string;
};

export default function AppHeader({
  title,
  description,
  badge,
  breadcrumbs = [],
  actions,
  aside,
  className = '',
}: AppHeaderProps) {
  return (
    <section
      className={`surface-card p-6 ${className}`}
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          {breadcrumbs.length > 0 ? (
            <div className="mb-3">
              <BreadcrumbTrail items={breadcrumbs} />
            </div>
          ) : null}

          {badge ? <Badge>{badge}</Badge> : null}

          <Heading as="h1" size="2xl" className="mt-3">
            {title}
          </Heading>

          {description ? (
            <Text tone="muted" size="sm" className="mt-3 max-w-3xl">
              {description}
            </Text>
          ) : null}
        </div>

        {aside || actions ? (
          <div className="flex shrink-0 flex-col items-stretch gap-3 lg:items-end">
            {aside}
            {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
