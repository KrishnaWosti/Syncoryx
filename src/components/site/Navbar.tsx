"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { springHover } from "@/lib/motion";

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/35 to-transparent backdrop-blur-[2px]" />
      <div className="container relative">
        <motion.div
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 140, damping: 18 }}
          className={cn(
            "mt-4 flex items-center justify-between gap-3 rounded-full px-3 py-3 sm:px-4",
            "border border-white/10 bg-black/25 backdrop-blur-xl shadow-[0_18px_45px_rgba(0,0,0,0.35)]"
          )}
        >
          <Link href="/" className="focus-ring rounded-full px-2 py-1 shrink-0">
            <span className="text-base sm:text-lg font-semibold tracking-tight text-white">
              Syncoryx
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring rounded-full px-3 py-2 text-sm text-white/75 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/contact"
              className="focus-ring hidden sm:inline-flex rounded-full px-3 py-2 text-sm text-white/75 hover:text-white transition-colors"
            >
              Book a call
            </Link>
            <Button
              size="sm"
              className="relative hidden sm:inline-flex overflow-hidden"
              onClick={() => {
                window.location.href = "/contact";
              }}
            >
              <span className="relative z-10">Get an audit</span>
              <span className="absolute inset-0 opacity-60 bg-[radial-gradient(120px_60px_at_70%_20%,rgba(163,230,53,0.35),transparent_60%),radial-gradient(140px_80px_at_20%_80%,rgba(6,182,212,0.22),transparent_55%),radial-gradient(100px_50px_at_50%_0%,rgba(201,169,98,0.2),transparent_55%)]" />
            </Button>
            <button
              type="button"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="focus-ring md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/6 text-white/85"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <span className="flex flex-col gap-1">
                <span
                  className={cn(
                    "h-0.5 w-4 rounded-full bg-white/80 transition-transform",
                    open && "translate-y-[5px] rotate-45"
                  )}
                />
                <span
                  className={cn(
                    "h-0.5 w-4 rounded-full bg-white/80 transition-opacity",
                    open && "opacity-0"
                  )}
                />
                <span
                  className={cn(
                    "h-0.5 w-4 rounded-full bg-white/80 transition-transform",
                    open && "-translate-y-[5px] -rotate-45"
                  )}
                />
              </span>
            </button>
          </div>
        </motion.div>

        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={springHover}
              className="md:hidden overflow-hidden"
            >
              <nav className="mt-2 rounded-[22px] border border-white/10 bg-black/40 backdrop-blur-xl p-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="focus-ring block rounded-2xl px-4 py-3 text-sm text-white/80 hover:bg-white/6 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="focus-ring mt-1 block rounded-2xl px-4 py-3 text-sm font-medium text-white bg-white/8 border border-white/10"
                >
                  Book a call
                </Link>
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
