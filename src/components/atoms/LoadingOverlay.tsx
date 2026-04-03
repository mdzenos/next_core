import type { ReactNode } from 'react';
import Overlay from '@/components/atoms/Overlay';
import Spinner from '@/components/atoms/Spinner';
import Text from '@/components/atoms/Text';
import { Center } from '@/components/atoms';
import { atomFloatingClass } from '@/components/atoms/styles';
import { cn } from '@/utils/cn';

type LoadingOverlayProps = {
  loading?: boolean;
  label?: ReactNode;
  className?: string;
};

export default function LoadingOverlay({ loading = true, label = 'Loading...', className }: LoadingOverlayProps) {
  if (!loading) {
    return null;
  }

  return (
    <Overlay className={className}>
      <Center className="h-full w-full p-4">
        <div className={cn(atomFloatingClass, 'flex min-w-48 flex-col items-center gap-3 rounded-3xl px-5 py-4')}>
          <Spinner size="lg" className="text-Zcolor13" />
          <Text size="sm" tone="brand">{label}</Text>
        </div>
      </Center>
    </Overlay>
  );
}
