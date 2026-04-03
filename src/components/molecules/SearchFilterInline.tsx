import type { ReactNode } from 'react';
import { Button, Select } from '@/components/atoms';
import { SearchBox } from '@/components/molecules';
import { cn } from '@/utils/cn';

type SearchFilterInlineProps = {
  query: string;
  onQueryChange: (value: string) => void;
  filterValue: string;
  onFilterChange: (value: string) => void;
  filterOptions: Array<{ label: string; value: string }>;
  actionLabel?: string;
  onAction?: () => void;
  rightSlot?: ReactNode;
  className?: string;
};

export default function SearchFilterInline({
  query,
  onQueryChange,
  filterValue,
  onFilterChange,
  filterOptions,
  actionLabel,
  onAction,
  rightSlot,
  className,
}: SearchFilterInlineProps) {
  return (
    <div className={cn('surface-card flex flex-col gap-3 p-3 lg:flex-row lg:items-center', className)}>
      <SearchBox value={query} onChange={onQueryChange} className="flex-1" />

      <Select
        options={filterOptions}
        value={filterValue}
        onChange={(event) => onFilterChange(event.target.value)}
        wrapperClassName="w-full lg:w-56"
      />

      {actionLabel && onAction ? (
        <Button variant="outline" onClick={onAction} className="w-full lg:w-auto">
          {actionLabel}
        </Button>
      ) : null}

      {rightSlot ? <div className="w-full lg:w-auto">{rightSlot}</div> : null}
    </div>
  );
}
