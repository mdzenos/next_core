import type { ReactNode } from 'react';
import { Avatar, Badge, Button, Text } from '@/components/atoms';
import { cn } from '@/utils/cn';

type NotificationTone = 'brand' | 'success' | 'warning' | 'danger' | 'neutral';

type NotificationListItemProps = {
  id: string;
  actorName: string;
  actorImageUrl?: string;
  title: string;
  description?: string;
  timeLabel?: string;
  tone?: NotificationTone;
  unread?: boolean;
  actionLabel?: string;
  onAction?: (id: string) => void;
  meta?: ReactNode;
  className?: string;
};

const toneToBadge: Record<NotificationTone, string> = {
  brand: 'brand',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  neutral: 'neutral',
};

export default function NotificationListItem({
  id,
  actorName,
  actorImageUrl,
  title,
  description,
  timeLabel,
  tone = 'brand',
  unread = false,
  actionLabel,
  onAction,
  meta,
  className,
}: NotificationListItemProps) {
  return (
    <article className={cn('surface-card space-y-3 p-4', unread && 'ring-brand', className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <Avatar name={actorName} imageUrl={actorImageUrl} />
          <div className="min-w-0 space-y-1">
            <Text className="font-semibold">{title}</Text>
            {description ? <Text tone="muted" size="sm">{description}</Text> : null}
            {meta ? <div>{meta}</div> : null}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge>{toneToBadge[tone]}</Badge>
          {timeLabel ? <Text tone="muted" size="xs">{timeLabel}</Text> : null}
        </div>
      </div>

      {actionLabel && onAction ? (
        <div className="flex justify-end">
          <Button size="sm" variant="outline" onClick={() => onAction(id)}>
            {actionLabel}
          </Button>
        </div>
      ) : null}
    </article>
  );
}
