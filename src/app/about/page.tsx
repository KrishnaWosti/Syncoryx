import type { Metadata } from "next";
import { CtaBand } from "@/components/site/CtaBand";
import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { PageHero } from "@/components/site/ServiceParts";
import { CheckIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "About Syncoryx: An eCommerce Operations Partner",
  description:
    "Syncoryx is an eCommerce growth, technology and support partner. We work with online retailers and brands, and with the software companies that serve them.",
  alternates: { canonical: "/about" },
};

const weAre = [
  "A technical and operational partner for eCommerce",
  "Hands-on in Shopify, marketplaces and the apps between them",
  "Accountable for the work we take on, after launch as well as before",
  "Useful to merchants and to the software teams that serve them",
];

const weAreNot = [
  "A generic website development shop",
  "An advertising agency, or a source of revenue guarantees",
  "A marketplace of inexpensive virtual assistants",
  "Consultants who hand over a document and leave",
];

const beliefs = [
  {
    title: "Operations decide who grows",
    body: "Most stores do not stall for lack of ideas. They stall because inventory drifts, orders get stuck and nobody has time to fix the checkout. That is the work we like.",
  },
  {
    title: "Responsibility beats advice",
    body: "Telling a merchant which app to install is easy. Installing it, configuring it and answering for it when it misbehaves is the useful part.",
  },
  {
    title: "People still matter",
    body: "Software can automate a great deal. A merchant who is stuck still wants a person who understands their store. So do your customers.",
  },
];

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        crumbs={[{ href: "/about", label: "About" }]}
        eyebrow="About Syncoryx"
        title="An eCommerce operations team, not a generic web agency."
        lead="Syncoryx helps businesses build, expand, manage and grow their eCommerce operations. We work on both sides of the ecosystem: with the retailers and brands who sell, and with the software companies whose apps they rely on."
      />

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <SectionHeading eyebrow="Why both sides" title="Each half makes the other better." />
          <div className="t-lead max-w-2xl space-y-6">
            <p>
              Setting up and managing stores and marketplace integrations means we see, every
              day, where merchants get confused and where apps fall short.
            </p>
            <p>
              Supporting the users of Shopify apps means we see, every day, how integrations
              behave across many different store setups.
            </p>
            <p className="text-ink">
              The result is a support team that understands stores, and an integration team
              that understands the software. Most agencies have one or the other.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="wrap">
          <SectionHeading eyebrow="Positioning" title="What we are, and what we are not." />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <div className="rounded-[14px] border border-line bg-paper p-7 sm:p-9">
              <h3 className="t-h3">Syncoryx is</h3>
              <ul className="mt-6 space-y-4">
                {weAre.map((item) => (
                  <li key={item} className="flex gap-3 leading-snug">
                    <CheckIcon className="mt-1 shrink-0 text-signal" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[14px] border border-line p-7 sm:p-9">
              <h3 className="t-h3 text-ink-mute">Syncoryx is not</h3>
              <ul className="mt-6 space-y-4 text-ink-soft">
                {weAreNot.map((item) => (
                  <li key={item} className="flex gap-3 leading-snug">
                    <span className="mt-[0.7rem] h-0.5 w-3.5 shrink-0 bg-ink-mute" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHeading eyebrow="What we believe" title="Three things we keep coming back to." />
          <ul className="mt-12 grid gap-x-12 lg:grid-cols-3">
            {beliefs.map((belief) => (
              <li key={belief.title} className="border-t-2 border-ink py-6">
                <h3 className="t-h3">{belief.title}</h3>
                <p className="t-body mt-3 text-[1rem]">{belief.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title="Meet the team on a call." />
    </PageShell>
  );
}
