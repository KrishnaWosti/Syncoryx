import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  children,
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? <p className="t-eyebrow">{eyebrow}</p> : null}
      <Tag className={cn(Tag === "h1" ? "t-h1" : "t-h2", eyebrow && "mt-4")}>{title}</Tag>
      {children ? <p className="t-lead mt-5 max-w-2xl">{children}</p> : null}
    </div>
  );
}
