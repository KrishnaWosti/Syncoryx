import type { Metadata } from "next";
import { ArtifactCaption, StoreWorklog } from "@/components/site/Artifacts";
import { CheckList } from "@/components/site/Blocks";
import { CtaBand } from "@/components/site/CtaBand";
import { Faq } from "@/components/site/Faq";
import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Callout, PageHero, ServiceLd, Symptoms } from "@/components/site/ServiceParts";
import { shopifyFaqs } from "@/content/faqs";

const description =
  "Shopify store setup, theme customization, custom app development, store management and conversion-focused improvements. A technical and operational partner for new and established Shopify stores.";

export const metadata: Metadata = {
  title: "Shopify Development, Store Management & Growth",
  description,
  alternates: { canonical: "/services/shopify" },
};

const symptoms = [
  "We need a store live, and the to-do list keeps growing.",
  "Every small theme change waits weeks for a developer.",
  "We have a dozen apps and no idea which ones we still need.",
  "Traffic is fine. The product page and checkout are letting it down.",
];

const tracks = [
  {
    eyebrow: "For new businesses",
    title: "Starting out",
    body: "A store that is set up correctly from day one, so you are not rebuilding it in six months.",
    items: [
      "Shopify store setup and configuration",
      "Theme customization to fit your brand",
      "Product and collection setup",
      "Essential app installation and configuration",
      "Payment and shipping configuration",
      "Marketplace integration",
      "Launch support",
    ],
  },
  {
    eyebrow: "For established stores",
    title: "Already trading",
    body: "Steady hands for a store that has grown past what a founder can maintain between other jobs.",
    items: [
      "Day to day Shopify store management",
      "Theme customization and development",
      "Custom functionality",
      "Custom Shopify app development",
      "Third-party application integration",
      "Product catalog management",
      "Maintenance and optimization",
      "Conversion rate optimization",
      "Site performance improvements",
      "User experience improvements",
    ],
  },
];

const growthWork = [
  "Conversion-focused storefront improvements",
  "Landing page development",
  "Product page optimization",
  "Checkout experience improvements",
  "Analytics and tracking setup",
  "Marketing technology and app integrations",
  "Technical help with advertising and marketing infrastructure",
];

export default function ShopifyPage() {
  return (
    <PageShell>
      <PageHero
        crumbs={[
          { href: "/services", label: "Services" },
          { href: "/services/shopify", label: "Shopify" },
        ]}
        eyebrow="Shopify development, store management and growth"
        title="A Shopify store that is built properly and looked after."
        lead="We set up new stores, take over the running of established ones, and make the improvements that help more visitors become customers. Development, management and the technical side of growth, from one team."
        secondary={{ href: "#what-we-do", label: "What we do" }}
        artifact={
          <>
            <StoreWorklog />
            <ArtifactCaption>
              Illustration with sample tasks: a typical month of store work.
            </ArtifactCaption>
          </>
        }
      />

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <SectionHeading eyebrow="Sound familiar?" title="The store is the business. It rarely gets the time." />
          <Symptoms items={symptoms} />
        </div>
      </section>

      <section id="what-we-do" className="section bg-mist">
        <div className="wrap">
          <SectionHeading eyebrow="What we do" title="Wherever your store is today.">
            The work is different for a brand launching next month and a store with five
            years of orders behind it. We do both.
          </SectionHeading>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {tracks.map((track) => (
              <article
                key={track.title}
                className="rounded-[14px] border border-line bg-paper p-7 sm:p-9"
              >
                <p className="t-eyebrow">{track.eyebrow}</p>
                <h3 className="t-h2 mt-4 !text-[clamp(1.6rem,2.6vw,2.2rem)]">{track.title}</h3>
                <p className="t-body mt-3 max-w-md">{track.body}</p>
                <CheckList items={track.items} className="mt-7 border-t border-line pt-7" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="Growth work" title="The technical side of growth.">
              Marketing brings people to the store. What happens next depends on pages,
              checkout, speed and tracking. That part is ours.
            </SectionHeading>
            <CheckList items={growthWork} className="mt-9" />
          </div>

          <Callout
            eyebrow="A straight answer"
            title="We do not guarantee sales, revenue or ad results."
            tone="outline"
          >
            <p>
              Nobody honest can. Sales depend on your product, your pricing and your market.
            </p>
            <p>
              What we take responsibility for is the foundation: a store that loads fast,
              reads clearly, checks out smoothly and reports accurately. That is what gives
              your marketing a fair chance to work.
            </p>
          </Callout>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <SectionHeading eyebrow="Questions" title="About Shopify work." />
          <Faq items={shopifyFaqs} />
        </div>
      </section>

      <CtaBand
        title="Show us the store. We will tell you what we would fix first."
        body="Book a free 30-minute call. Whether you are launching or already trading, we assess where the store is and how we would help."
      />
      <ServiceLd
        name="Shopify development, store management and growth"
        description={description}
        path="/services/shopify"
      />
    </PageShell>
  );
}
