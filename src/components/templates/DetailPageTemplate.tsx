import type { ReactNode } from 'react';
import { AppHeader } from '@/components/organisms';

type BreadcrumbItem = {
  label: string;
};

type DetailPageTemplateProps = {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  badge?: string;
  meta?: ReactNode;
  actions?: ReactNode;
  sidebar?: ReactNode;
  children: ReactNode;
  className?: string;
};

export default function DetailPageTemplate({
  title,
  description,
  breadcrumbs = [],
  badge,
  meta,
  actions,
  sidebar,
  children,
  className = '',
}: DetailPageTemplateProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      <AppHeader
        title={title}
        description={description}
        badge={badge}
        breadcrumbs={breadcrumbs}
        actions={actions}
        aside={meta}
      />

      <div className={`grid gap-6 ${sidebar ? 'xl:grid-cols-[minmax(0,1fr)_320px]' : 'grid-cols-1'}`}>
        <section className="rounded-3xl border border-Zcolor3 bg-white p-6 shadow-sm">{children}</section>
        {sidebar ? (
          <aside className="rounded-3xl border border-Zcolor3 bg-white p-6 shadow-sm">{sidebar}</aside>
        ) : null}
      </div>
    </div>
  );
}
