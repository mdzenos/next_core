import type { ReactNode } from 'react';
import { AppHeader } from '@/components/organisms';

type BreadcrumbItem = {
  label: string;
};

type SettingsPageTemplateProps = {
  title: string;
  description?: string;
  badge?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
  navigation: ReactNode;
  children: ReactNode;
  aside?: ReactNode;
  footerActions?: ReactNode;
  className?: string;
};

export default function SettingsPageTemplate({
  title,
  description,
  badge,
  breadcrumbs = [],
  actions,
  navigation,
  children,
  aside,
  footerActions,
  className = '',
}: SettingsPageTemplateProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      <AppHeader title={title} description={description} badge={badge} breadcrumbs={breadcrumbs} actions={actions} />

      <div className={`grid gap-6 ${aside ? 'xl:grid-cols-[240px_minmax(0,1fr)_280px]' : 'xl:grid-cols-[240px_minmax(0,1fr)]'}`}>
        <aside className="rounded-3xl border border-Zcolor3 bg-white p-4 shadow-sm">{navigation}</aside>

        <section className="rounded-3xl border border-Zcolor3 bg-white p-6 shadow-sm">
          {children}
          {footerActions ? <div className="mt-8 flex flex-wrap gap-3 border-t border-Zcolor3 pt-6">{footerActions}</div> : null}
        </section>

        {aside ? <aside className="rounded-3xl border border-Zcolor3 bg-white p-6 shadow-sm">{aside}</aside> : null}
      </div>
    </div>
  );
}
