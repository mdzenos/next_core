import { Heading, Text } from '@/components/atoms';

type FeatureCardProps = {
  title: string;
  description: string;
};

export default function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="surface-card space-y-2 p-6">
      <Heading as="h3" size="sm">
        {title}
      </Heading>
      <Text tone="muted" size="sm">
        {description}
      </Text>
    </div>
  );
}
