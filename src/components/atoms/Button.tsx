import Link from 'next/link';
import { MouseEventHandler, ReactNode } from 'react';
import Spinner from '@/components/atoms/Spinner';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  children: ReactNode;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  isLoading?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-Zcolor13 text-white hover:bg-Zcolor14',
  secondary: 'bg-Zcolor5 text-Zcolor15 hover:bg-Zcolor6',
  outline: 'border border-Zcolor13 text-Zcolor13 hover:bg-Zcolor13 hover:text-white',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-5 py-3 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  children,
  href,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  isLoading = false,
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  const classes = `inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={isDisabled}>
      {isLoading ? <Spinner size="sm" className="text-current" /> : null}
      {children}
    </button>
  );
}
