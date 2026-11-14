import Link from "next/link";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { bookHref, jsonLd, site } from "@/lib/site";

/** Page hero for inner pages: breadcrumb, headline, lead, calls to action and an optional artifact. */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  artifact,
  secondary,
}: {
  crumbs: { href: string; label: string }[];
  eyebrow: string;
  title: string;
  lead: string;
  artifact?: ReactNode;
  secondary?: { href: string; label: string };
}) {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ href: "/", label: "Home" }, ...crumbs].map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: site.url + crumb.href,
    })),
  };

  return (
    <section className="border-b border-line">
      <div
        className={cn(
          "wrap grid grid-cols-1 gap-12 pb-16 pt-10 lg:gap-16 lg:pb-24 lg:pt-14",
          artifact && "lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center",
        )}
      >
        <div className="min-w-0">
          <nav aria-label="Breadcrumb" className="t-mono text-ink-mute">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-ink">
                  Home
                </Link>
              </li>
              {crumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  {index === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-ink">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link href={crumb.href} className="hover:text-ink">
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <p className="t-eyebrow mt-10">{eyebrow}</p>
          <h1 className={cn("t-h1 mt-5", artifact ? "max-w-[16ch]" : "max-w-[20ch]")}>
            {title}
          </h1>
          <p className="t-lead mt-6 max-w-xl">{lead}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={bookHref} arrow>
              Book a free call
            </ButtonLink>
            {secondary ? (
              <ButtonLink href={secondary.href} variant="outline">
                {secondary.label}
              </ButtonLink>
            ) : null}
          </div>
        </div>

        {artifact ? <div className="min-w-0">{artifact}</div> : null}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbLd) }}
      />
    </section>
  );
}

/** "Sound familiar?" list: the symptoms a visitor recognises. */
export function Symptoms({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-x-12 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="t-h3 border-t border-line py-6 !font-medium text-ink"
        >
          &ldquo;{item}&rdquo;
        </li>
      ))}
    </ul>
  );
}

/** A plain statement block, used for positioning notes and honest caveats. */
export function Callout({
  eyebrow,
  title,
  children,
  tone = "tint",
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  tone?: "tint" | "outline";
}) {
  return (
    <div
      className={cn(
        "rounded-[14px] p-7 sm:p-10",
        tone === "tint" ? "bg-signal-tint" : "border border-line bg-paper",
      )}
    >
      <p className="t-eyebrow !text-signal">{eyebrow}</p>
      <h3 className="t-h2 mt-4 max-w-[24ch] !text-[clamp(1.4rem,2.4vw,2rem)]">{title}</h3>
      <div className="t-body mt-4 max-w-2xl space-y-3">{children}</div>
    </div>
  );
}

/** Service structured data for a single service page. */
export function ServiceLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: site.url + path,
    provider: { "@id": site.url + "/#org" },
    areaServed: "Worldwide",
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />
  );
}
