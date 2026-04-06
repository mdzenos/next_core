import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type TransitionProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  type?: 'fade' | 'scale' | 'slide-up';
};

const typeClasses = {
  fade: 'transition-opacity duration-300',
  scale: 'transition-transform duration-300',
  'slide-up': 'transition duration-300',
};

export default function Transition({ children, type = 'fade', className, ...props }: TransitionProps) {
  return (
    <div className={cn(typeClasses[type], type === 'slide-up' && 'animate-fade-in-up', className)} {...props}>
      {children}
    </div>
  );
}
