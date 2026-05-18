import type { Metadata } from "next";
import { PageShell } from "@/components/site/PageShell";
import { Services, Contact } from "@/components/site/Sections";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Shopify Services: Catalog, Integrations, Web Dev & Theme",
  description:
    "Syncoryx services: catalog cleanup, duplicate detection, flows, multi-channel and multi-platform integrations, web development, and theme customization for Shopify stores.",
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
            We fix the hidden layer that breaks attribution, ads, and
            fulfillment—and build the storefront layer that converts: product
            data, integrations, flows, web development, and theme customization.
          </p>
        </Reveal>
      </section>
      <Services tightTop />
      <Contact />
    </PageShell>
  );
}

