import type { Metadata } from "next";
import { CheckList } from "@/components/site/Blocks";
import { CtaBand } from "@/components/site/CtaBand";
import { Faq } from "@/components/site/Faq";
import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { PageHero } from "@/components/site/ServiceParts";
import { processFaqs } from "@/content/faqs";

export const metadata: Metadata = {
  title: "How We Work: From Free Call to Ongoing Management",
  description:
    "How a Syncoryx engagement runs: a free assessment call, a written plan, implementation, and ongoing monitoring, maintenance and support.",
  alternates: { canonical: "/process" },
};

const steps = [
  {
    title: "Free assessment call",
    body: "Thirty minutes on a video call, booked through Calendly. You show us the store, the channels or the app, and what is not working.",
    youGet: "A straight read on the problem and whether we are the right team for it.",
  },
  {
    title: "A written plan",
    body: "We put the scope on paper: what we will do, which tools we recommend and why, what it costs and what we need from you.",
    youGet: "A plan you can read, question and compare before you commit to anything.",
  },
  {
    title: "Implementation",
    body: "We set up, configure, migrate and test. Changes are checked against real orders and real listings before they go live.",
    youGet: "Working integrations, a working store, or a support desk that is answering tickets.",
  },
  {
    title: "Ongoing management",
    body: "We monitor what we built, fix what drifts and handle the day to day changes, for as long as you want us to.",
    youGet: "One team that already knows your setup when something needs attention.",
  },
];

const needs = [
  "Access to the relevant accounts: store, seller accounts, apps or helpdesk",
  "One point of contact who can make decisions",
  "An honest picture of what is and is not working today",
  "Any constraints we should know about: budget, deadlines, tools you must keep",
];

export default function ProcessPage() {
  return (
    <PageShell>
      <PageHero
        crumbs={[{ href: "/process", label: "How we work" }]}
        eyebrow="How we work"
        title="From first call to steady state."
        lead="Every engagement follows the same four steps, whether it is a marketplace integration, a store build or a support desk. You always know what happens next and what it will cost."
      />

      <section className="section">
        <div className="wrap">
          <ol>
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="grid gap-6 border-t border-line py-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,5fr)_minmax(0,4fr)] lg:gap-12 lg:py-12"
              >
                <span className="t-mono text-signal">Step {index + 1}</span>
                <div>
                  <h2 className="t-h2 !text-[clamp(1.5rem,2.6vw,2.15rem)]">{step.title}</h2>
                  <p className="t-body mt-4 max-w-xl">{step.body}</p>
                </div>
                <div className="rounded-[14px] bg-mist p-6">
                  <p className="t-eyebrow">What you get</p>
                  <p className="mt-2 font-medium leading-snug">{step.youGet}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <SectionHeading eyebrow="Your side" title="What we need from you.">
            Not much, but all of it matters.
          </SectionHeading>
          <div className="rounded-[14px] border border-line bg-paper p-7 sm:p-9">
            <CheckList items={needs} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <SectionHeading eyebrow="Questions" title="About working with us." />
          <Faq items={processFaqs} />
        </div>
      </section>

      <CtaBand title="Step one is free." />
    </PageShell>
  );
}
