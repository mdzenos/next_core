import type { ReactNode } from 'react';
import { AppHeader } from '@/components/organisms';

type BreadcrumbItem = {
  label: string;
};

type ListPageTemplateProps = {
  title: string;
  description?: string;
  badge?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
  toolbar?: ReactNode;
  children: ReactNode;
  className?: string;
};

export default function ListPageTemplate({
  title,
  description,
  badge,
  breadcrumbs = [],
  actions,
  toolbar,
  children,
  className = '',
}: ListPageTemplateProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      <AppHeader
        title={title}
        description={description}
        badge={badge}
        breadcrumbs={breadcrumbs}
        actions={actions}
      />

      {toolbar}

      <section>{children}</section>
    </div>
  );
}
