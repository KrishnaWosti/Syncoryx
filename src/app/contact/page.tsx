import type { Metadata } from "next";
import { PageShell } from "@/components/site/PageShell";
import { Contact, FAQ } from "@/components/site/Sections";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Contact Syncoryx (Shopify Data, Flows & Integrations)",
  description:
    "Contact Syncoryx for Shopify catalog cleanup, duplicate detection, flow setup, and multi-channel integrations. Get a data + flows audit plan within 1 business day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <PageShell>
      <section className="container pt-12 sm:pt-16 lg:pt-20">
        <Reveal>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Contact Syncoryx
          </h1>
          <p className="mt-4 text-sm sm:text-base leading-7 text-white/70 max-w-2xl">
            If your store has duplicates, feed mismatches, tracking drift, or
            unstable flows, we’ll map the root cause and create a fix plan.
          </p>
        </Reveal>
      </section>
      <Contact />
      <FAQ />
    </PageShell>
  );
}

