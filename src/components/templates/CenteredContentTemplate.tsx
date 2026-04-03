import type { ReactNode } from 'react';
import { Badge } from '@/components/atoms';

type CenteredContentTemplateProps = {
  title: string;
  description?: string;
  badge?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export default function CenteredContentTemplate({
  title,
  description,
  badge,
  children,
  footer,
  className = '',
}: CenteredContentTemplateProps) {
  return (
    <section className={`mx-auto w-full max-w-3xl ${className}`}>
      <div className="rounded-[2rem] border border-Zcolor3 bg-white p-8 shadow-sm md:p-10">
        <div className="text-center">
          {badge ? <Badge>{badge}</Badge> : null}
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-Zcolor13">{title}</h1>
          {description ? <p className="mt-3 text-sm leading-6 text-gray-600">{description}</p> : null}
        </div>

        <div className="mt-8">{children}</div>

        {footer ? <div className="mt-8 border-t border-Zcolor3 pt-6">{footer}</div> : null}
      </div>
    </section>
  );
}
