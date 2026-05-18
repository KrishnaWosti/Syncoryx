"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const chips = [
  "Shopify + Meta",
  "Klaviyo",
  "GA4 + GTM",
  "Inventory & feeds",
  "Reconciliation",
  "Duplicate detection",
  "Flows & automations",
];

export function Hero() {
  return (
    <section className="container relative pt-12 sm:pt-16 lg:pt-20">
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 h-[280px] w-[280px] sm:h-[420px] sm:w-[420px] lg:h-[520px] lg:w-[520px] rounded-full blur-3xl opacity-30 bg-[radial-gradient(circle_at_30%_20%,rgba(124,58,237,0.85),transparent_60%),radial-gradient(circle_at_70%_60%,rgba(6,182,212,0.7),transparent_58%),radial-gradient(circle_at_40%_80%,rgba(251,113,133,0.6),transparent_60%),radial-gradient(circle_at_55%_35%,rgba(201,169,98,0.22),transparent_62%)]" />
      <div className="absolute inset-x-0 top-10 h-80 opacity-80">
        <div className="noise" />
      </div>

      <div className="relative glass card-shine p-6 sm:p-8 lg:p-10 overflow-hidden">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full blur-3xl opacity-40 bg-[radial-gradient(circle_at_30%_30%,rgba(163,230,53,0.55),transparent_62%)]" />
        <div className="absolute -left-24 -bottom-24 h-80 w-80 rounded-full blur-3xl opacity-35 bg-[radial-gradient(circle_at_30%_30%,rgba(124,58,237,0.55),transparent_62%)]" />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
          className="max-w-3xl"
        >
          <p className="text-sm text-white/75">
            Data-first Shopify agency for catalog clarity and channel harmony
          </p>

          <h1 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white">
            Clean data.
            <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,#a3e635,#06b6d4,#7c3aed,#c9a962,#fb7185)]">
              {" "}
              Sharp flows.
            </span>
            <br className="hidden sm:block" />
            Integrations that don’t drift.
          </h1>

          <p className="mt-5 text-base sm:text-lg leading-7 text-white/70 max-w-2xl">
            We set up cross-channel integrations (Shopify, paid, email, analytics),
            fix product catalog messes, and find duplicates before they fragment
            reporting, ads, and fulfillment.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => {
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Get a data + flows audit
              <span aria-hidden className="ml-1 opacity-70">
                →
              </span>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto"
              onClick={() => {
                document
                  .querySelector("#services")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              See what we do
            </Button>
          </div>
        </motion.div>

        <div className="mt-9 flex flex-wrap gap-2">
          {chips.map((chip, i) => (
            <motion.span
              key={chip}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * i, duration: 0.45 }}
              className="inline-flex items-center rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-xs text-white/75"
            >
              {chip}
            </motion.span>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { k: "Catalog", v: "cleanup + dedupe" },
            { k: "Channels", v: "connected + consistent" },
            { k: "Flows", v: "stable automations" },
            { k: "Reporting", v: "trustworthy signals" },
          ].map((s, idx) => (
            <motion.div
              key={s.k}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + idx * 0.06 }}
              className="rounded-2xl border border-white/10 bg-black/20 p-4"
            >
              <div className="text-sm font-semibold text-white">{s.k}</div>
              <div className="mt-1 text-xs text-white/60">{s.v}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

