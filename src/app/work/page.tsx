import type { Metadata } from "next";
import { PageShell } from "@/components/site/PageShell";
import { Work, Contact } from "@/components/site/Sections";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Shopify Data & Integrations Work (Examples)",
  description:
    "Examples of Syncoryx work: catalog dedupe, feed reconciliation, GA4/GTM event model alignment, and multi-channel integration stabilization for Shopify stores.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <PageShell>
      <section className="container pt-12 sm:pt-16 lg:pt-20">
        <Reveal>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Work that reduces drift across channels.
          </h1>
          <p className="mt-4 text-sm sm:text-base leading-7 text-white/70 max-w-2xl">
            The goal isn’t “more dashboards.” It’s one consistent story across
            Shopify, analytics, email, and paid channels.
          </p>
        </Reveal>
      </section>
      <Work />
      <Contact />
    </PageShell>
  );
}

