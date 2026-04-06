import type { ReactNode } from 'react';
import { AppHeader } from '@/components/organisms';

type BreadcrumbItem = {
  label: string;
};

type ReviewStudioTemplateProps = {
  title: string;
  description?: string;
  badge?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
  toolbar?: ReactNode;
  reviewTable: ReactNode;
  comments?: ReactNode;
  sideInfo?: ReactNode;
  className?: string;
};

export default function ReviewStudioTemplate({
  title,
  description,
  badge,
  breadcrumbs = [],
  actions,
  toolbar,
  reviewTable,
  comments,
  sideInfo,
  className = '',
}: ReviewStudioTemplateProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      <AppHeader title={title} description={description} badge={badge} breadcrumbs={breadcrumbs} actions={actions} />

      {toolbar ? <section>{toolbar}</section> : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <section className="space-y-6">{reviewTable}</section>
        <aside className="space-y-6">
          {comments ? comments : null}
          {sideInfo ? sideInfo : null}
        </aside>
      </div>
    </div>
  );
}
