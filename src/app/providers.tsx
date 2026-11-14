"use client";

import type { ReactNode } from "react";
import { PromoPopup } from "@/components/site/PromoPopup";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <PromoPopup />
    </>
  );
}
