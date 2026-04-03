import Button from '@/components/atoms/Button';

type BreadcrumbItem = {
  label: string;
};

type BreadcrumbTrailProps = {
  items: BreadcrumbItem[];
  onSelect?: (index: number) => void;
  emptyLabel?: string;
};

export default function BreadcrumbTrail({
  items,
  onSelect,
  emptyLabel = 'Danh sách chức năng',
}: BreadcrumbTrailProps) {
  if (items.length === 0) {
    return <span className="truncate text-xs text-slate-500">{emptyLabel}</span>;
  }

  return (
    <div className="flex flex-wrap items-center gap-x-1 text-xs text-slate-500">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={`${item.label}-${index}`} className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onSelect?.(index)}
              className={`truncate transition hover:text-Zcolor13 ${
                isLast ? 'font-medium text-Zcolor13' : ''
              }`}
              title={item.label}
            >
              {item.label}
            </button>

            {!isLast ? <span className="text-slate-400">/</span> : null}
          </div>
        );
      })}
    </div>
  );
}
