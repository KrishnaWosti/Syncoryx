import type { Metadata } from "next";
import { ArtifactCaption, TicketThread } from "@/components/site/Artifacts";
import { CheckList } from "@/components/site/Blocks";
import { CtaBand } from "@/components/site/CtaBand";
import { Faq } from "@/components/site/Faq";
import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Callout, PageHero, ServiceLd } from "@/components/site/ServiceParts";
import { appSupportFaqs } from "@/content/faqs";

const description =
  "Outsourced, human customer support for Shopify app developers and eCommerce SaaS. A shared pool of eCommerce-trained support professionals for live chat, email, onboarding, troubleshooting and escalations.";

export const metadata: Metadata = {
  title: "Customer Support for Shopify Apps & eCommerce SaaS",
  description,
  alternates: { canonical: "/services/app-support" },
};

const reasons = [
  {
    title: "Onboarding",
    body: "A merchant installs your app, hits a setting they do not understand, and leaves before they see what it can do.",
  },
  {
    title: "Configuration",
    body: "Every store is set up differently. Themes, other apps and marketplaces all change how your product behaves.",
  },
  {
    title: "Troubleshooting",
    body: "When something looks broken, merchants want a person to look at their store, not a link to an article.",
  },
];

const services = [
  "First-line customer support",
  "Live chat and email support",
  "Customer onboarding assistance",
  "Technical troubleshooting",
  "Application setup guidance",
  "Ticket management",
  "Escalation coordination with your developers",
  "Documentation and knowledge base help",
  "Customer feedback collection",
  "Support workflow management",
  "Flexible coverage based on your requirements",
];

const comparison = [
  {
    topic: "Cost",
    inHouse: "Salaries, tools and management for a full team, whether tickets are busy or quiet.",
    shared: "A shared team sized to your ticket volume. No full-time hires to justify.",
  },
  {
    topic: "Getting started",
    inHouse: "Recruit, hire and train before the first ticket is answered.",
    shared: "Trained support professionals who onboard to your product and start.",
  },
  {
    topic: "eCommerce knowledge",
    inHouse: "New hires learn Shopify, marketplaces and integrations on your time.",
    shared: "They already work with stores, marketplaces and apps every day.",
  },
  {
    topic: "Cover",
    inHouse: "One person away can mean an empty inbox.",
    shared: "A pool, so support continues when someone is out.",
  },
  {
    topic: "Growth",
    inHouse: "Each jump in installs means another hiring round.",
    shared: "Coverage scales with your install base.",
  },
  {
    topic: "Your developers",
    inHouse: "Pulled into the inbox whenever it overflows.",
    shared: "Focused on the product. Escalations arrive with context.",
  },
];

const onboarding = [
  {
    title: "Learn your product",
    body: "Your docs, a walkthrough, your most common tickets and your tone of voice. We write internal notes as we go.",
  },
  {
    title: "Go live on first line",
    body: "We start answering in your helpdesk, under your brand, on the channels and hours agreed.",
  },
  {
    title: "Escalate with context",
    body: "Anything that needs a developer goes to your team with store details and steps to reproduce.",
  },
  {
    title: "Feed it back",
    body: "Recurring questions become help articles. Recurring complaints become a feedback report for your roadmap.",
  },
];

