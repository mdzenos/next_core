import type { ReactNode } from 'react';

type SplitScreenTemplateProps = {
  content: ReactNode;
  aside: ReactNode;
  className?: string;
  contentClassName?: string;
  asideClassName?: string;
};

export default function SplitScreenTemplate({
  content,
  aside,
  className = '',
  contentClassName = '',
  asideClassName = '',
}: SplitScreenTemplateProps) {
  return (
    <section className={`grid min-h-[70vh] gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] ${className}`}>
      <div className={`rounded-[2rem] border border-Zcolor3 bg-white p-8 shadow-sm md:p-10 ${contentClassName}`}>
        {content}
      </div>

      <aside className={`rounded-[2rem] bg-linear-to-br from-Zcolor13 via-Zcolor10 to-Zcolor8 p-8 text-white shadow-lg md:p-10 ${asideClassName}`}>
        {aside}
      </aside>
    </section>
  );
}
