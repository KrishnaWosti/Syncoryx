import Link from "next/link";
import { Logo } from "@/components/site/Logo";
import { defaultSiteFields } from "@/lib/site-fields";
import { bookHref, site } from "@/lib/site";

const serviceLinks = [
  { href: "/services/marketplace-integration", label: "Marketplace integration" },
  { href: "/services/shopify", label: "Shopify development and management" },
  { href: "/services/app-support", label: "Support for Shopify apps and SaaS" },
  { href: "/services", label: "All services" },
];

const companyLinks = [
  { href: "/work", label: "Work" },
  { href: "/process", label: "How we work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h2 className="t-eyebrow">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[0.9375rem] text-[#d5d9ea] transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer({
  tagline = defaultSiteFields.footerTagline,
  email = site.email,
}: {
  tagline?: string;
  email?: string;
}) {
  return (
    <footer className="on-dark">
      <div className="wrap grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10">
        <div className="max-w-sm">
          <Link href="/" aria-label="Syncoryx home" className="inline-block text-white">
            <Logo />
          </Link>
          <p className="mt-5 text-[0.9375rem] text-[#b9bfd6]">
            Your eCommerce growth, technology and support partner.
          </p>
          <p className="t-mono mt-3 text-[#8e96b8]">{tagline}</p>
        </div>

        <FooterColumn title="Services" links={serviceLinks} />
        <FooterColumn title="Company" links={companyLinks} />

        <div>
          <h2 className="t-eyebrow">Get in touch</h2>
          <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
            <li>
              <Link href={bookHref} className="text-white underline underline-offset-4">
                Book a free call
              </Link>
            </li>
            <li>
              <a
                href={"mailto:" + email}
                className="text-[#d5d9ea] transition-colors hover:text-white"
              >
                {email}
              </a>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-[#d5d9ea] transition-colors hover:text-white"
              >
                Send a message
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-night-line">
        <div className="wrap flex flex-col gap-3 py-6 text-[0.8125rem] text-[#8e96b8] md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="max-w-xl md:text-right">
            Syncoryx is an independent agency. Shopify, Etsy, Walmart, TikTok Shop, eBay,
            Faire and Square are trademarks of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
