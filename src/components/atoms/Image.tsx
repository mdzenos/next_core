'use client';

import NextImage, { type ImageProps as NextImageProps } from 'next/image';
import { useState } from 'react';
import ImageFallback from '@/components/atoms/ImageFallback';
import { cn } from '@/utils/cn';

type ImageProps = NextImageProps & {
  fallback?: React.ReactNode;
  wrapperClassName?: string;
};

export default function Image({ fallback, wrapperClassName, className, alt, ...props }: ImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn('relative overflow-hidden', wrapperClassName)}>
      {failed ? (
        <ImageFallback className="absolute inset-0">{fallback}</ImageFallback>
      ) : (
        <NextImage {...props} alt={alt} className={className} onError={() => setFailed(true)} />
      )}
    </div>
  );
}
