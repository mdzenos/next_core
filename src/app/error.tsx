'use client';

import { useEffect } from 'react';
import Button from '@/components/atoms/Button';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function RootError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Root error boundary caught an error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-10">
      <div className="w-full max-w-xl rounded-3xl bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-2xl">
          ⚠️
        </div>

        <h1 className="mt-6 text-2xl font-bold text-primary">Đã xảy ra lỗi không mong muốn</h1>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Ứng dụng vừa gặp một lỗi runtime trong quá trình render hoặc xử lý dữ liệu. Bạn có thể thử
          tải lại phần hiện tại hoặc quay về trang chủ.
        </p>

        {error?.message ? (
          <div className="mt-6 rounded-2xl bg-gray-50 p-4 text-left">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Error message
            </p>
            <p className="mt-2 break-words text-sm text-red-600">{error.message}</p>
          </div>
        ) : null}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button type="button" onClick={reset as never} variant="primary" size="lg">
            Thử lại
          </Button>

          <Button href="/" variant="outline" size="lg">
            Về trang chủ
          </Button>
        </div>
      </div>
    </div>
  );
}
