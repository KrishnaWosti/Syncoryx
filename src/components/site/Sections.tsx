"use client";

import { motion } from "framer-motion";
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
        "bg-[radial-gradient(280px_160px_at_25%_20%,rgba(124,58,237,0.35),transparent_60%)]",
    },
    {
      title: "Duplicate detection",
      points: [
        "SKU + barcode collisions",
        "title/handle near-duplicates",
        "inventory feed mismatches",
      ],
      glow:
        "bg-[radial-gradient(280px_160px_at_25%_20%,rgba(251,113,133,0.28),transparent_60%)]",
    },
    {
      title: "Flows & automations",
      points: [
        "Shopify Flow + webhook guardrails",
        "Klaviyo event hygiene",
        "anti-loop protections and fallbacks",
      ],
      glow:
        "bg-[radial-gradient(280px_160px_at_25%_20%,rgba(6,182,212,0.28),transparent_60%)]",
    },
    {
      title: "Multi-channel integrations",
      points: [
        "Meta / Google feeds + UTM consistency",
        "GA4 + GTM event model",
        "reconciliation across sources of truth",
      ],
      glow:
        "bg-[radial-gradient(280px_160px_at_25%_20%,rgba(163,230,53,0.24),transparent_60%)]",
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
        subtitle="We connect the data layer to the storefront, the channels, and the team—so the store behaves consistently no matter where customers touch it."
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

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((c, i) => (
          <Reveal key={c.title} delay={0.05 * i}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="relative overflow-hidden rounded-[22px] border border-white/10 bg-white/5 p-6 shadow-[0_18px_55px_rgba(0,0,0,0.25)]"
            >
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
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Work() {
  const items = [
    {
      title: "Catalog dedupe for a 12k-SKU store",
      detail:
        "Merged near-duplicate products/variants, cleaned tags/options, and stabilized collections to fix ads + search fragmentation.",
      tag: "Catalog + Dedupe",
    },
    {
      title: "Cross-channel event model rebuild",
      detail:
        "Aligned GA4/GTM events with Shopify + Klaviyo, reducing reporting drift and restoring attribution confidence.",
      tag: "Analytics + Signals",
    },
    {
      title: "Feed integrity + reconciliation",
      detail:
        "Resolved SKU mismatches between Shopify, fulfillment, and ad feeds—preventing OOS ads and pricing leaks.",
      tag: "Integrations",
    },
  ];

  return (
    <section id="work" className="container mt-14 sm:mt-16 lg:mt-20">
      <SectionHeading
        eyebrow="Proof"
        title="Clean inputs. Predictable outputs."
        subtitle="No theatrics—just the operational clarity that makes growth repeatable."
      />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={0.05 * i}>
            <motion.div
              whileHover={{ y: -4 }}
              className="glass p-6 relative overflow-hidden"
            >
              <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full blur-3xl opacity-30 bg-[radial-gradient(circle_at_30%_30%,rgba(124,58,237,0.7),transparent_60%)]" />
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
            </motion.div>
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

export function Contact() {
  return (
    <section id="contact" className="container mt-14 sm:mt-16 lg:mt-24 pb-16">
      <div className="glass p-8 sm:p-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-70 bg-[radial-gradient(900px_420px_at_15%_10%,rgba(124,58,237,0.25),transparent_60%),radial-gradient(900px_420px_at_85%_10%,rgba(6,182,212,0.18),transparent_55%),radial-gradient(900px_420px_at_55%_110%,rgba(163,230,53,0.14),transparent_60%)]" />
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
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
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                size="lg"
                onClick={() => {
                  window.location.href = "mailto:hello@syncoryx.agency";
                }}
              >
                Email hello@syncoryx.agency
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => {
                  navigator.clipboard?.writeText("hello@syncoryx.agency");
                }}
              >
                Copy email
              </Button>
            </div>
            <p className="mt-4 text-xs text-white/55">
              Typical response: within 1 business day.
            </p>
          </div>

          <div className="rounded-[22px] border border-white/10 bg-black/25 p-6">
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
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="container pb-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10 pt-8">
        <div>
          <div className="text-sm font-semibold tracking-tight text-white">
            Syncoryx
          </div>
          <div className="mt-1 text-xs text-white/55">
            Data · Flows · Integrations · Catalog hygiene
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

