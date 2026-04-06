import type { ComponentType, SVGProps } from 'react';
import { cn } from '@/utils/cn';

type IconProps = SVGProps<SVGSVGElement> & {
  as: ComponentType<SVGProps<SVGSVGElement>>;
  size?: number;
};

export default function Icon({ as: Component, size = 20, className, ...props }: IconProps) {
  return <Component width={size} height={size} className={cn('shrink-0', className)} {...props} />;
}
