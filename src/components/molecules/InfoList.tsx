import type { ReactNode } from 'react';

type InfoItem = {
  label: string;
  value: ReactNode;
  hint?: string;
};

type InfoListProps = {
  items: InfoItem[];
  columns?: 1 | 2;
  className?: string;
};

const columnClasses: Record<NonNullable<InfoListProps['columns']>, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
};

export default function InfoList({ items, columns = 1, className = '' }: InfoListProps) {
  return (
    <dl className={`grid gap-4 ${columnClasses[columns]} ${className}`}>
      {items.map((item) => (
        <div key={item.label} className="rounded-2xl border border-Zcolor3 bg-Zcolor1/40 p-4">
          <dt className="text-sm font-medium text-gray-500">{item.label}</dt>
          <dd className="mt-2 text-sm font-semibold text-Zcolor13">{item.value}</dd>
          {item.hint ? <p className="mt-2 text-sm text-gray-500">{item.hint}</p> : null}
        </div>
      ))}
    </dl>
  );
}
