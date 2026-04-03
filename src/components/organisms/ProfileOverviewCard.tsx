import type { ReactNode } from 'react';
import { Avatar, Badge, Button, Heading, Text } from '@/components/atoms';
import { cn } from '@/utils/cn';

type ProfileOverviewCardProps = {
  name: string;
  role?: string;
  bio?: string;
  imageUrl?: string;
  badges?: string[];
  actions?: ReactNode;
  className?: string;
};

export default function ProfileOverviewCard({
  name,
  role,
  bio,
  imageUrl,
  badges = [],
  actions,
  className,
}: ProfileOverviewCardProps) {
  return (
    <section className={cn('surface-panel space-y-4 p-5', className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <Avatar name={name} imageUrl={imageUrl} className="h-12 w-12" />
          <div className="space-y-1">
            <Heading as="h3" size="md">
              {name}
            </Heading>
            {role ? <Text tone="muted" size="sm">{role}</Text> : null}
          </div>
        </div>

        {actions ?? <Button variant="outline" size="sm">View profile</Button>}
      </div>

      {bio ? <Text tone="muted">{bio}</Text> : null}

      {badges.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {badges.map((badge) => (
            <Badge key={badge}>{badge}</Badge>
          ))}
        </div>
      ) : null}
    </section>
  );
}
