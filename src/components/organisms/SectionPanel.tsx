import type { ReactNode } from 'react';
import { Badge } from '@/components/atoms';
import { SectionHeader } from '@/components/molecules';

type SectionPanelProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  badge?: string;
  action?: ReactNode;
  toolbar?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export default function SectionPanel({
  title,
  description,
  eyebrow,
  badge,
  action,
  toolbar,
  footer,
  children,
  className = '',
  contentClassName = '',
}: SectionPanelProps) {
  return (
    <section className={`surface-card p-6 ${className}`}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <SectionHeader title={title} description={description} eyebrow={eyebrow} action={action} />
          {badge ? <Badge>{badge}</Badge> : null}
        </div>

        {toolbar ? <div className="border-b border-(--border-subtle) pb-4">{toolbar}</div> : null}

        <div className={contentClassName}>{children}</div>

        {footer ? <div className="border-t border-(--border-subtle) pt-4">{footer}</div> : null}
      </div>
    </section>
  );
}
