import type { ReactNode } from 'react';
import type { DataTableColumn } from '@/components/organisms/DataTable';
import { EmptyState, Pagination } from '@/components/molecules';
import DataTable from '@/components/organisms/DataTable';
import SectionPanel from '@/components/organisms/SectionPanel';

type DataExplorerProps<T> = {
  title: string;
  description?: string;
  columns: DataTableColumn<T>[];
  rows: T[];
  rowKey: (item: T, index: number) => string;
  toolbar?: ReactNode;
  actions?: ReactNode;
  caption?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange?: (page: number) => void;
    getHref?: (page: number) => string;
  };
  className?: string;
};

export default function DataExplorer<T>({
  title,
  description,
  columns,
  rows,
  rowKey,
  toolbar,
  actions,
  caption,
  emptyTitle = 'Chưa có dữ liệu',
  emptyDescription = 'Hãy điều chỉnh bộ lọc hoặc thêm dữ liệu mới để tiếp tục.',
  pagination,
  className = '',
}: DataExplorerProps<T>) {
  return (
    <SectionPanel title={title} description={description} action={actions} toolbar={toolbar} className={className}>
      {rows.length > 0 ? (
        <div className="space-y-4">
          <DataTable columns={columns} rows={rows} rowKey={rowKey} caption={caption} />
          {pagination ? <Pagination {...pagination} /> : null}
        </div>
      ) : (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      )}
    </SectionPanel>
  );
}
