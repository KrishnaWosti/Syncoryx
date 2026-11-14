import { PlusIcon } from "@/components/ui/icons";
import { jsonLd } from "@/lib/site";

export type FaqItem = { q: string; a: string };

/** Accordion built on native details/summary, with FAQPage structured data. */
export function Faq({ items }: { items: FaqItem[] }) {
  const structured = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div className="border-t border-line">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-line">
          <summary className="flex items-start justify-between gap-6 py-5 text-left">
            <span className="t-h3">{item.q}</span>
            <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-transform duration-200 group-open:rotate-45 group-open:border-ink">
              <PlusIcon width={12} height={12} />
            </span>
          </summary>
          <p className="t-body max-w-2xl pb-6 pr-10">{item.a}</p>
        </details>
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(structured) }}
      />
    </div>
  );
}
