import type { Metadata } from "next";
import { PageShell } from "@/components/site/PageShell";
import { Services, Contact } from "@/components/site/Sections";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Shopify Services: Catalog Cleanup, Dedupe, Flows & Integrations",
  description:
    "Syncoryx services: Shopify product catalog cleanup, duplicate detection, Shopify Flow setup, GA4/GTM + Klaviyo integrations, and multi-channel feed integrity.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <PageShell>
      <section className="container pt-12 sm:pt-16 lg:pt-20">
        <Reveal>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Shopify data services that keep your store consistent everywhere.
          </h1>
          <p className="mt-4 text-sm sm:text-base leading-7 text-white/70 max-w-2xl">
            We specialize in fixing the hidden layer that breaks attribution,
            ads, and fulfillment: product data, event tracking, flows, and
            multi‑channel integrations.
          </p>
        </Reveal>
      </section>
      <Services tightTop />
      <Contact />
    </PageShell>
  );
}

