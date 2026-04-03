import type { ReactNode } from 'react';
import { AppHeader } from '@/components/organisms';

type BreadcrumbItem = {
  label: string;
};

type DocsPageTemplateProps = {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  badge?: string;
  navigation: ReactNode;
  children: ReactNode;
  toc?: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export default function DocsPageTemplate({
  title,
  description,
  breadcrumbs = [],
  badge,
  navigation,
  children,
  toc,
  footer,
  className = '',
}: DocsPageTemplateProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      <AppHeader title={title} description={description} badge={badge} breadcrumbs={breadcrumbs} />

      <div className={`grid gap-6 ${toc ? 'xl:grid-cols-[240px_minmax(0,1fr)_260px]' : 'xl:grid-cols-[240px_minmax(0,1fr)]'}`}>
        <aside className="rounded-3xl border border-Zcolor3 bg-white p-4 shadow-sm">{navigation}</aside>

        <article className="rounded-3xl border border-Zcolor3 bg-white p-6 shadow-sm">
          {children}
          {footer ? <div className="mt-8 border-t border-Zcolor3 pt-6">{footer}</div> : null}
        </article>

        {toc ? <aside className="rounded-3xl border border-Zcolor3 bg-white p-4 shadow-sm">{toc}</aside> : null}
      </div>
    </div>
  );
}
