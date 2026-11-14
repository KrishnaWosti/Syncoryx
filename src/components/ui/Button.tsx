import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowIcon } from "@/components/ui/icons";

type Variant = "primary" | "dark" | "outline" | "light" | "outline-light";

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  dark: "btn-dark",
  outline: "btn-outline",
  light: "btn-light",
  "outline-light": "btn-outline-light",
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "sm" | "md";
  arrow?: boolean;
  className?: string;
};

/** A link styled as a button. Internal routes use next/link, everything else a plain anchor. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  className,
}: ButtonLinkProps) {
  const classes = cn("btn", variantClass[variant], size === "sm" && "btn-sm", className);
  const content = (
    <>
      {children}
      {arrow ? <ArrowIcon className="btn-arrow" /> : null}
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  );
}
