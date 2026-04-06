import { Heading } from '@/components/atoms';
import { KPIHighlightCard } from '@/components/molecules';
import { cn } from '@/utils/cn';

type KPIItem = {
  key: string;
  title: string;
  value: string;
  subtitle?: string;
  delta?: string;
  deltaTone?: 'success' | 'danger' | 'muted';
};

type KPIOverviewGridProps = {
  title?: string;
  items: KPIItem[];
  className?: string;
};

export default function KPIOverviewGrid({
  title = 'Tong quan chi so',
  items,
  className,
}: KPIOverviewGridProps) {
  return (
    <section className={cn('space-y-4', className)}>
      <Heading as="h3" size="md">
        {title}
      </Heading>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <KPIHighlightCard
            key={item.key}
            title={item.title}
            value={item.value}
            subtitle={item.subtitle}
            delta={item.delta}
            deltaTone={item.deltaTone}
          />
        ))}
      </div>
    </section>
  );
}
