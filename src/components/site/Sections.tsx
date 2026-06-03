"use client";

import Image from "next/image";
import { MotionCard } from "@/components/motion/MotionCard";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="max-w-2xl">
      <Reveal>
        <p className="text-xs tracking-[0.18em] uppercase text-white/60">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-white">
          {title}
        </h2>
        <p className="mt-3 text-sm sm:text-base leading-7 text-white/70">
          {subtitle}
        </p>
      </Reveal>
    </div>
  );
}

export function Services({ tightTop = false }: { tightTop?: boolean }) {
  const cards = [
    {
      title: "Product catalog cleanup",
      points: [
        "normalize options, variants, and handle rules",
        "merge duplicates with redirect-safe mapping",
        "collections that stay stable across seasons",
      ],
      glow:
        "bg-[radial-gradient(280px_160px_at_25%_20%,rgba(59,130,246,0.28),transparent_60%)]",
    },
    {
      title: "Duplicate detection",
      points: [
        "SKU + barcode collisions",
        "title/handle near-duplicates",
        "inventory feed mismatches",
      ],
      glow:
        "bg-[radial-gradient(280px_160px_at_25%_20%,rgba(255,255,255,0.1),transparent_60%)]",
    },
    {
      title: "Flows & automations",
      points: [
        "Shopify Flow + webhook guardrails",
        "Klaviyo event hygiene",
        "anti-loop protections and fallbacks",
      ],
      glow:
        "bg-[radial-gradient(280px_160px_at_25%_20%,rgba(96,165,250,0.22),transparent_60%)]",
    },
    {
      title: "Multi-channel integrations",
      points: [
        "Meta / Google feeds + UTM consistency",
        "GA4 + GTM event model",
        "reconciliation across sources of truth",
      ],
      glow:
        "bg-[radial-gradient(280px_160px_at_25%_20%,rgba(30,58,95,0.55),transparent_60%)]",
    },
    {
      title: "Multi-platform integrations",
      points: [
        "Amazon, Walmart, TikTok Shop, Etsy, and marketplaces",
        "inventory and listing sync with conflict rules",
        "order routing and fulfillment handoffs",
      ],
      glow:
        "bg-[radial-gradient(280px_160px_at_75%_25%,rgba(59,130,246,0.24),transparent_60%)]",
    },
    {
      title: "Web development",
      points: [
        "landing pages, custom sections, and store apps",
        "performance-focused builds on Online Store 2.0",
        "API connections and bespoke admin tooling",
      ],
      glow:
        "bg-[radial-gradient(280px_160px_at_25%_20%,rgba(147,197,253,0.18),transparent_60%)]",
    },
    {
      title: "Theme customization",
      points: [
        "brand-aligned layouts without breaking core flows",
        "component systems that stay upgrade-safe",
        "mobile UX, accessibility, and conversion polish",
      ],
      glow:
        "bg-[radial-gradient(280px_160px_at_25%_20%,rgba(255,255,255,0.08),transparent_60%)]",
    },
  ];

  return (
    <section
      id="services"
      className={`container ${tightTop ? "mt-0" : "mt-14 sm:mt-16 lg:mt-20"}`}
    >
      <SectionHeading
        eyebrow="Services"
        title="Everything between “it works” and “it scales.”"
        subtitle="We connect the data layer to the storefront, channels, and team—catalog hygiene, integrations, flows, and theme work—so the store behaves consistently everywhere."
      />

      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD required for SEO
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: cards.map((c, idx) => ({
              "@type": "ListItem",
              position: idx + 1,
              name: c.title,
              item: {
                "@type": "Service",
                name: c.title,
                provider: {
                  "@type": "Organization",
                  name: "Syncoryx",
                },
              },
            })),
          }),
        }}
      />

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((c, i) => (
          <Reveal key={c.title} delay={0.04 * Math.min(i, 5)} className="h-full">
            <MotionCard className="card-shine relative h-full overflow-hidden rounded-[22px] border border-white/10 bg-white/5 p-5 sm:p-6 shadow-[0_18px_55px_rgba(0,0,0,0.25)]">
              <div className={`absolute inset-0 opacity-90 ${c.glow}`} />
              <div className="relative">
                <h3 className="text-lg font-semibold tracking-tight text-white">
                  {c.title}
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  {c.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-white/60" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </MotionCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Work({
  fields,
}: {
  fields?: {
    workSectionTitle?: string;
    workSectionSubtitle?: string;
  };
}) {
  const title = fields?.workSectionTitle || "Marketplace integrations that deliver real results.";
  const subtitle = fields?.workSectionSubtitle || "We connect Shopify to every marketplace channel — eBay, Amazon, and beyond — with integrations that drive revenue and operational clarity.";

  const items = [
    {
      title: "eBay Integration — 3× Sales Increase",
      detail:
        "Built a complete Shopify-to-eBay integration pipeline: automated listing sync, dynamic repricing, and real-time inventory management. Delivered a 3× increase in sales within the first quarter of launch.",
      tag: "Shopify → eBay",
    },
    {
      title: "Multi-marketplace sync",
      detail:
        "Built custom integration tooling for a multi-channel retail client—connecting Shopify with marketplace feeds, inventory sync, and automated order routing across sales channels.",
      tag: "Integrations + Tooling",
    },
    {
      title: "Full store build & launch",
      detail:
        "Delivered an end-to-end Shopify setup for a wellness brand client—store design, product catalog, collections, and launch-ready product pages.",
      tag: "Web Dev + Catalog",
    },
  ];

  return (
    <section id="work" className="container mt-14 sm:mt-16 lg:mt-20">
      <SectionHeading
        eyebrow="Our Work"
        title={title}
        subtitle={subtitle}
      />

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={0.04 * Math.min(i, 4)} className="h-full">
            <MotionCard className="card-shine glass relative h-full overflow-hidden p-5 sm:p-6">
              <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full blur-3xl opacity-25 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.55),transparent_60%)]" />
              <div className="absolute -left-16 bottom-0 h-40 w-40 rounded-full blur-3xl opacity-15 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent_62%)]" />
              <div className="relative">
                <div className="inline-flex items-center rounded-full border border-white/12 bg-white/6 px-2.5 py-1 text-xs text-white/70">
                  {it.tag}
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-white">
                  {it.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/70">
                  {it.detail}
                </p>
              </div>
            </MotionCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Process() {
  const steps = [
    {
      n: "01",
      title: "Map sources of truth",
      desc: "Where data is created, transformed, and consumed across the store and channels.",
    },
    {
      n: "02",
      title: "Fix the catalog substrate",
      desc: "Handles, SKUs, variants, collections, tags—so systems can agree.",
    },
    {
      n: "03",
      title: "Connect flows + integrations",
      desc: "Automations, feeds, webhooks, and event models with guardrails.",
    },
    {
      n: "04",
      title: "Measure drift and prevent regressions",
      desc: "Checks, alerts, and playbooks so the system stays clean.",
    },
  ];

  return (
    <section id="process" className="container mt-14 sm:mt-16 lg:mt-20">
      <SectionHeading
        eyebrow="Process"
        title="A calmer operating system for ecommerce."
        subtitle="We prioritize changes that reduce data chaos first—then we layer in performance, automation, and reporting confidence."
      />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={0.05 * i}>
            <div className="rounded-[22px] border border-white/10 bg-black/20 p-6">
              <div className="flex items-center justify-between">
                <div className="text-xs tracking-[0.18em] text-white/55">
                  {s.n}
                </div>
                <div className="h-2 w-2 rounded-full bg-white/40" />
              </div>
              <div className="mt-3 text-lg font-semibold tracking-tight text-white">
                {s.title}
              </div>
              <div className="mt-2 text-sm leading-7 text-white/70">
                {s.desc}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function FAQ() {
  const faqs = [
    {
      q: "Will this slow down my storefront?",
      a: "No—our animation approach runs after first paint, respects reduced-motion, and avoids heavy scroll listeners. Your LCP stays clean.",
    },
    {
      q: "Do you work with existing Shopify setups?",
      a: "Yes. Most of our work is untangling existing catalogs and integrations without breaking URLs, feeds, or analytics continuity.",
    },
    {
      q: "Can you fix duplicates created by apps?",
      a: "Yes. We trace the creation path (imports, apps, flows), then implement guardrails so duplicates don’t reappear.",
    },
    {
      q: "What do we get after an audit?",
      a: "A prioritized plan: what’s wrong, what it affects, how we’ll fix it, and what we’ll measure to prove it stayed fixed.",
    },
  ];

  return (
    <section id="faq" className="container mt-14 sm:mt-16 lg:mt-20">
      <SectionHeading
        eyebrow="FAQ"
        title="Fast answers for real constraints."
        subtitle="If you’re already feeling the symptoms—reporting drift, mismatched feeds, duplicate products—this is the path back to clarity."
      />

      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD required for SEO
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={0.05 * i}>
            <div className="glass p-6">
              <div className="text-sm font-semibold text-white">{f.q}</div>
              <div className="mt-2 text-sm leading-7 text-white/70">{f.a}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Contact({
  fields,
}: {
  fields?: {
    contactEmail?: string;
  };
}) {
  const email = fields?.contactEmail || "contact@syncoryx.agency";

  return (
    <section id="contact" className="container mt-14 sm:mt-16 lg:mt-24 pb-16">
      <div className="glass card-shine p-6 sm:p-8 lg:p-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-80 bg-[radial-gradient(900px_420px_at_15%_10%,rgba(59,130,246,0.18),transparent_60%),radial-gradient(900px_420px_at_85%_10%,rgba(255,255,255,0.06),transparent_55%),radial-gradient(900px_420px_at_55%_110%,rgba(30,58,95,0.35),transparent_60%)]" />
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          <div>
            <p className="text-xs tracking-[0.18em] uppercase text-white/60">
              Contact
            </p>
            <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              Want your store to feel predictable again?
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-7 text-white/70">
              Tell us what’s broken: duplicates, mismatched feeds, tracking drift,
              or flow instability. We’ll respond with an audit plan and a realistic
              timeline.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:flex sm:flex-wrap gap-3">
              <Button
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => {
                  window.open(
                    "https://calendly.com/syncoryx-info/30min",
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
              >
                Book a call
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={() => {
                  window.location.href = `mailto:${email}`;
                }}
              >
                <span className="sm:hidden">Email us</span>
                <span className="hidden sm:inline">Email {email}</span>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="w-full sm:w-auto"
                onClick={() => {
                  navigator.clipboard?.writeText(email);
                }}
              >
                Copy email
              </Button>
            </div>
            <p className="mt-4 text-xs text-white/55">
              Typical response: within 1 business day.
            </p>
          </div>

          <div className="rounded-[22px] border border-white/10 bg-[#0a1628]/60 p-5 sm:p-6">
            <div className="text-sm font-semibold text-white">What we’ll ask</div>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {[
                "Which channels are active (Meta, Google, email, marketplaces)?",
                "What changed recently (app install, import, theme, flow)?",
                "Where duplicates show up (ads, admin, feeds, fulfillment)?",
                "How you measure success (MER, ROAS, CAC, AOV, LTV)?",
              ].map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-white/60" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs tracking-[0.18em] uppercase text-white/55">
                Deliverable
              </div>
              <div className="mt-2 text-sm text-white/80">
                A prioritized “fix list” with impact, risk, and measurements.
              </div>
            </div>
          </div>
        </div>

        {/* San Diego Map */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
          <iframe
            title="Syncoryx Location — San Diego, CA"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-117.2812,32.6949,-117.0812,32.8149&layer=mapnik&marker=32.7157,-117.1611"
            width="100%"
            height="260"
            style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) brightness(0.85) contrast(1.1)" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="bg-black/30 px-4 py-2 text-xs text-white/50">
            📍 San Diego, California
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer({
  fields,
}: {
  fields?: {
    footerTagline?: string;
  };
}) {
  const tagline = fields?.footerTagline || "Data · Flows · Integrations · Marketplace Sync";

  return (
    <footer className="container pb-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10 pt-8">
        <div className="flex items-center gap-3">
          <div>
            <div className="text-base font-semibold tracking-tight text-white">
              Syncoryx
            </div>
            <div className="mt-0.5 text-xs text-white/55">
              {tagline}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-white/60">
          <a
            className="focus-ring rounded-full px-2 py-1 hover:text-white"
            href="/services"
          >
            Services
          </a>
          <a
            className="focus-ring rounded-full px-2 py-1 hover:text-white"
            href="/process"
          >
            Process
          </a>
          <a
            className="focus-ring rounded-full px-2 py-1 hover:text-white"
            href="/contact"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

