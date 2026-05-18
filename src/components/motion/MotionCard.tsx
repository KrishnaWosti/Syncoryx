"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { springHover } from "@/lib/motion";

export function MotionCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={springHover}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
