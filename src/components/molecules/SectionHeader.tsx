import type { ReactNode } from 'react';

type SectionHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  eyebrow?: string;
  className?: string;
};

export default function SectionHeader({
  title,
  description,
  action,
  eyebrow,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between ${className}`}>
      <div>
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.16em] text-Zcolor10">{eyebrow}</p> : null}
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-Zcolor13">{title}</h2>
        {description ? <p className="mt-2 text-sm leading-6 text-gray-600">{description}</p> : null}
      </div>
      {action ? <div className="flex shrink-0 items-center gap-3">{action}</div> : null}
    </div>
  );
}
