"use client";

import { ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { cn } from "@/lib/cn";
import { springReveal } from "@/lib/motion";

const reveal: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(8px)" },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      ...springReveal,
      delay,
    },
  }),
};

const revealReduced: Variants = {
  hidden: { opacity: 0 },
  show: (delay: number) => ({
    opacity: 1,
    transition: { duration: 0.2, delay },
  }),
};

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      variants={reduceMotion ? revealReduced : reveal}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -8% 0px" }}
    >
      {children}
    </motion.div>
  );
}
