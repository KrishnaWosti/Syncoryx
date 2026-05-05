import type { Metadata } from "next";
import { PageShell } from "@/components/site/PageShell";
import { Process, FAQ, Contact } from "@/components/site/Sections";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Process: Shopify Catalog Cleanup, Flows & Integrations",
  description:
    "Syncoryx process: map sources of truth, clean the Shopify catalog substrate, connect flows + integrations, then prevent drift with checks and playbooks.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <PageShell>
      <section className="container pt-12 sm:pt-16 lg:pt-20">
        <Reveal>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            A practical process for cleaner Shopify data.
          </h1>
          <p className="mt-4 text-sm sm:text-base leading-7 text-white/70 max-w-2xl">
            We fix catalog and integration issues in an order that reduces
            risk—so you don’t break URLs, feeds, or reporting continuity.
          </p>
        </Reveal>
      </section>
      <Process />
      <FAQ />
      <Contact />
    </PageShell>
  );
}

