"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon } from "@/components/ui/icons";

interface PopupConfig {
  active: boolean;
  headline: string;
  description: string;
  discount: string;
  buttonText: string;
  placeholder: string;
  successMessage: string;
}

const DISMISS_KEY = "syncoryx_popup_dismissed";
// Give visitors time to read before interrupting them.
const SHOW_AFTER_MS = 25000;
// Never interrupt someone who is booking, getting in touch, or in the admin.
const QUIET_PATHS = ["/admin", "/book", "/contact"];

/**
 * Newsletter offer, configured from /admin. Shown once per visitor as a
 * corner card rather than a full-screen takeover.
 */
export function PromoPopup() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [config, setConfig] = useState<PopupConfig | null>(null);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = Boolean(localStorage.getItem(DISMISS_KEY));
    } catch {
      // Storage unavailable: treat as not dismissed.
    }
    if (dismissed) return;

    let timer: number | undefined;
    let cancelled = false;

    fetch("/api/popup")
      .then((res) => res.json())
      .then((data: PopupConfig) => {
        if (cancelled || !data.active) return;
        setConfig(data);
        timer = window.setTimeout(() => setShow(true), SHOW_AFTER_MS);
      })
      .catch(() => {
        // If the config cannot be loaded, show nothing.
      });

    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  const remember = () => {
    try {
      localStorage.setItem(DISMISS_KEY, "true");
    } catch {
      // Ignore storage errors.
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(config?.successMessage || "You are subscribed.");
        remember();
        window.setTimeout(() => setShow(false), 4000);
      } else {
        setStatus("error");
        setMessage(data.error || "That did not go through. Check the address and try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Could not reach the server. Check your connection and try again.");
    }
  };

  const handleClose = () => {
    setShow(false);
    remember();
  };

  const quiet = QUIET_PATHS.some((path) => pathname.startsWith(path));
  if (!config || quiet) return null;

  return (
    <AnimatePresence>
      {show ? (
        <motion.aside
          role="dialog"
          aria-label={config.headline}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
          className="panel fixed inset-x-4 bottom-4 z-50 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[24rem]"
        >
          <div className="panel-bar">
            <span className="t-mono font-medium text-ink">Offer for new clients</span>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close offer"
              className="flex h-7 w-7 items-center justify-center rounded-full text-ink-mute transition-colors hover:bg-line hover:text-ink"
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M1 1l12 12M1 13L13 1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="p-5">
            <h2 className="t-h3 !text-[1.35rem]">{config.headline}</h2>
            <p className="mt-2 text-[0.9375rem] leading-snug text-ink-soft">
              {config.description}
            </p>

            {status === "success" ? (
              <p
                role="status"
                className="mt-4 flex items-start gap-2.5 rounded-[10px] bg-ok-tint px-3.5 py-3 text-[0.9375rem] font-medium text-ok"
              >
                <CheckIcon className="mt-0.5 shrink-0" />
                <span>{message}</span>
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4">
                <label htmlFor="promo-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="promo-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={config.placeholder}
                  required
                  disabled={status === "loading"}
                  className="h-12 w-full rounded-[10px] border border-line bg-paper px-3.5 text-[1rem] text-ink outline-none transition-colors placeholder:text-ink-mute focus:border-signal disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn btn-primary mt-2.5 w-full disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "loading" ? "Sending" : config.buttonText}
                </button>
                {status === "error" ? (
                  <p role="alert" className="mt-2.5 text-[0.875rem] font-medium text-[#b42318]">
                    {message}
                  </p>
                ) : null}
                <p className="mt-3 text-[0.8125rem] text-ink-mute">
                  No spam. Unsubscribe at any time.
                </p>
              </form>
            )}
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
