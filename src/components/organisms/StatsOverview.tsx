import { Text } from '@/components/atoms';

type StatTone = 'default' | 'accent' | 'soft';

type StatItem = {
  label: string;
  value: string;
  description?: string;
  tone?: StatTone;
};

type StatsOverviewProps = {
  items: StatItem[];
  columns?: 2 | 3 | 4;
  className?: string;
};

const toneClasses: Record<StatTone, string> = {
  default: 'surface-card text-Zcolor13',
  accent: 'bg-linear-to-br from-Zcolor15 to-Zcolor13 text-white border-transparent',
  soft: 'surface-muted text-Zcolor13',
};

const columnClasses: Record<NonNullable<StatsOverviewProps['columns']>, string> = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
};

export default function StatsOverview({
  items,
  columns = 4,
  className = '',
}: StatsOverviewProps) {
  return (
    <section className={`grid grid-cols-1 gap-4 ${columnClasses[columns]} ${className}`}>
      {items.map((item) => {
        const tone = item.tone ?? 'default';

        return (
          <article
            key={`${item.label}-${item.value}`}
            className={`rounded-3xl border p-5 shadow-sm ${toneClasses[tone]}`}
          >
            <Text size="sm" className={tone === 'accent' ? 'text-white/80' : 'text-(--text-muted)'}>{item.label}</Text>
            <p className="mt-3 text-3xl font-bold tracking-tight">{item.value}</p>
            {item.description ? (
              <Text size="sm" className={tone === 'accent' ? 'mt-2 text-white/85' : 'mt-2 text-(--text-muted)'}>
                {item.description}
              </Text>
            ) : null}
          </article>
        );
      })}
    </section>
  );
}
