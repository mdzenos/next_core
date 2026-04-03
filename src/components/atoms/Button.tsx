import Link from 'next/link';
import { MouseEventHandler, ReactNode } from 'react';
import Spinner from '@/components/atoms/Spinner';
import {
  atomButtonBaseClass,
  atomButtonSizeClasses,
  atomButtonVariantClasses,
} from '@/components/atoms/styles';
import { cn } from '@/utils/cn';

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

  const classes = cn(
    atomButtonBaseClass,
    atomButtonVariantClasses[variant],
    atomButtonSizeClasses[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} aria-disabled={isDisabled} className={classes}>
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
