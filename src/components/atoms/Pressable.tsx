import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type PressableProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export default function Pressable({ children, className, type = 'button', ...props }: PressableProps) {
  return (
    <button
      type={type}
      className={cn('transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50', className)}
      {...props}
    >
      {children}
    </button>
  );
}
