import type { ReactNode } from 'react';
import { Divider, Heading, Text } from '@/components/atoms';
import { StatusPill } from '@/components/molecules';
import { cn } from '@/utils/cn';

type ActivityTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

type ActivityItem = {
  id: string;
  title: string;
  description?: string;
  time?: string;
  tone?: ActivityTone;
  meta?: ReactNode;
};

type ActivityTimelineProps = {
  title?: string;
  items: ActivityItem[];
  className?: string;
};

export default function ActivityTimeline({
  title = 'Recent activity',
  items,
  className,
}: ActivityTimelineProps) {
  return (
    <section className={cn('surface-card space-y-4 p-5', className)}>
      <Heading as="h3" size="md">
        {title}
      </Heading>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={item.id} className="space-y-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-1">
                <Text className="font-semibold">{item.title}</Text>
                {item.description ? <Text tone="muted" size="sm">{item.description}</Text> : null}
                {item.meta ? <div>{item.meta}</div> : null}
              </div>

              <div className="flex items-center gap-2">
                {item.time ? <Text tone="muted" size="xs">{item.time}</Text> : null}
                <StatusPill tone={item.tone ?? 'neutral'} label={item.tone ?? 'neutral'} className="capitalize" />
              </div>
            </div>

            {index < items.length - 1 ? <Divider /> : null}
          </div>
        ))}
      </div>
    </section>
  );
}
