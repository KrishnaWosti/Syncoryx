import type { Metadata } from "next";
import { CalendlyEmbed } from "@/components/site/CalendlyEmbed";
import { PageShell } from "@/components/site/PageShell";
import { CheckIcon } from "@/components/ui/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Free eCommerce Assessment Call",
  description:
    "Book a free 30-minute call with Syncoryx. We assess your store, sales channels or app support needs and show you how we would help. No obligation.",
  alternates: { canonical: "/book" },
};

const cover = [
  "Where your store, channels or app support stand today",
  "What is getting in the way, and what it is costing you",
  "What we would do, in what order, and roughly what it involves",
  "Whether we are the right team for it. We will say so if not",
];

const bring = [
  "Your store URL or app listing",
  "The channels and tools you use now",
  "The one problem you most want gone",
];

export default function BookPage() {
  return (
    <PageShell>
      <section>
        <div className="wrap grid grid-cols-1 gap-12 pb-20 pt-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:pb-28 lg:pt-14">
          <div>
            <p className="t-eyebrow">Free assessment call</p>
            <h1 className="t-h1 mt-5 max-w-[14ch]">Book a free call.</h1>
            <p className="t-lead mt-6 max-w-lg">
              Thirty minutes with someone who does this work, not a sales script. We assess
              your requirements and show you how Syncoryx would help. No charge and no
              obligation.
            </p>

            <h2 className="t-eyebrow mt-12">What we cover</h2>
            <ul className="mt-4 space-y-3">
              {cover.map((item) => (
                <li key={item} className="flex gap-3 leading-snug">
                  <CheckIcon className="mt-1 shrink-0 text-signal" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="t-eyebrow mt-10">Worth having to hand</h2>
            <ul className="mt-4 space-y-2 text-ink-soft">
              {bring.map((item) => (
                <li key={item} className="flex gap-3 leading-snug">
                  <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-ink-mute" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-10 border-t border-line pt-6 text-[0.9375rem] text-ink-soft">
              Prefer to write first?{" "}
              <a
                href="/contact#message"
                className="font-semibold text-signal underline underline-offset-4"
              >
                Send us a message
              </a>{" "}
              or email{" "}
              <a
                href={"mailto:" + site.email}
                className="font-semibold text-signal underline underline-offset-4"
              >
                {site.email}
              </a>
              . We reply within one business day.
            </p>
          </div>

          <CalendlyEmbed />
        </div>
      </section>
    </PageShell>
  );
}
