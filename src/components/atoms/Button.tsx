'use client';
import React from 'react';
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean; };
export function Button({ children, className = '', ...props }: Props) {
  const base = 'inline-flex items-center gap-2 px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700';
  return <button {...props} className={`${base} ${className}`}>{children}</button>;
}
