"use client";

import { useEffect, useState } from "react";
import { CheckIcon } from "@/components/ui/icons";
import { site } from "@/lib/site";

/**
 * Inline Calendly scheduler. Uses Calendly's standard inline embed URL in an
 * iframe, so no third-party script is loaded on the page.
 */
function embedUrl(): string {
  const url = new URL(site.calendlyUrl);
  url.searchParams.set("embed_type", "Inline");
  url.searchParams.set("embed_domain", new URL(site.url).hostname);
  url.searchParams.set("hide_gdpr_banner", "1");
  url.searchParams.set("primary_color", "2b39ee");
  url.searchParams.set("text_color", "0b0e1a");
  return url.toString();
}

export function CalendlyEmbed() {
  const [loaded, setLoaded] = useState(false);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    // Calendly posts a message to the parent page when a slot is confirmed.
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== "https://calendly.com") return;
      const data = event.data as { event?: string } | null;
      if (data?.event === "calendly.event_scheduled") setBooked(true);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div>
      {booked ? (
        <p
          role="status"
          className="mb-4 flex items-center gap-3 rounded-[10px] bg-ok-tint px-4 py-3 font-semibold text-ok"
        >
          <CheckIcon className="shrink-0" />
          You are booked. A confirmation with the call link is on its way to your inbox.
        </p>
      ) : null}

      <div className="panel relative">
        <div className="panel-bar">
          <span className="t-mono font-medium text-ink">Free assessment call · 30 min</span>
          <span className="pill pill-signal">Pick a time</span>
        </div>
        {loaded ? null : (
          <p className="t-mono absolute inset-x-0 top-28 text-center text-ink-mute">
            Loading available times
          </p>
        )}
        <iframe
          title="Book a free assessment call with Syncoryx on Calendly"
          src={embedUrl()}
          onLoad={() => setLoaded(true)}
          className="relative block h-[880px] w-full border-0 bg-transparent"
        />
      </div>

      <p className="mt-4 text-[0.9375rem] text-ink-mute">
        Calendar not loading?{" "}
        <a
          href={site.calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-signal underline underline-offset-4"
        >
          Open the booking page in a new tab
        </a>
        .
      </p>
    </div>
  );
}
