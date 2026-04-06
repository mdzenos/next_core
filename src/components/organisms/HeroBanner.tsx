import type { ReactNode } from 'react';
import { Badge } from '@/components/atoms';

type HeroBannerProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  badge?: string;
  actions?: ReactNode;
  highlights?: ReactNode;
  media?: ReactNode;
  className?: string;
};

export default function HeroBanner({
  eyebrow,
  title,
  description,
  badge,
  actions,
  highlights,
  media,
  className = '',
}: HeroBannerProps) {
  return (
    <section className={`overflow-hidden rounded-[2rem] border border-Zcolor3 bg-linear-to-br from-white via-Zcolor1 to-Zcolor2 p-8 shadow-sm md:p-10 ${className}`}>
      <div className={`grid gap-8 ${media ? 'lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-center' : 'grid-cols-1'}`}>
        <div>
          {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.16em] text-Zcolor10">{eyebrow}</p> : null}
          {badge ? <Badge className="mt-3">{badge}</Badge> : null}
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-Zcolor13 md:text-5xl">{title}</h1>
          {description ? <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">{description}</p> : null}
          {actions ? <div className="mt-6 flex flex-wrap gap-3">{actions}</div> : null}
          {highlights ? <div className="mt-8">{highlights}</div> : null}
        </div>

        {media ? (
          <div className="rounded-[1.75rem] border border-white/70 bg-white/80 p-4 shadow-lg backdrop-blur-sm md:p-6">{media}</div>
        ) : null}
      </div>
    </section>
  );
}
