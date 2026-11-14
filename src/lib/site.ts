/**
 * Single source of truth for brand details, contact info and navigation.
 * Change the Calendly link here and every "Book a free call" entry point follows.
 */
export const site = {
  name: "Syncoryx",
  url: "https://syncoryx.agency",
  email: "contact@syncoryx.agency",
  positioning: "eCommerce growth, technology and support partner",
  description:
    "Syncoryx is an eCommerce growth, technology and support partner. We integrate marketplaces, build and manage Shopify stores, and provide human customer support for Shopify apps and eCommerce SaaS.",
  /** Calendly event used for the free assessment call. */
  calendlyUrl: "https://calendly.com/syncoryx-info/30min",
  callLength: "30 minutes",
} as const;

export const bookHref = "/book";

export const mainNav = [
  { href: "/services/marketplace-integration", label: "Marketplaces" },
  { href: "/services/shopify", label: "Shopify" },
  { href: "/services/app-support", label: "App support" },
  { href: "/work", label: "Work" },
  { href: "/process", label: "How we work" },
  { href: "/about", label: "About" },
] as const;

export const platforms = [
  "Shopify",
  "Etsy",
  "Walmart Marketplace",
  "TikTok Shop",
  "eBay",
  "Faire",
  "Square",
] as const;

/** Escape "<" so JSON-LD can be inlined safely. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\u003c");
}
