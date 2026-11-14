import type { Metadata } from "next";
import { WorkList } from "@/components/site/Blocks";
import { CtaBand } from "@/components/site/CtaBand";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/ServiceParts";
import { workDisclaimer } from "@/content/work";

export const metadata: Metadata = {
  title: "Work: Marketplace Integrations & Shopify Builds",
  description:
    "Selected Syncoryx engagements: a Shopify to eBay integration, multi-marketplace inventory and order sync, and an end-to-end Shopify store build and launch.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <PageShell>
      <PageHero
        crumbs={[{ href: "/work", label: "Work" }]}
        eyebrow="Work"
        title="Recent work, described plainly."
        lead="A few engagements that show the kind of problems we take on, what we did about them and what changed. Client names stay private."
      />

      <section className="section bg-mist">
        <div className="wrap">
          <WorkList detailed />
          <p className="t-body mt-10 max-w-3xl border-l-2 border-signal pl-5 text-[1rem]">
            {workDisclaimer}
          </p>
        </div>
      </section>

      <CtaBand
        title="Have a problem that looks like one of these?"
        body="Book a free 30-minute call and walk us through it. We will tell you how we would approach it."
      />
    </PageShell>
  );
}
