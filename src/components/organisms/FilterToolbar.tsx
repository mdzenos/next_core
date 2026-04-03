import type { ReactNode } from 'react';

type FilterToolbarProps = {
  title?: string;
  description?: string;
  searchSlot?: ReactNode;
  filtersSlot?: ReactNode;
  actionsSlot?: ReactNode;
  className?: string;
};

export default function FilterToolbar({
  title,
  description,
  searchSlot,
  filtersSlot,
  actionsSlot,
  className = '',
}: FilterToolbarProps) {
  return (
    <section
      className={`rounded-3xl border border-Zcolor3 bg-white p-5 shadow-sm ${className}`}
    >
      {(title || description) && (
        <div className="mb-4">
          {title ? <h2 className="text-lg font-semibold text-Zcolor13">{title}</h2> : null}
          {description ? <p className="mt-1 text-sm text-gray-600">{description}</p> : null}
        </div>
      )}

      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
          {searchSlot ? <div className="min-w-[220px] flex-1">{searchSlot}</div> : null}
          {filtersSlot ? <div className="flex flex-wrap items-center gap-3">{filtersSlot}</div> : null}
        </div>

        {actionsSlot ? <div className="flex flex-wrap items-center gap-3">{actionsSlot}</div> : null}
      </div>
    </section>
  );
}
