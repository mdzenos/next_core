import Link from 'next/link';

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
    <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-Zcolor13">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-gray-600">{description}</p>
      </div>

      <div className="mt-8">{children}</div>

      <div className="mt-6 text-center text-sm text-gray-600">
        <span>{footerText} </span>
        {footerLinkHref && footerLinkLabel ? (
          <Link
            href={footerLinkHref}
            className="font-semibold text-Zcolor13 transition hover:opacity-80"
          >
            {footerLinkLabel}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
