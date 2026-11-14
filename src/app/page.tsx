import { Reveal } from "@/components/motion/Reveal";
import { ArtifactCaption, TicketThread } from "@/components/site/Artifacts";
import {
  ArrowLink,
  PillarRows,
  PlatformStrip,
  ProcessSteps,
  WorkList,
} from "@/components/site/Blocks";
import { CtaBand } from "@/components/site/CtaBand";
import { Faq } from "@/components/site/Faq";
import { Hero } from "@/components/site/Hero";
import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { homeFaqs } from "@/content/faqs";
import { pillars, supportingServices } from "@/content/services";
import { getSiteFields } from "@/lib/site-fields";
import { bookHref, jsonLd, site } from "@/lib/site";

// Rendered per request so copy edited in /admin shows up immediately.
export const revalidate = 0;

const doors = [
  {
    eyebrow: "For retailers and brands",
    title: "I sell products online",
    body: "Launch or fix your Shopify store, expand to Etsy, Walmart, TikTok Shop, eBay and Faire, and keep catalog, inventory and orders in step across all of them.",
    links: [
      { href: "/services/marketplace-integration", label: "Marketplace integration" },
      { href: "/services/shopify", label: "Shopify development and management" },
    ],
  },
  {
    eyebrow: "For app developers and SaaS teams",
    title: "I build software for merchants",
    body: "Give your users real people to talk to. Our eCommerce-trained support team handles onboarding, setup and troubleshooting, so your developers can stay on the product.",
    links: [{ href: "/services/app-support", label: "Support for Shopify apps and SaaS" }],
  },
];

const supportPoints = [
  {
    title: "People who know eCommerce",
    body: "Our support professionals work with stores, marketplaces and integrations every day. They can troubleshoot a merchant's setup, not only read from a script.",
  },
  {
    title: "A shared team, sized to you",
    body: "You draw on a trained pool instead of hiring full-time staff. Coverage follows your requirements and grows with your install base.",
  },
  {
    title: "Developers stay on the product",
    body: "Routine questions never reach your engineers. What does reach them arrives with store details and steps to reproduce.",
  },
];

const principles = [
  {
    title: "We take responsibility",
    body: "When a sync breaks, we chase it across the store, the connector app and the marketplace until it is fixed. You do not have to referee vendors.",
  },
  {
    title: "We work in these tools daily",
    body: "Shopify admin, seller accounts, connector apps, helpdesks. We know where integrations usually fail and what merchants usually get stuck on.",
  },
  {
    title: "We scope honestly",
    body: "We do not promise revenue or ad results. We build the technical and operational foundation growth needs, and say so when something is not worth doing.",
  },
  {
    title: "We stay after launch",
    body: "Setup and ongoing management sit with the same team, so nothing gets lost in a handover and small problems are caught early.",
  },
];

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

export default async function Home() {
  const fields = await getSiteFields();

  return (
    <PageShell footerTagline={fields.footerTagline} email={fields.contactEmail}>
      <Hero fields={fields} />
      <PlatformStrip />

      {/* Two sides of eCommerce */}
      <section className="on-signal">
        <div className="wrap section">
          <SectionHeading
            eyebrow="Who we work with"
            title="Two sides of eCommerce. One team that knows both."
          >
            Working with merchants every day is what makes our support team good. Supporting
            apps every day is what makes our integrations hold.
          </SectionHeading>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {doors.map((door, index) => (
              <Reveal key={door.title} delay={index * 0.06} className="h-full">
                <div className="flex h-full flex-col rounded-[14px] bg-paper p-7 text-ink sm:p-9">
                  <p className="t-eyebrow !text-ink-mute">{door.eyebrow}</p>
                  <h3 className="t-h2 mt-4 !text-[clamp(1.6rem,2.6vw,2.2rem)]">{door.title}</h3>
                  <p className="mt-4 max-w-lg text-ink-soft">{door.body}</p>
                  <ul className="mt-auto space-y-3 pt-8">
                    {door.links.map((link) => (
                      <li key={link.href} className="border-t border-line pt-3">
                        <ArrowLink href={link.href} className="!text-signal">
                          {link.label}
                        </ArrowLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section">
        <div className="wrap">
          <SectionHeading eyebrow="What we take on" title="Three things we do, end to end.">
            Not advice and a handover. We choose the tools, do the setup, fix what breaks and
            stay on to run it.
          </SectionHeading>

          <div className="mt-12">
            <PillarRows />
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <p className="t-eyebrow lg:pt-1">Also on the list</p>
            <div>
              <ul className="flex flex-wrap gap-2">
                {supportingServices.map((service) => (
                  <li
                    key={service.title}
                    className="rounded-full border border-line px-4 py-2 text-[0.9375rem] font-medium"
                  >
                    {service.title}
                  </li>
                ))}
              </ul>
              <ArrowLink href="/services" className="mt-6">
                See all services
              </ArrowLink>
            </div>
          </div>
        </div>
      </section>

      {/* App support, the differentiator */}
      <section className="on-dark">
        <div className="wrap section grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20">
          <div className="min-w-0">
            <SectionHeading
              eyebrow="For Shopify app and SaaS teams"
              title="Your app is automated. Your customers are not."
            >
              Merchants get stuck on onboarding, settings and integrations, and a merchant who
              stays stuck uninstalls. A full in-house support team is hard to justify for a
              growing app. A shared team that already knows eCommerce is not.
            </SectionHeading>

            <ul className="mt-10 space-y-7">
              {supportPoints.map((point) => (
                <li key={point.title} className="border-t border-night-line pt-6">
                  <h3 className="t-h3">{point.title}</h3>
                  <p className="t-body mt-2 max-w-xl text-[1rem]">{point.body}</p>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/services/app-support" variant="light" arrow>
                How app support works
              </ButtonLink>
              <ButtonLink href={bookHref} variant="outline-light">
                Book a free call
              </ButtonLink>
            </div>
          </div>

          <Reveal className="min-w-0 lg:pt-10">
            <TicketThread />
            <p className="t-mono mt-3 !text-[0.6875rem] text-[#8e96b8]">
              Illustration with sample content: a first-line reply and a developer escalation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Work */}
      <section className="section bg-mist">
        <div className="wrap">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow="Recent work" title={fields.workSectionTitle}>
              {fields.workSectionSubtitle}
            </SectionHeading>
            <ArrowLink href="/work" className="shrink-0">
              See the work
            </ArrowLink>
          </div>
          <div className="mt-12">
            <WorkList />
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section">
        <div className="wrap">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow="How we work" title="From first call to steady state.">
              Every engagement starts the same way: a free call, then a plan you can read
              before you commit to anything.
            </SectionHeading>
            <ArrowLink href="/process" className="shrink-0">
              The process in detail
            </ArrowLink>
          </div>
          <div className="mt-12">
            <ProcessSteps />
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="section border-t border-line">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <SectionHeading eyebrow="What to expect" title="A partner, not a ticket queue." />
          <ul className="grid gap-x-12 sm:grid-cols-2">
            {principles.map((principle) => (
              <li key={principle.title} className="border-t border-line py-6">
                <h3 className="t-h3">{principle.title}</h3>
                <p className="t-body mt-2 text-[1rem]">{principle.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-mist">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <SectionHeading eyebrow="Questions" title="Asked before most first calls." />
          <Faq items={homeFaqs} />
        </div>
      </section>

      <CtaBand email={fields.contactEmail} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(servicesLd) }}
      />
    </PageShell>
  );
}
