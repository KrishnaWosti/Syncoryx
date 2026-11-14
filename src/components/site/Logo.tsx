import { cn } from "@/lib/cn";

/**
 * The Syncoryx mark, redrawn as vector from the brand logo: two interlocking
 * hooks that form an S. Uses currentColor so it works on any background.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="452 450 376 236"
      fill="none"
      aria-hidden="true"
      className={cn("h-6 w-auto", className)}
    >
      <path
        d="M812 466H580a68 68 0 0 0 0 136h115"
        stroke="currentColor"
        strokeWidth="32"
      />
      <circle cx="695" cy="602" r="16" fill="currentColor" />
      <path
        d="M468 670h244a68 68 0 0 0 0-136H590"
        stroke="currentColor"
        strokeWidth="32"
      />
      <circle cx="590" cy="534" r="16" fill="currentColor" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span
        className="font-display text-[1.2rem] font-semibold leading-none tracking-[-0.01em]"
        style={{ fontVariationSettings: '"wdth" 125' }}
      >
        Syncoryx
      </span>
    </span>
  );
}
