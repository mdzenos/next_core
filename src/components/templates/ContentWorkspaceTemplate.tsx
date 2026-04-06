import type { ReactNode } from 'react';
import { Container } from '@/components/atoms';

type ContentWorkspaceTemplateProps = {
  header?: ReactNode;
  filters?: ReactNode;
  sidebar?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export default function ContentWorkspaceTemplate({
  header,
  filters,
  sidebar,
  children,
  footer,
  className = '',
}: ContentWorkspaceTemplateProps) {
  return (
    <Container className={`space-y-6 py-6 ${className}`}>
      {header ? <header className="space-y-4">{header}</header> : null}
      {filters ? <section>{filters}</section> : null}

      <div className={`grid gap-6 ${sidebar ? 'lg:grid-cols-[260px_minmax(0,1fr)]' : 'grid-cols-1'}`}>
        {sidebar ? <aside className="space-y-4">{sidebar}</aside> : null}
        <main className="space-y-6">{children}</main>
      </div>

      {footer ? <footer>{footer}</footer> : null}
    </Container>
  );
}
