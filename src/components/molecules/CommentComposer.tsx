import type { FormEvent } from 'react';
import { Avatar, Button, Textarea } from '@/components/atoms';
import { cn } from '@/utils/cn';

type CommentComposerProps = {
  value: string;
  onValueChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  authorName?: string;
  authorImageUrl?: string;
  submitLabel?: string;
  disabled?: boolean;
  className?: string;
};

export default function CommentComposer({
  value,
  onValueChange,
  onSubmit,
  placeholder = 'Nhap binh luan...',
  authorName = 'User',
  authorImageUrl,
  submitLabel = 'Gui',
  disabled = false,
  className,
}: CommentComposerProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!disabled) {
      onSubmit?.();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn('surface-card space-y-3 p-4', className)}>
      <div className="flex items-start gap-3">
        <Avatar name={authorName} imageUrl={authorImageUrl} />
        <div className="flex-1">
          <Textarea
            value={value}
            onChange={(event) => onValueChange(event.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            rows={4}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" size="sm" disabled={disabled || !value.trim()}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
