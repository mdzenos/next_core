import type { ReactNode } from 'react';
import { AppHeader } from '@/components/organisms';

type BreadcrumbItem = {
  label: string;
};

type ControlCenterTemplateProps = {
  title: string;
  description?: string;
  badge?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
  overview?: ReactNode;
  primary: ReactNode;
  secondary?: ReactNode;
  className?: string;
};

export default function ControlCenterTemplate({
  title,
  description,
  badge,
  breadcrumbs = [],
  actions,
  overview,
  primary,
  secondary,
  className = '',
}: ControlCenterTemplateProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      <AppHeader title={title} description={description} badge={badge} breadcrumbs={breadcrumbs} actions={actions} />

      {overview ? <section>{overview}</section> : null}

      <div className={`grid gap-6 ${secondary ? 'xl:grid-cols-[minmax(0,1fr)_360px]' : 'grid-cols-1'}`}>
        <section className="space-y-6">{primary}</section>
        {secondary ? <aside className="space-y-6">{secondary}</aside> : null}
      </div>
    </div>
  );
}
