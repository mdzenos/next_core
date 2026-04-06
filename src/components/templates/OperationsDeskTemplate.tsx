import type { ReactNode } from 'react';
import { AppHeader } from '@/components/organisms';

type BreadcrumbItem = {
  label: string;
};

type OperationsDeskTemplateProps = {
  title: string;
  description?: string;
  badge?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
  kpiSection?: ReactNode;
  notifications: ReactNode;
  uploads?: ReactNode;
  mainContent: ReactNode;
  className?: string;
};

export default function OperationsDeskTemplate({
  title,
  description,
  badge,
  breadcrumbs = [],
  actions,
  kpiSection,
  notifications,
  uploads,
  mainContent,
  className = '',
}: OperationsDeskTemplateProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      <AppHeader title={title} description={description} badge={badge} breadcrumbs={breadcrumbs} actions={actions} />

      {kpiSection ? <section>{kpiSection}</section> : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <section className="space-y-6">{mainContent}</section>
        <aside className="space-y-6">
          {notifications}
          {uploads ? uploads : null}
        </aside>
      </div>
    </div>
  );
}
