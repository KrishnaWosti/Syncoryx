"use client";

import { ReactNode } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Sections";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-full">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

