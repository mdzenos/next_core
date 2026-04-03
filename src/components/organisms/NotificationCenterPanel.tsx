import type { ReactNode } from 'react';
import { Heading } from '@/components/atoms';
import { EmptyResultNotice, NotificationListItem } from '@/components/molecules';
import { cn } from '@/utils/cn';

type NotificationTone = 'brand' | 'success' | 'warning' | 'danger' | 'neutral';

type NotificationItem = {
  id: string;
  actorName: string;
  actorImageUrl?: string;
  title: string;
  description?: string;
  timeLabel?: string;
  tone?: NotificationTone;
  unread?: boolean;
  meta?: ReactNode;
};

type NotificationCenterPanelProps = {
  title?: string;
  items: NotificationItem[];
  emptyActionLabel?: string;
  onEmptyAction?: () => void;
  onActionItem?: (id: string) => void;
  className?: string;
};

export default function NotificationCenterPanel({
  title = 'Thong bao',
  items,
  emptyActionLabel,
  onEmptyAction,
  onActionItem,
  className,
}: NotificationCenterPanelProps) {
  return (
    <section className={cn('space-y-4', className)}>
      <Heading as="h3" size="md">
        {title}
      </Heading>

      {items.length > 0 ? (
        <div className="space-y-3">
          {items.map((item) => (
            <NotificationListItem
              key={item.id}
              id={item.id}
              actorName={item.actorName}
              actorImageUrl={item.actorImageUrl}
              title={item.title}
              description={item.description}
              timeLabel={item.timeLabel}
              tone={item.tone}
              unread={item.unread}
              meta={item.meta}
              actionLabel={onActionItem ? 'Xem' : undefined}
              onAction={onActionItem}
            />
          ))}
        </div>
      ) : (
        <EmptyResultNotice
          title="Khong co thong bao"
          description="Ban dang cap nhat va khong co thong bao moi nao."
          actionLabel={emptyActionLabel}
          onAction={onEmptyAction}
        />
      )}
    </section>
  );
}
