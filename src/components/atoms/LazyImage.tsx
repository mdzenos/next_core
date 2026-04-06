import type { ComponentProps } from 'react';
import Image from '@/components/atoms/Image';

type LazyImageProps = Omit<ComponentProps<typeof Image>, 'loading'>;

export default function LazyImage(props: LazyImageProps) {
  return <Image {...props} loading="lazy" wrapperClassName={[props.wrapperClassName, 'surface-card overflow-hidden'].filter(Boolean).join(' ')} />;
}
