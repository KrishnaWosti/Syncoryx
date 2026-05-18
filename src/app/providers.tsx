"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { GoldDust } from "@/components/motion/GoldDust";

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const narrowViewport = window.matchMedia("(max-width: 768px)").matches;

    if (prefersReducedMotion || coarsePointer || narrowViewport) return;

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      touchMultiplier: 1,
      wheelMultiplier: 1,
      smoothWheel: true,
      syncTouch: false,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = window.requestAnimationFrame(loop);
    };
    raf = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <GoldDust />
      <div className="relative z-10 flex min-h-full flex-col">{children}</div>
    </>
  );
}