export default function AppSupportPage() {
  return (
    <PageShell>
      <PageHero
        crumbs={[
          { href: "/services", label: "Services" },
          { href: "/services/app-support", label: "App support" },
        ]}
        eyebrow="For Shopify app developers and eCommerce SaaS"
        title="Human support for your app, without building a support team."
        lead="Trained, eCommerce-fluent support professionals from a shared pool handle onboarding, setup questions and troubleshooting for your users. Your customers get a person. Your developers get their time back."
        secondary={{ href: "#the-model", label: "How the model works" }}
        artifact={
          <>
            <TicketThread />
            <ArtifactCaption>
              Illustration with sample content: a first-line reply and a developer escalation.
            </ArtifactCaption>
          </>
        }
      />

      <section className="section">
        <div className="wrap">
          <SectionHeading
            eyebrow="The problem"
            title="Even automated products need people."
          >
            Your app may run itself. The merchants using it still need help getting started,
            getting configured and getting unstuck.
          </SectionHeading>

          <ul className="mt-12 grid gap-x-12 lg:grid-cols-3">
            {reasons.map((reason) => (
              <li key={reason.title} className="border-t-2 border-ink py-6">
                <h3 className="t-h3">{reason.title}</h3>
                <p className="t-body mt-2 text-[1rem]">{reason.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <SectionHeading eyebrow="What we handle" title="The whole support function, or the part you are missing." />
          <div className="rounded-[14px] border border-line bg-paper p-7 sm:p-9">
            <CheckList items={services} columns />
          </div>
        </div>
      </section>

      <section id="the-model" className="section">
        <div className="wrap">
          <SectionHeading eyebrow="The model" title="Hiring a team, or sharing ours.">
            For a small or growing app, a dedicated in-house support team is expensive and
            hard to manage. A shared pool gives you the function without the overhead.
          </SectionHeading>

          <div className="mt-12 overflow-hidden rounded-[14px] border border-line">
            <div className="hidden grid-cols-[minmax(0,2fr)_minmax(0,4fr)_minmax(0,4fr)] border-b border-line bg-mist md:grid">
              <span className="t-eyebrow p-5"> </span>
              <span className="t-eyebrow border-l border-line p-5">Building in-house</span>
              <span className="t-eyebrow border-l border-line p-5 !text-signal">
                Syncoryx shared team
              </span>
            </div>
            {comparison.map((row) => (
              <div
                key={row.topic}
                className="grid border-b border-line last:border-b-0 md:grid-cols-[minmax(0,2fr)_minmax(0,4fr)_minmax(0,4fr)]"
              >
                <h3 className="t-h3 p-5 pb-2 md:pb-5">{row.topic}</h3>
                <p className="px-5 py-2 text-[1rem] text-ink-mute md:border-l md:border-line md:p-5">
                  <span className="t-eyebrow mb-1 block md:hidden">Building in-house</span>
                  {row.inHouse}
                </p>
                <p className="bg-signal-tint px-5 py-4 text-[1rem] font-medium text-ink md:border-l md:border-line md:p-5">
                  <span className="t-eyebrow mb-1 block !text-signal md:hidden">
                    Syncoryx shared team
                  </span>
                  {row.shared}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-18 lg:pb-28">
        <div className="wrap">
          <Callout
            eyebrow="What this is not"
            title="Not a pool of inexpensive virtual assistants."
          >
            <p>
              Our support professionals understand how online stores, integrations,
              marketplaces and Shopify applications work, because that is the other half of
              what Syncoryx does every day.
            </p>
            <p>
              That is the difference between pasting a help article and actually finding out
              why a merchant&apos;s orders are not importing.
            </p>
          </Callout>
        </div>
      </section>

      <section className="section on-dark">
        <div className="wrap">
          <SectionHeading eyebrow="Getting started" title="How we take on your support.">
            A short, structured handover. You stay in control of tone, policy and anything
            that touches the product.
          </SectionHeading>
          <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {onboarding.map((step, index) => (
              <li key={step.title} className="border-t-2 border-white pt-5">
                <span className="t-mono text-[#aab2ff]">Step {index + 1}</span>
                <h3 className="t-h3 mt-3">{step.title}</h3>
                <p className="t-body mt-3 text-[1rem]">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <SectionHeading eyebrow="Questions" title="About app support." />
          <Faq items={appSupportFaqs} />
        </div>
      </section>

      <CtaBand
        title="Tell us about your app and your inbox."
        body="Book a free 30-minute call. We look at your product, your ticket volume and the coverage you need, and show you how a shared support team would work for you."
      />
      <ServiceLd
        name="Dedicated customer support for Shopify apps and SaaS businesses"
        description={description}
        path="/services/app-support"
      />
    </PageShell>
  );
}
