import Link from 'next/link';
import { CenteredContentTemplate } from '@/components/templates';

type AuthTemplateProps = {
  title: string;
  description: string;
  footerText: string;
  footerLinkHref?: string;
  footerLinkLabel?: string;
  children: React.ReactNode;
};

export default function AuthTemplate({
  title,
  description,
  footerText,
  footerLinkHref,
  footerLinkLabel,
  children,
}: AuthTemplateProps) {
  return (
    <CenteredContentTemplate
      title={title}
      description={description}
      className="max-w-md"
      footer={
        <div className="text-center text-sm text-(--text-muted)">
          <span>{footerText} </span>
          {footerLinkHref && footerLinkLabel ? (
            <Link href={footerLinkHref} className="font-semibold text-Zcolor13 transition hover:opacity-80">
              {footerLinkLabel}
            </Link>
          ) : null}
        </div>
      }
    >
      {children}
    </CenteredContentTemplate>
  );
}
