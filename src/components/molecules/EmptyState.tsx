import type { ReactNode } from 'react';
import { Button } from '@/components/atoms';

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  actionLabel?: string;
  actionHref?: string;
  actionSlot?: ReactNode;
  className?: string;
};

export default function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  actionHref,
  actionSlot,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`rounded-3xl border border-dashed border-Zcolor3 bg-white p-8 text-center shadow-sm ${className}`}>
      {icon ? <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-Zcolor1 text-Zcolor13">{icon}</div> : null}
      <h3 className="mt-4 text-xl font-semibold text-Zcolor13">{title}</h3>
      {description ? <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-600">{description}</p> : null}
      {actionSlot ? <div className="mt-6 flex justify-center">{actionSlot}</div> : null}
      {!actionSlot && actionLabel && actionHref ? (
        <div className="mt-6 flex justify-center">
          <Button href={actionHref}>{actionLabel}</Button>
        </div>
      ) : null}
    </div>
  );
}
