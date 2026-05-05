"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <div className="sticky top-0 z-50">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/35 to-transparent backdrop-blur-[2px]" />
      <div className="container relative">
        <motion.div
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 140, damping: 18 }}
          className={cn(
            "mt-4 flex items-center justify-between gap-4 rounded-full px-4 py-3",
            "border border-white/10 bg-black/25 backdrop-blur-xl shadow-[0_18px_45px_rgba(0,0,0,0.35)]"
          )}
        >
          <Link href="/" className="focus-ring rounded-full px-2 py-1">
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

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="focus-ring hidden sm:inline-flex rounded-full px-3 py-2 text-sm text-white/75 hover:text-white transition-colors"
            >
              Book a call
            </Link>
            <Button
              size="sm"
              className="relative overflow-hidden"
              onClick={() => {
                window.location.href = "/contact";
              }}
            >
              <span className="relative z-10">Get an audit</span>
              <span className="absolute inset-0 opacity-60 bg-[radial-gradient(120px_60px_at_70%_20%,rgba(163,230,53,0.35),transparent_60%),radial-gradient(140px_80px_at_20%_80%,rgba(6,182,212,0.22),transparent_55%)]" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

