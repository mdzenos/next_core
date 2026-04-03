import { ReactNode } from 'react';

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export default function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-Zcolor5 bg-Zcolor2 px-3 py-1 text-xs font-semibold text-Zcolor14">
      {children}
    </span>
  );
}
