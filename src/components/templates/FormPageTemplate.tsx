import type { ReactNode } from 'react';
import { AppHeader } from '@/components/organisms';

type BreadcrumbItem = {
  label: string;
};

type FormPageTemplateProps = {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  badge?: string;
  children: ReactNode;
  footerActions?: ReactNode;
  aside?: ReactNode;
  className?: string;
};

export default function FormPageTemplate({
  title,
  description,
  breadcrumbs = [],
  badge,
  children,
  footerActions,
  aside,
  className = '',
}: FormPageTemplateProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      <AppHeader title={title} description={description} badge={badge} breadcrumbs={breadcrumbs} />

      <div className={`grid gap-6 ${aside ? 'xl:grid-cols-[minmax(0,1fr)_320px]' : 'grid-cols-1'}`}>
        <section className="rounded-3xl border border-Zcolor3 bg-white p-6 shadow-sm">
          {children}
          {footerActions ? <div className="mt-8 flex flex-wrap gap-3 border-t border-Zcolor3 pt-6">{footerActions}</div> : null}
        </section>

        {aside ? (
          <aside className="rounded-3xl border border-Zcolor3 bg-white p-6 shadow-sm">{aside}</aside>
        ) : null}
      </div>
    </div>
  );
}
