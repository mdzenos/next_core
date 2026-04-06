import type { ReactNode } from 'react';
import { Avatar, Divider, Heading, Text } from '@/components/atoms';
import { CommentComposer } from '@/components/molecules';
import { cn } from '@/utils/cn';

type CommentItem = {
  id: string;
  authorName: string;
  authorImageUrl?: string;
  content: string;
  timeLabel?: string;
  meta?: ReactNode;
};

type CommentThreadPanelProps = {
  title?: string;
  comments: CommentItem[];
  composeValue: string;
  onComposeValueChange: (value: string) => void;
  onSubmitComment?: () => void;
  className?: string;
};

export default function CommentThreadPanel({
  title = 'Thao luan',
  comments,
  composeValue,
  onComposeValueChange,
  onSubmitComment,
  className,
}: CommentThreadPanelProps) {
  return (
    <section className={cn('surface-panel space-y-4 p-5', className)}>
      <Heading as="h3" size="md">
        {title}
      </Heading>

      <div className="space-y-3">
        {comments.map((comment, index) => (
          <div key={comment.id} className="space-y-2">
            <div className="flex items-start gap-3">
              <Avatar name={comment.authorName} imageUrl={comment.authorImageUrl} />
              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <Text className="font-semibold">{comment.authorName}</Text>
                  {comment.timeLabel ? <Text tone="muted" size="xs">{comment.timeLabel}</Text> : null}
                </div>
                <Text size="sm">{comment.content}</Text>
                {comment.meta ? <div>{comment.meta}</div> : null}
              </div>
            </div>
            {index < comments.length - 1 ? <Divider /> : null}
          </div>
        ))}
      </div>

      <CommentComposer value={composeValue} onValueChange={onComposeValueChange} onSubmit={onSubmitComment} />
    </section>
  );
}
