import type { ReactNode } from 'react';

export type DataTableColumn<T> = {
  key: string;
  header: ReactNode;
  cell: (item: T, index: number) => ReactNode;
  className?: string;
  headerClassName?: string;
};

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  rows: T[];
  rowKey: (item: T, index: number) => string;
  emptyMessage?: string;
  caption?: string;
  className?: string;
};

export default function DataTable<T>({
  columns,
  rows,
  rowKey,
  emptyMessage = 'Không có dữ liệu để hiển thị.',
  caption,
  className = '',
}: DataTableProps<T>) {
  return (
    <div className={`overflow-hidden rounded-3xl border border-Zcolor3 bg-white shadow-sm ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          {caption ? <caption className="sr-only">{caption}</caption> : null}

          <thead className="bg-Zcolor1">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={`px-4 py-3 text-left text-sm font-semibold text-Zcolor13 ${column.headerClassName ?? ''}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10 text-center text-sm text-gray-500">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row, index) => (
                <tr key={rowKey(row, index)} className="border-t border-Zcolor3 align-top">
                  {columns.map((column) => (
                    <td key={column.key} className={`px-4 py-4 text-sm text-gray-700 ${column.className ?? ''}`}>
                      {column.cell(row, index)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
