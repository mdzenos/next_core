import type { ReactNode } from 'react';
import { AppHeader } from '@/components/organisms';

type BreadcrumbItem = {
  label: string;
};

type TeamPortalTemplateProps = {
  title: string;
  description?: string;
  badge?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
  navigation?: ReactNode;
  profileCard: ReactNode;
  timeline: ReactNode;
  preferences?: ReactNode;
  className?: string;
};

export default function TeamPortalTemplate({
  title,
  description,
  badge,
  breadcrumbs = [],
  actions,
  navigation,
  profileCard,
  timeline,
  preferences,
  className = '',
}: TeamPortalTemplateProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      <AppHeader title={title} description={description} badge={badge} breadcrumbs={breadcrumbs} actions={actions} />

      <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="space-y-6">{navigation}</aside>
        <section className="space-y-6">
          {profileCard}
          {timeline}
          {preferences ? preferences : null}
        </section>
      </div>
    </div>
  );
}
