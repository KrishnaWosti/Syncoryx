import { cn } from "@/lib/cn";

/**
 * Static "ops panel" illustrations. They show the shape of the work
 * (a support thread, a store worklog) using sample content.
 */

export function TicketThread({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={cn("panel", className)}>
      <div className="panel-bar">
        <span className="t-mono font-medium text-ink">Support inbox · your app</span>
        <span className="pill pill-ok">Resolved</span>
      </div>

      <div className="space-y-3 p-4">
        <div className="max-w-[88%]">
          <p className="t-eyebrow !text-[0.625rem]">Merchant</p>
          <p className="mt-1.5 rounded-[10px] rounded-tl-sm bg-mist px-3.5 py-2.5 text-[0.875rem] leading-snug text-ink">
            Installed the app yesterday but my Etsy orders are not importing. Did I miss a
            step?
          </p>
        </div>

        <div className="ml-auto max-w-[88%]">
          <p className="t-eyebrow text-right !text-[0.625rem]">Your support team · Syncoryx</p>
          <p className="mt-1.5 rounded-[10px] rounded-tr-sm bg-signal px-3.5 py-2.5 text-[0.875rem] leading-snug text-white">
            Thanks for the store link. Your Etsy connection is active, but order import is
            switched off under Settings, Orders. I can stay on while you turn it on and we
            check the first order together.
          </p>
        </div>

        {compact ? null : (
          <>
            <div className="max-w-[88%]">
              <p className="mt-1.5 inline-block rounded-[10px] rounded-tl-sm bg-mist px-3.5 py-2.5 text-[0.875rem] leading-snug text-ink">
                That did it. Orders are coming through now, thank you!
              </p>
            </div>

            <div className="rounded-[10px] border border-dashed border-line px-3.5 py-3">
              <p className="t-eyebrow !text-[0.625rem]">Internal note to your developers</p>
              <p className="mt-1.5 text-[0.8125rem] leading-snug text-ink-soft">
                Third report this week: order import defaults to off after a reinstall.
                Steps to reproduce and store IDs attached.
              </p>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 border-t border-line bg-mist px-4 py-3">
        <span className="pill pill-idle">Onboarding</span>
        <span className="pill pill-idle">Integration</span>
        {compact ? null : <span className="pill pill-signal">Escalated with repro</span>}
      </div>
    </div>
  );
}

const worklog = [
  { area: "Theme", task: "Collection filters rebuilt for mobile", status: "Shipped" },
  { area: "Checkout", task: "Shipping rates by zone and weight", status: "Shipped" },
  { area: "Tracking", task: "Purchase event checked against orders", status: "Verified" },
  { area: "Apps", task: "Reviews app replaced, widgets migrated", status: "In review" },
  { area: "Product page", task: "Delivery estimate moved above the fold", status: "In progress" },
  { area: "Speed", task: "Unused app scripts removed from theme", status: "Queued" },
] as const;

const statusPill: Record<(typeof worklog)[number]["status"], string> = {
  Shipped: "pill-ok",
  Verified: "pill-ok",
  "In review": "pill-signal",
  "In progress": "pill-warn",
  Queued: "pill-idle",
};

export function StoreWorklog({ className }: { className?: string }) {
  return (
    <div className={cn("panel", className)}>
      <div className="panel-bar">
        <span className="t-mono font-medium text-ink">Store worklog · this month</span>
        <span className="pill pill-signal">6 items</span>
      </div>
      <ul>
        {worklog.map((item) => (
          <li
            key={item.task}
            className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-x-3 gap-y-1 border-b border-line px-4 py-3 last:border-b-0 sm:grid-cols-[6.5rem_minmax(0,1fr)_auto]"
          >
            <span className="t-eyebrow !text-[0.625rem]">{item.area}</span>
            <span className="text-[0.875rem] font-medium leading-snug">{item.task}</span>
            <span
              className={cn(
                "pill col-start-2 justify-self-start sm:col-start-3 sm:justify-self-end",
                statusPill[item.status],
              )}
            >
              {item.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ArtifactCaption({ children }: { children: React.ReactNode }) {
  return <p className="t-mono mt-3 !text-[0.6875rem] text-ink-mute">{children}</p>;
}
