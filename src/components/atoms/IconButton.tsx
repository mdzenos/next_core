import { ButtonHTMLAttributes, ReactNode } from 'react';
import { atomIconButtonClass } from '@/components/atoms/styles';
import { cn } from '@/utils/cn';

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  label: string;
  className?: string;
};

export default function IconButton({ children, label, className, type = 'button', ...props }: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(atomIconButtonClass, className)}
      {...props}
    >
      {children}
    </button>
  );
}
