import type { HTMLAttributes, ReactNode } from 'react';
import { atomHeadingSizeClasses } from '@/components/atoms/styles';
import { cn } from '@/utils/cn';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingTag = `h${HeadingLevel}`;
type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  children: ReactNode;
  as?: HeadingLevel | HeadingTag;
  size?: HeadingSize;
  gradient?: boolean;
};

export default function Heading({ children, as = 2, size = 'lg', gradient = false, className, ...props }: HeadingProps) {
  const level = typeof as === 'string' ? as.replace('h', '') : String(as);
  const Component = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Component className={cn(atomHeadingSizeClasses[size], gradient ? 'text-gradient-brand' : 'text-Zcolor14', className)} {...props}>
      {children}
    </Component>
  );
}
