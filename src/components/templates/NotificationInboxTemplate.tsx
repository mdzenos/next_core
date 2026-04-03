import type { ReactNode } from 'react';
import { AppHeader } from '@/components/organisms';

type BreadcrumbItem = {
  label: string;
};

type NotificationInboxTemplateProps = {
  title: string;
  description?: string;
  badge?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
  filterBar?: ReactNode;
  inbox: ReactNode;
  details?: ReactNode;
  className?: string;
};

export default function NotificationInboxTemplate({
  title,
  description,
  badge,
  breadcrumbs = [],
  actions,
  filterBar,
  inbox,
  details,
  className = '',
}: NotificationInboxTemplateProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      <AppHeader title={title} description={description} badge={badge} breadcrumbs={breadcrumbs} actions={actions} />

      {filterBar ? <section>{filterBar}</section> : null}

      <div className={`grid gap-6 ${details ? 'xl:grid-cols-[minmax(0,1fr)_380px]' : 'grid-cols-1'}`}>
        <section className="space-y-4">{inbox}</section>
        {details ? <aside className="space-y-4">{details}</aside> : null}
      </div>
    </div>
  );
}
