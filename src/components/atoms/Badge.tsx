import { ReactNode } from 'react';

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export default function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full bg-secondary px-4 py-2 text-sm font-medium text-primary ${className}`}
    >
      {children}
    </span>
  );
}
