import type { ReactNode } from 'react';
import { AppHeader, FilterToolbar, StatsOverview } from '@/components/organisms';

type BreadcrumbItem = {
  label: string;
};

type StatTone = 'default' | 'accent' | 'soft';

type DashboardStatItem = {
  label: string;
  value: string;
  description?: string;
  tone?: StatTone;
};

type DashboardPageTemplateProps = {
  title: string;
  description?: string;
  badge?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
  stats?: DashboardStatItem[];
  toolbar?: {
    title?: string;
    description?: string;
    searchSlot?: ReactNode;
    filtersSlot?: ReactNode;
    actionsSlot?: ReactNode;
  };
  sidebar?: ReactNode;
  children: ReactNode;
  className?: string;
};

export default function DashboardPageTemplate({
  title,
  description,
  badge,
  breadcrumbs = [],
  actions,
  stats,
  toolbar,
  sidebar,
  children,
  className = '',
}: DashboardPageTemplateProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      <AppHeader title={title} description={description} badge={badge} breadcrumbs={breadcrumbs} actions={actions} />

      {stats && stats.length > 0 ? <StatsOverview items={stats} /> : null}

      {toolbar ? <FilterToolbar {...toolbar} /> : null}

      <div className={`grid gap-6 ${sidebar ? 'xl:grid-cols-[minmax(0,1fr)_320px]' : 'grid-cols-1'}`}>
        <section className="space-y-6">{children}</section>
        {sidebar ? <aside className="space-y-6">{sidebar}</aside> : null}
      </div>
    </div>
  );
}
