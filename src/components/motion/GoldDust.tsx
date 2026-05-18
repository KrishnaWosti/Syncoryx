"use client";

import { motion, useReducedMotion } from "framer-motion";

const motes = [
  { left: "12%", top: "18%", delay: 0 },
  { left: "84%", top: "14%", delay: 1.2 },
  { left: "68%", top: "42%", delay: 2.4 },
  { left: "22%", top: "62%", delay: 0.8 },
  { left: "91%", top: "72%", delay: 1.8 },
  { left: "46%", top: "88%", delay: 3.1 },
];

export function GoldDust() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {motes.map((mote) => (
        <motion.span
          key={`${mote.left}-${mote.top}`}
          className="gold-mote absolute"
          style={{ left: mote.left, top: mote.top }}
          initial={{ opacity: 0.12 }}
          animate={
            reduceMotion
              ? { opacity: 0.2 }
              : { opacity: [0.12, 0.38, 0.16], y: [0, -5, 0] }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 11,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: mote.delay,
                }
          }
        />
      ))}
    </div>
  );
}
