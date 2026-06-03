"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";
import { springTap } from "@/lib/motion";

type ButtonProps = HTMLMotionProps<"button"> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-sm",
  lg: "h-14 px-6 text-base",
};

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "text-[#0a1628] bg-white border border-white hover:bg-white/95 shadow-[0_12px_32px_rgba(0,0,0,0.2)]",
  secondary:
    "text-white bg-white/8 border border-white/18 hover:bg-white/12",
  ghost:
    "text-white/90 bg-transparent border border-white/14 hover:bg-white/6",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -1 }}
      transition={springTap}
      className={cn(
        "focus-ring inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight",
        "select-none will-change-transform",
        sizes[size],
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
