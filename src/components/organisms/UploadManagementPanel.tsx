import type { ChangeEventHandler, ReactNode } from 'react';
import { Heading } from '@/components/atoms';
import { KeyValueGrid, UploadDropHint } from '@/components/molecules';
import { cn } from '@/utils/cn';

type UploadManagementPanelProps = {
  title?: string;
  hint?: string;
  acceptedText?: string;
  error?: string;
  metadata?: Array<{ key: string; label: ReactNode; value: ReactNode }>;
  helperSlot?: ReactNode;
  className?: string;
  onFileChange?: ChangeEventHandler<HTMLInputElement>;
};

export default function UploadManagementPanel({
  title = 'Quan ly tep tai len',
  hint,
  acceptedText,
  error,
  metadata = [],
  helperSlot,
  className,
  onFileChange,
}: UploadManagementPanelProps) {
  return (
    <section className={cn('space-y-4', className)}>
      <Heading as="h3" size="md">
        {title}
      </Heading>

      <UploadDropHint
        hint={hint}
        acceptedText={acceptedText}
        error={error}
        helper={helperSlot}
        onChange={onFileChange}
      />

      {metadata.length > 0 ? <KeyValueGrid items={metadata} columns={2} /> : null}
    </section>
  );
}
