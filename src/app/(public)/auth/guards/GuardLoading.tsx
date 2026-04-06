'use client';

import { Spinner } from '@/components/atoms';

type GuardLoadingProps = {
  message?: string;
  className?: string;
  textClassName?: string;
};

export default function GuardLoading({
  message = 'Đang kiểm tra phiên đăng nhập...',
  className = '',
  textClassName = '',
}: GuardLoadingProps) {
  return (
    <div className={`flex min-h-[50vh] flex-col items-center justify-center gap-3 ${className}`}>
      <Spinner size="md" className="text-Zcolor13" />
      <span className={`text-sm ${textClassName}`}>{message}</span>
    </div>
  );
}
