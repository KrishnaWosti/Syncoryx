"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PopupConfig {
  active: boolean;
  headline: string;
  description: string;
  discount: string;
  buttonText: string;
  placeholder: string;
  successMessage: string;
}

export function PromoPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [config, setConfig] = useState<PopupConfig | null>(null);

  useEffect(() => {
    // Don't show if already dismissed or submitted
    const dismissed = localStorage.getItem("syncoryx_popup_dismissed");
    if (dismissed) return;

    // Fetch popup config
    fetch("/api/popup")
      .then((res) => res.json())
      .then((data: PopupConfig) => {
        if (data.active) {
          setConfig(data);
          // Show popup after 2 seconds
          const timer = setTimeout(() => setShow(true), 2000);
          return () => clearTimeout(timer);
        }
      })
      .catch(() => {
        // Silently fail — don't show popup if API fails
      });
  }, []);

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
        setMessage(config?.successMessage || "Successfully subscribed!");
        localStorage.setItem("syncoryx_popup_dismissed", "true");
        setTimeout(() => setShow(false), 3000);
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  const handleClose = () => {
    setShow(false);
    localStorage.setItem("syncoryx_popup_dismissed", "true");
  };

  if (!config) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(8px)" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/15 shadow-2xl"
            style={{
              background:
                "linear-gradient(145deg, rgba(12, 26, 46, 0.98), rgba(7, 17, 31, 0.99))",
              boxShadow:
                "0 32px 80px rgba(0,0,0,0.45), 0 0 80px rgba(59,130,246,0.12)",
            }}
          >
            {/* Decorative gradients */}
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl opacity-40 bg-[radial-gradient(circle,rgba(59,130,246,0.45),transparent_60%)]" />
            <div className="absolute -left-12 -bottom-12 h-40 w-40 rounded-full blur-3xl opacity-30 bg-[radial-gradient(circle,rgba(255,255,255,0.15),transparent_60%)]" />

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Close popup"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <div className="relative p-8">
              {/* Discount badge */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
                </span>
                <span className="text-xs font-semibold tracking-wide text-white/90">
                  LIMITED TIME OFFER
                </span>
              </div>

              {/* Main headline */}
              <h2 className="text-3xl font-bold tracking-tight text-white">
                {config.headline}
                <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-blue-400">
                  {config.discount}
                </span>
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/65">
                {config.description}
              </p>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 rounded-2xl border border-lime-500/20 bg-lime-500/10 p-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-500/20">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M4 10L8 14L16 6" stroke="#a3e635" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-lime-300">You&apos;re in!</div>
                      <div className="text-xs text-lime-300/70">{message}</div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={config.placeholder}
                      required
                      disabled={status === "loading"}
                      className="flex-1 rounded-xl border border-white/12 bg-white/6 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="flex-shrink-0 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === "loading" ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Sending...
                        </span>
                      ) : (
                        config.buttonText
                      )}
                    </button>
                  </div>
                  {status === "error" && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2 text-xs text-rose-400"
                    >
                      {message}
                    </motion.p>
                  )}
                  <p className="mt-3 text-[11px] text-white/35">
                    No spam, ever. Unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
