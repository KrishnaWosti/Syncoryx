/**
 * Shared service content: used on the home page, the services hub,
 * structured data and the sitemap.
 */

export type ServicePillar = {
  slug: string;
  href: string;
  audience: string;
  title: string;
  navTitle: string;
  linkLabel: string;
  summary: string;
  highlights: string[];
};

export const pillars: ServicePillar[] = [
  {
    slug: "marketplace-integration",
    href: "/services/marketplace-integration",
    audience: "For retailers and brands",
    title: "Marketplace integration and multi-channel operations",
    navTitle: "Marketplace integration",
    linkLabel: "Explore marketplace integration",
    summary:
      "Selling on more channels should not mean more spreadsheets. We pick the right connector apps, implement the integration, configure it properly and keep it running.",
    highlights: [
      "Marketplace onboarding and setup",
      "Catalog, inventory and pricing sync",
      "Order sync and fulfilment workflows",
      "Listing management across channels",
      "Monitoring and troubleshooting",
    ],
  },
  {
    slug: "shopify",
    href: "/services/shopify",
    audience: "For retailers and brands",
    title: "Shopify development, store management and growth",
    navTitle: "Shopify development and management",
    linkLabel: "Explore Shopify services",
    summary:
      "From a first launch to an established store that needs steady hands. We build, maintain and improve the storefront your growth depends on.",
    highlights: [
      "Store setup, configuration and launch",
      "Theme customization and custom functionality",
      "Custom Shopify apps and integrations",
      "Conversion, speed and UX improvements",
      "Analytics, tracking and marketing tech",
    ],
  },
  {
    slug: "app-support",
    href: "/services/app-support",
    audience: "For app developers and SaaS teams",
    title: "Dedicated customer support for Shopify apps and SaaS",
    navTitle: "Support for Shopify apps and SaaS",
    linkLabel: "Explore app support",
    summary:
      "Your product is automated. Your customers still want a person. We provide trained, eCommerce-fluent support professionals from a shared pool, so you get a real support function without hiring one.",
    highlights: [
      "First-line live chat and email support",
      "Onboarding and setup guidance",
      "Technical troubleshooting",
      "Escalations to your developers, with context",
      "Help docs and customer feedback loops",
    ],
  },
];

export const supportingServices = [
  {
    title: "Product catalog management",
    body: "New products, variants, collections and seasonal changes handled on a schedule, on every channel you sell on.",
  },
  {
    title: "Product data enrichment",
    body: "Titles, attributes, categories and images organized to each marketplace's requirements, so listings get approved and found.",
  },
  {
    title: "Technical maintenance",
    body: "App updates, theme fixes, broken flows and the small jobs that pile up, picked up before they turn into outages.",
  },
  {
    title: "Marketplace account management",
    body: "Day to day care of seller accounts: listing health, policy flags, account settings and channel housekeeping.",
  },
  {
    title: "Workflow automation",
    body: "Repetitive order, inventory and tagging tasks turned into automations with clear rules and a fallback when something fails.",
  },
];

export const processSteps = [
  {
    title: "Free assessment call",
    body: "Thirty minutes on a video call. You walk us through your store, your channels or your app, and we ask the awkward questions.",
  },
  {
    title: "A written plan",
    body: "You get the scope, the tools we recommend, the cost and what we need from you, in writing, before any work starts.",
  },
  {
    title: "We implement",
    body: "We set up, configure, migrate and test. You sign off the milestones that matter and skip the rest.",
  },
  {
    title: "We stay on it",
    body: "Monitoring, maintenance and support carry on after launch, so the work keeps working.",
  },
];
