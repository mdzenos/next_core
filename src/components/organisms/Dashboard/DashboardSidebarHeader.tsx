import { ArrowLeftIcon, HomeIcon } from '@heroicons/react/24/outline';
import BreadcrumbTrail from '@/components/molecules/BreadcrumbTrail';

type BreadcrumbItem = {
  label: string;
};

type DashboardSidebarHeaderProps = {
  title: string;
  items: BreadcrumbItem[];
  onGoRoot: () => void;
  onGoBack: () => void;
  onSelectLevel: (index: number) => void;
  canGoBack?: boolean;
};

export default function DashboardSidebarHeader({
  title,
  items,
  onGoRoot,
  onGoBack,
  onSelectLevel,
  canGoBack = false,
}: DashboardSidebarHeaderProps) {
  return (
    <div className="mb-6">
      <div className="grid grid-cols-[36px_minmax(0,1fr)_36px] items-center gap-3 px-2">
        <button
          type="button"
          onClick={onGoRoot}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-Zcolor3 bg-white text-Zcolor13 transition hover:bg-Zcolor1"
          aria-label="Về menu gốc"
          title="Về menu gốc"
        >
          <HomeIcon className="h-6 w-6" />
        </button>

        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold uppercase tracking-[0.18em] text-Zcolor10/80">
            {title}
          </h2>

          <div className="mt-1">
            <BreadcrumbTrail
              items={items}
              onSelect={onSelectLevel}
              emptyLabel="Danh sách chức năng"
            />
          </div>
        </div>

        {canGoBack ? (
          <button
            type="button"
            onClick={onGoBack}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-Zcolor3 bg-white text-Zcolor13 transition hover:bg-Zcolor1"
            aria-label="Quay lại"
            title="Quay lại"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
