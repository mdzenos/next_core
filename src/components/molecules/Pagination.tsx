import { Button } from '@/components/atoms';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  getHref?: (page: number) => string;
  className?: string;
};

function getVisiblePages(currentPage: number, totalPages: number) {
  const pages = new Set<number>([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);

  return Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((left, right) => left - right);
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  getHref,
  className = '',
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);
  const pages = getVisiblePages(safeCurrentPage, totalPages);

  const renderPageButton = (page: number) => {
    const isActive = page === safeCurrentPage;
    const commonProps = {
      size: 'sm' as const,
      variant: isActive ? ('primary' as const) : ('outline' as const),
      className: 'min-w-10',
    };

    if (getHref) {
      return (
        <Button key={page} href={getHref(page)} {...commonProps}>
          {page}
        </Button>
      );
    }

    return (
      <Button key={page} onClick={() => onPageChange?.(page)} {...commonProps}>
        {page}
      </Button>
    );
  };

  return (
    <nav aria-label="Pagination" className={`flex flex-wrap items-center justify-between gap-3 ${className}`}>
      <p className="text-sm text-gray-500">
        Trang <span className="font-semibold text-Zcolor13">{safeCurrentPage}</span> / {totalPages}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onPageChange?.(safeCurrentPage - 1)}
          disabled={!onPageChange || safeCurrentPage === 1}
        >
          Trước
        </Button>

        {pages.map((page, index) => {
          const previousPage = pages[index - 1];
          const needsGap = typeof previousPage === 'number' && page - previousPage > 1;

          return (
            <div key={`page-group-${page}`} className="flex items-center gap-2">
              {needsGap ? <span className="px-1 text-sm text-gray-400">...</span> : null}
              {renderPageButton(page)}
            </div>
          );
        })}

        <Button
          size="sm"
          variant="outline"
          onClick={() => onPageChange?.(safeCurrentPage + 1)}
          disabled={!onPageChange || safeCurrentPage === totalPages}
        >
          Sau
        </Button>
      </div>
    </nav>
  );
}
