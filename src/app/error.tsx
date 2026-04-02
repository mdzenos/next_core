// src/app/error.tsx
'use client';
import { ReactNode } from 'react';

export default function RootError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-4">
      <h2>Có lỗi xảy ra:</h2>
      <pre>{error.message}</pre>
      <button onClick={() => reset()}>Thử lại</button>
    </div>
  );
}
