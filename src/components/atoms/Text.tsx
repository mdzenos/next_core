import type { HTMLAttributes, ReactNode } from 'react';
import { atomTextSizeClasses, atomTextToneClasses } from '@/components/atoms/styles';
import { cn } from '@/utils/cn';

type TextTone = 'default' | 'muted' | 'brand' | 'danger' | 'success';
type TextSize = 'xs' | 'sm' | 'md' | 'lg';

type TextProps = HTMLAttributes<HTMLParagraphElement> & {
  children: ReactNode;
  tone?: TextTone;
  size?: TextSize;
};

export default function Text({ children, tone = 'default', size = 'md', className, ...props }: TextProps) {
  return (
    <p className={cn(atomTextSizeClasses[size], atomTextToneClasses[tone], className)} {...props}>
      {children}
    </p>
  );
}
