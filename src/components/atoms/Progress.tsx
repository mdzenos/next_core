import type { ComponentProps } from 'react';
import ProgressBar from '@/components/atoms/ProgressBar';

type ProgressProps = ComponentProps<typeof ProgressBar>;

export default function Progress(props: ProgressProps) {
  return <ProgressBar {...props} />;
}
