import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { jsonLd, site } from "@/lib/site";

// Display: Archivo with its width axis, set wide to echo the extended wordmark.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

// Utility face for SKUs, order numbers, statuses and labels.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const title = "Syncoryx | eCommerce Growth, Technology & Support Partner";

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s | Syncoryx",
  },
  description: site.description,
  applicationName: site.name,
  metadataBase: new URL(site.url),
  alternates: { canonical: "/" },
  keywords: [
    "eCommerce agency",
    "marketplace integration",
    "multi-channel eCommerce",
    "Shopify development",
    "Shopify store management",
    "Shopify app customer support",
    "outsourced support for Shopify apps",
    "Etsy Shopify integration",
    "Walmart Marketplace integration",
    "TikTok Shop integration",
    "eBay Shopify integration",
    "Faire integration",
    "inventory sync",
    "product catalog management",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Marketplace integrations, Shopify development and store management, and human support for Shopify apps.",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

const organizationLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": site.url + "/#org",
      name: site.name,
      url: site.url,
      email: site.email,
      logo: site.url + "/logo.png",
      description: site.description,
      knowsAbout: [
        "Shopify",
        "Marketplace integration",
        "Multi-channel eCommerce operations",
        "Customer support for Shopify apps",
      ],
    },
    {
      "@type": "WebSite",
      "@id": site.url + "/#website",
      url: site.url,
      name: site.name,
      publisher: { "@id": site.url + "/#org" },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVars = [archivo.variable, instrument.variable, plexMono.variable].join(" ");

  return (
    <html lang="en" className={fontVars + " h-full"}>
      <body className="flex min-h-full flex-col">
        <Providers>{children}</Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(organizationLd) }}
        />
      </body>
    </html>
  );
}
