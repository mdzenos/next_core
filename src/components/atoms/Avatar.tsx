// src/components/atoms/Avatar.tsx
'use client';
import Image from 'next/image';

interface AvatarProps {
  src: string;
  size?: number;       // Kích thước avatar (px), default 40
  alt?: string;
}

export default function Avatar({ src, size = 40, alt = 'avatar' }: AvatarProps) {
  return (
    <Image
      src={src}
      width={size}
      height={size}
      alt={alt}
      className="rounded-full object-cover border-2 border-yellow-400 shadow-sm"
    />
  );
}
