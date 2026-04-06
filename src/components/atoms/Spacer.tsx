import type { CSSProperties } from 'react';

type SpacerProps = {
  size?: number | string;
  axis?: 'vertical' | 'horizontal';
};

export default function Spacer({ size = 16, axis = 'vertical' }: SpacerProps) {
  const resolvedSize = typeof size === 'number' ? `${size}px` : size;
  const style = {
    width: axis === 'horizontal' ? resolvedSize : undefined,
    height: axis === 'vertical' ? resolvedSize : undefined,
    flexShrink: 0,
  } satisfies CSSProperties;

  return <div aria-hidden="true" style={style} />;
}
