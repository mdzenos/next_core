import type { ComponentProps } from 'react';
import Image from '@/components/atoms/Image';

type BlurImageProps = Omit<ComponentProps<typeof Image>, 'placeholder'> & {
  blurDataURL?: string;
};

const defaultBlurDataURL =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iODAiIGZpbGw9IiNlYmY3ZmIiLz48L3N2Zz4=';

export default function BlurImage({ blurDataURL = defaultBlurDataURL, ...props }: BlurImageProps) {
  return <Image {...props} placeholder="blur" blurDataURL={blurDataURL} />;
}
