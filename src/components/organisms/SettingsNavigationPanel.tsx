import { Heading } from '@/components/atoms';
import { SettingsNavItem } from '@/components/molecules';
import { cn } from '@/utils/cn';

type NavItem = {
  key: string;
  href: string;
  label: string;
  description?: string;
  active?: boolean;
};

type SettingsNavigationPanelProps = {
  title?: string;
  items: NavItem[];
  className?: string;
};

export default function SettingsNavigationPanel({
  title = 'Danh muc cai dat',
  items,
  className,
}: SettingsNavigationPanelProps) {
  return (
    <section className={cn('surface-panel space-y-3 p-4', className)}>
      <Heading as="h3" size="sm">
        {title}
      </Heading>
      <div className="space-y-2">
        {items.map((item) => (
          <SettingsNavItem
            key={item.key}
            href={item.href}
            label={item.label}
            description={item.description}
            active={item.active}
          />
        ))}
      </div>
    </section>
  );
}
