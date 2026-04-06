import type { ReactNode } from 'react';
import { Button } from '@/components/atoms';
import EmptyState from '@/components/molecules/EmptyState';

type EmptyResultNoticeProps = {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  illustration?: ReactNode;
  className?: string;
};

export default function EmptyResultNotice({
  title = 'Khong tim thay ket qua',
  description = 'Thu doi bo loc hoac tu khoa tim kiem de co ket qua phu hop hon.',
  actionLabel,
  onAction,
  illustration,
  className,
}: EmptyResultNoticeProps) {
  return (
    <div className={className}>
      <EmptyState
        title={title}
        description={description}
        illustration={illustration}
        actions={
          actionLabel && onAction ? (
            <Button variant="outline" size="sm" onClick={onAction}>
              {actionLabel}
            </Button>
          ) : undefined
        }
      />
    </div>
  );
}
