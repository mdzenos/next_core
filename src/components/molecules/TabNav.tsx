import { Button } from '@/components/atoms';

type TabItem = {
  label: string;
  value: string;
  href?: string;
  disabled?: boolean;
};

type TabNavProps = {
  items: TabItem[];
  activeValue: string;
  onChange?: (value: string) => void;
  className?: string;
};

export default function TabNav({ items, activeValue, onChange, className = '' }: TabNavProps) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {items.map((item) => {
        const isActive = item.value === activeValue;

        if (item.href) {
          return (
            <Button key={item.value} href={item.href} variant={isActive ? 'primary' : 'outline'} size="sm" className="rounded-full">
              {item.label}
            </Button>
          );
        }

        return (
          <Button
            key={item.value}
            type="button"
            variant={isActive ? 'primary' : 'outline'}
            size="sm"
            className="rounded-full"
            disabled={item.disabled}
            onClick={() => onChange?.(item.value)}
          >
            {item.label}
          </Button>
        );
      })}
    </div>
  );
}
