type FaqItem = {
  question: string;
  answer: string;
};

type FaqSectionProps = {
  title: string;
  description?: string;
  items: FaqItem[];
  className?: string;
};

export default function FaqSection({ title, description, items, className = '' }: FaqSectionProps) {
  return (
    <section className={`rounded-3xl border border-Zcolor3 bg-white p-6 shadow-sm ${className}`}>
      <div className="max-w-3xl">
        <h2 className="text-2xl font-bold tracking-tight text-Zcolor13">{title}</h2>
        {description ? <p className="mt-3 text-sm leading-6 text-gray-600">{description}</p> : null}
      </div>

      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <details key={item.question} className="group rounded-2xl border border-Zcolor3 bg-Zcolor1/40 p-5">
            <summary className="cursor-pointer list-none text-base font-semibold text-Zcolor13">
              <span className="flex items-center justify-between gap-4">
                <span>{item.question}</span>
                <span className="text-xl leading-none text-gray-400 transition group-open:rotate-45">+</span>
              </span>
            </summary>
            <p className="mt-4 text-sm leading-7 text-gray-600">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
