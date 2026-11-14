import type { Metadata } from "next";
import { ArtifactCaption } from "@/components/site/Artifacts";
import { CtaBand } from "@/components/site/CtaBand";
import { Faq } from "@/components/site/Faq";
import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Callout, PageHero, ServiceLd, Symptoms } from "@/components/site/ServiceParts";
import { SyncBoard } from "@/components/site/SyncBoard";
import { marketplaceFaqs } from "@/content/faqs";

const description =
  "End-to-end marketplace integration for eCommerce brands: Shopify, Etsy, Walmart Marketplace, TikTok Shop, eBay, Faire and Square. Setup, catalog, inventory, pricing and order sync, plus ongoing management.";

export const metadata: Metadata = {
  title: "Marketplace Integration & Multi-Channel eCommerce Operations",
  description,
  alternates: { canonical: "/services/marketplace-integration" },
};

const symptoms = [
  "We oversold because stock on one channel did not update in time.",
  "Listings keep getting rejected and nobody can tell us why.",
  "Orders from one marketplace are still copied in by hand.",
  "We have three connector apps installed and trust none of them.",
];

const phases = [
  {
    title: "Choose",
    body: "The right channels and the right tools for your catalog.",
    items: [
      "Review of your catalog, order volume and fulfilment",
      "Which marketplaces fit your products",
      "Connector apps and tools compared and recommended",
    ],
  },
  {
    title: "Set up",
    body: "Accounts, connections and mappings, configured correctly.",
    items: [
      "Marketplace onboarding and account configuration",
      "Existing store connected to each marketplace",
      "Categories, attributes and variants mapped",
    ],
  },
  {
    title: "Sync",
    body: "One set of numbers, everywhere you sell.",
    items: [
      "Product catalog synchronization",
      "Inventory and pricing synchronization",
      "Order synchronization and workflow setup",
    ],
  },
  {
    title: "Run",
    body: "Someone watching it after go-live.",
    items: [
      "Integration monitoring and management",
      "Troubleshooting sync and listing errors",
      "Product listing management across channels",
    ],
  },
];

const platformNotes = [
  {
    name: "Shopify",
    note: "Usually the hub. Products, inventory and pricing are managed here and pushed out to every other channel.",
  },
  {
    name: "Etsy",
    note: "Listing setup, variation mapping and order sync for handmade, vintage and niche catalogs.",
  },
  {
    name: "Walmart Marketplace",
    note: "Seller onboarding, item setup to Walmart's content requirements, and order flow back to your store.",
  },
  {
    name: "TikTok Shop",
    note: "Shop setup, catalog sync and order routing so social sales land in the same workflow as everything else.",
  },
  {
    name: "eBay",
    note: "Listing sync, pricing rules and real-time inventory so auctions and fixed-price listings never oversell.",
  },
  {
    name: "Faire",
    note: "Wholesale catalog and order sync that runs alongside your retail channels, not against them.",
  },
  {
    name: "Square",
    note: "In-person and online stock kept in line, so the shop floor and the website agree.",
  },
];

export default function MarketplaceIntegrationPage() {
  return (
    <PageShell>
      <PageHero
        crumbs={[
          { href: "/services", label: "Services" },
          { href: "/services/marketplace-integration", label: "Marketplace integration" },
        ]}
        eyebrow="Marketplace integration and multi-channel operations"
        title="Sell on every channel without running every channel by hand."
        lead="We connect your store to Etsy, Walmart Marketplace, TikTok Shop, eBay, Faire and more, then keep products, inventory, pricing and orders in sync. Choosing the tools, setting them up and looking after them is our job, not yours."
        secondary={{ href: "#how-it-works", label: "How it works" }}
        artifact={
          <>
            <SyncBoard />
            <ArtifactCaption>
              Illustration with sample data: an order on one channel updates stock on the rest.
            </ArtifactCaption>
          </>
        }
      />

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <SectionHeading eyebrow="Sound familiar?" title="More channels, more ways for things to drift." />
          <Symptoms items={symptoms} />
        </div>
      </section>

      <section id="how-it-works" className="section bg-mist">
        <div className="wrap">
          <SectionHeading eyebrow="End to end" title="From picking the app to watching the sync.">
            This is not a one-off technical setup. We take the integration from the first
            decision through to day to day operation.
          </SectionHeading>

          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {phases.map((phase, index) => (
              <li
                key={phase.title}
                className="flex flex-col rounded-[14px] border border-line bg-paper p-6"
              >
                <span className="t-mono text-signal">Phase {index + 1}</span>
                <h3 className="t-h2 mt-3 !text-[1.75rem]">{phase.title}</h3>
                <p className="t-body mt-2 text-[1rem]">{phase.body}</p>
                <ul className="mt-5 space-y-2.5 border-t border-line pt-5 text-[0.9375rem] leading-snug">
                  {phase.items.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHeading eyebrow="Platforms" title="Where we connect your catalog.">
            Each marketplace has its own rules for listings, categories and orders. Knowing
            them is most of the work.
          </SectionHeading>

          <dl className="mt-12 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {platformNotes.map((platform) => (
              <div key={platform.name} className="border-t border-line py-6">
                <dt className="t-h3">{platform.name}</dt>
                <dd className="t-body mt-2 text-[1rem]">{platform.note}</dd>
              </div>
            ))}
            <div className="border-t border-line py-6">
              <dt className="t-h3 text-ink-mute">Somewhere else?</dt>
              <dd className="t-body mt-2 text-[1rem]">
                Tell us on the call. The method is the same even when the marketplace is not.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="pb-18 lg:pb-28">
        <div className="wrap">
          <Callout
            eyebrow="Why hand this over"
            title="You should not have to become an integration expert to sell in more places."
          >
            <p>
              Working out which app to use, why a sync failed overnight, or how to list the
              same product five different ways is not a good use of a merchant&apos;s week.
            </p>
            <p>
              We help you choose the right tools, implement the integrations, configure
              everything correctly and stay on to support your multi-channel operations.
            </p>
          </Callout>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <SectionHeading eyebrow="Questions" title="About marketplace integration." />
          <Faq items={marketplaceFaqs} />
        </div>
      </section>

      <CtaBand
        title="Which channels should you be on?"
        body="Book a free 30-minute call. We look at your catalog and current setup, and tell you which marketplaces and tools make sense and what it takes to run them."
      />
      <ServiceLd
        name="Marketplace integration and multi-channel eCommerce operations"
        description={description}
        path="/services/marketplace-integration"
      />
    </PageShell>
  );
}
