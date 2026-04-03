import type { ReactNode } from 'react';
import { Alert, Button, Divider } from '@/components/atoms';

type ConfirmActionProps = {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?: 'primary' | 'secondary' | 'outline';
  onConfirm?: () => void;
  onCancel?: () => void;
  message?: string;
  messageVariant?: 'success' | 'error' | 'info' | 'warning';
  extra?: ReactNode;
  className?: string;
};

export default function ConfirmAction({
  title,
  description,
  confirmLabel = 'Xác nhận',
  cancelLabel = 'Hủy',
  confirmVariant = 'primary',
  onConfirm,
  onCancel,
  message,
  messageVariant = 'warning',
  extra,
  className = '',
}: ConfirmActionProps) {
  return (
    <div className={`rounded-3xl border border-Zcolor3 bg-white p-6 shadow-sm ${className}`}>
      <h3 className="text-lg font-semibold text-Zcolor13">{title}</h3>
      {description ? <p className="mt-2 text-sm leading-6 text-gray-600">{description}</p> : null}
      {message ? <Alert message={message} variant={messageVariant} className="mt-4" /> : null}
      {extra ? (
        <>
          <Divider className="my-5" />
          <div>{extra}</div>
        </>
      ) : null}
      <div className="mt-6 flex flex-wrap gap-3">
        <Button type="button" variant={confirmVariant} onClick={onConfirm}>
          {confirmLabel}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          {cancelLabel}
        </Button>
      </div>
    </div>
  );
}
