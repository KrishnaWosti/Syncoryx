import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowIcon, CheckIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { pillars, processSteps, supportingServices } from "@/content/services";
import { workItems } from "@/content/work";
import { platforms } from "@/lib/site";

/** A plain checklist. `columns` splits it in two on wider screens. */
export function CheckList({
  items,
  columns = false,
  className,
}: {
  items: readonly string[];
  columns?: boolean;
  className?: string;
}) {
  return (
    <ul className={cn("grid gap-x-8 gap-y-3", columns && "sm:grid-cols-2", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[1rem] leading-snug">
          <CheckIcon className="mt-1 shrink-0 text-signal" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={cn("link-arrow", className)}>
      {children}
      <ArrowIcon />
    </Link>
  );
}

/** Platform names as text. No third-party logos are used. */
export function PlatformStrip() {
  return (
    <section aria-label="Platforms we work in" className="border-b border-line bg-mist">
      <div className="wrap flex flex-col gap-4 py-7 lg:flex-row lg:items-center lg:gap-10">
        <p className="t-eyebrow shrink-0">Platforms we work in</p>
        <ul className="flex flex-wrap gap-x-7 gap-y-2">
          {platforms.map((name) => (
            <li
              key={name}
              className="font-display text-[1.0625rem] font-semibold tracking-[-0.01em] text-ink"
              style={{ fontVariationSettings: '"wdth" 110' }}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** The three service pillars as wide rows. */
export function PillarRows() {
  return (
    <div className="border-b border-line">
      {pillars.map((pillar, index) => (
        <Reveal key={pillar.slug} delay={index * 0.04}>
          <article className="grid gap-8 border-t border-line py-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:py-14">
            <div>
              <p className="t-eyebrow">{pillar.audience}</p>
              <h3 className="t-h2 mt-4 max-w-[18ch] !text-[clamp(1.5rem,2.6vw,2.15rem)]">
                <Link href={pillar.href} className="transition-colors hover:text-signal">
                  {pillar.title}
                </Link>
              </h3>
            </div>
            <div>
              <p className="t-lead max-w-2xl">{pillar.summary}</p>
              <CheckList items={pillar.highlights} columns className="mt-7" />
              <ArrowLink href={pillar.href} className="mt-8">
                {pillar.linkLabel}
              </ArrowLink>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

/** A real sequence, so the steps are numbered. */
export function ProcessSteps({ steps = processSteps }: { steps?: { title: string; body: string }[] }) {
  return (
    <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <li key={step.title} className="relative border-t-2 border-ink pt-5">
          <span className="t-mono text-signal">Step {index + 1}</span>
          <h3 className="t-h3 mt-3">{step.title}</h3>
          <p className="t-body mt-3 text-[1rem]">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function SupportingList() {
  return (
    <ul className="grid gap-x-12 sm:grid-cols-2">
      {supportingServices.map((service) => (
        <li key={service.title} className="border-t border-line py-6">
          <h3 className="t-h3">{service.title}</h3>
          <p className="t-body mt-2 text-[1rem]">{service.body}</p>
        </li>
      ))}
    </ul>
  );
}

export function WorkList({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {workItems.map((item, index) => (
        <Reveal key={item.title} delay={index * 0.05} className="h-full">
          <article className="flex h-full flex-col rounded-[14px] border border-line bg-paper p-6 sm:p-7">
            <p className="pill pill-signal self-start">{item.tag}</p>
            <h3 className="t-h3 mt-5">{item.title}</h3>
            {detailed ? (
              <dl className="mt-5 space-y-4 text-[1rem]">
                <div>
                  <dt className="t-eyebrow">The problem</dt>
                  <dd className="t-body mt-1.5">{item.problem}</dd>
                </div>
                <div>
                  <dt className="t-eyebrow">What we did</dt>
                  <dd className="t-body mt-1.5">{item.work}</dd>
                </div>
              </dl>
            ) : (
              <p className="t-body mt-3 text-[1rem]">{item.work}</p>
            )}
            <div className="mt-auto pt-6">
              <p className="border-t border-line pt-5 text-[1rem] font-semibold leading-snug">
                {item.outcome}
              </p>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
