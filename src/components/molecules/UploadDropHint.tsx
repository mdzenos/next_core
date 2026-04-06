import type { ChangeEventHandler, ReactNode } from 'react';
import { FileInput, HelperText, Text } from '@/components/atoms';
import { cn } from '@/utils/cn';

type UploadDropHintProps = {
  label?: string;
  hint?: string;
  acceptedText?: string;
  error?: string;
  helper?: ReactNode;
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

export default function UploadDropHint({
  label = 'Tai tep dinh kem',
  hint,
  acceptedText = 'Chap nhan: PDF, DOCX, XLSX',
  error,
  helper,
  className,
  onChange,
}: UploadDropHintProps) {
  return (
    <div className={cn('surface-panel space-y-3 p-4', className)}>
      <Text className="font-semibold">{label}</Text>
      <FileInput hint={hint} error={error} onChange={onChange} />
      <HelperText className="mt-0">{acceptedText}</HelperText>
      {helper ? <div>{helper}</div> : null}
    </div>
  );
}
