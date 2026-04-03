import type { ReactNode } from 'react';
import { HeroBanner } from '@/components/organisms';

type MarketingPageTemplateProps = {
  hero: {
    eyebrow?: string;
    title: string;
    description?: string;
    badge?: string;
    actions?: ReactNode;
    highlights?: ReactNode;
    media?: ReactNode;
  };
  sections: ReactNode;
  socialProof?: ReactNode;
  cta?: ReactNode;
  className?: string;
};

export default function MarketingPageTemplate({
  hero,
  sections,
  socialProof,
  cta,
  className = '',
}: MarketingPageTemplateProps) {
  return (
    <div className={`space-y-8 ${className}`}>
      <HeroBanner {...hero} />
      {socialProof ? <section>{socialProof}</section> : null}
      <section className="space-y-8">{sections}</section>
      {cta ? <section>{cta}</section> : null}
    </div>
  );
}
