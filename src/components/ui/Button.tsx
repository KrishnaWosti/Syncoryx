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
    "text-white bg-gradient-to-b from-white/20 to-white/5 border border-white/15 shadow-[0_18px_55px_rgba(124,58,237,0.22),0_8px_28px_rgba(201,169,98,0.08)]",
  secondary:
    "text-white/90 bg-white/8 border border-white/12 hover:bg-white/10",
  ghost:
    "text-white/85 bg-transparent border border-white/10 hover:bg-white/6",
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

