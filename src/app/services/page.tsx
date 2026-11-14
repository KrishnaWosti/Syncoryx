import type { Metadata } from "next";
import { PillarRows, SupportingList } from "@/components/site/Blocks";
import { CtaBand } from "@/components/site/CtaBand";
import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { PageHero } from "@/components/site/ServiceParts";
import { pillars } from "@/content/services";
import { jsonLd, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "eCommerce Services: Marketplaces, Shopify & App Support",
  description:
    "Syncoryx services: marketplace integration and multi-channel operations, Shopify development and store management, and dedicated customer support for Shopify apps and SaaS.",
  alternates: { canonical: "/services" },
};

const servicesLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: pillars.map((pillar, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      name: pillar.title,
      description: pillar.summary,
      url: site.url + pillar.href,
      provider: { "@id": site.url + "/#org" },
    },
  })),
};

export default function ServicesPage() {
  return (
    <PageShell>
      <PageHero
        crumbs={[{ href: "/services", label: "Services" }]}
        eyebrow="Services"
        title="Everything it takes to build, expand and run eCommerce."
        lead="Three core services, each delivered end to end: we choose the tools, do the setup, fix what breaks and stay on to manage it. Plus the supporting work that keeps a catalog and a store in good order."
      />

      <section className="section">
        <div className="wrap">
          <SectionHeading eyebrow="Core services" title="Three things we do, end to end." />
          <div className="mt-12">
            <PillarRows />
          </div>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <SectionHeading eyebrow="Supporting services" title="The work around the work.">
            Usually part of a wider engagement, and available on their own when that is all
            you need.
          </SectionHeading>
          <SupportingList />
        </div>
      </section>

      <CtaBand
        title="Not sure which of these you need?"
        body="That is what the free call is for. Book 30 minutes, describe the problem, and we will tell you which service fits, or whether none of them do."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(servicesLd) }}
      />
    </PageShell>
  );
}
