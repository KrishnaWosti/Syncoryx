import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://syncoryx.agency";
const brand = "Syncoryx";

export const metadata: Metadata = {
  title: {
    default: "Syncoryx — Shopify Data, Flows & Multi‑Channel Integrations Agency",
    template: "%s | Syncoryx",
  },
  description:
    "Syncoryx is a data-first Shopify agency specializing in flow setup, multi-channel integrations, product catalog cleanup, and duplicate detection—so reporting, ads, and fulfillment stay consistent.",
  applicationName: brand,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Shopify agency",
    "Shopify data cleanup",
    "Shopify product catalog cleanup",
    "Shopify duplicate products",
    "Shopify Flow setup",
    "Shopify integrations",
    "multi-channel integrations",
    "Klaviyo integrations",
    "GA4 GTM Shopify",
    "product feed cleanup",
    "Meta catalog issues Shopify",
    "Google Merchant Center Shopify",
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
    url: siteUrl,
    siteName: brand,
    title: "Syncoryx — Shopify Data, Flows & Integrations",
    description:
      "Clean up Shopify product data, remove duplicates, set up flows, and connect multi-channel integrations without reporting drift.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Syncoryx — Shopify Data, Flows & Integrations",
    description:
      "Catalog cleanup, duplicate detection, flows, and multi-channel integrations for Shopify stores.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          {children}
          <script
            type="application/ld+json"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD required for SEO
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "Organization",
                    "@id": `${siteUrl}/#org`,
                    name: brand,
                    url: siteUrl,
                    email: "info@syncoryx.agency",
                    sameAs: [],
                    description:
                      "A data-first Shopify agency specializing in catalog cleanup, duplicate detection, flows, and multi-channel integrations.",
                  },
                  {
                    "@type": "WebSite",
                    "@id": `${siteUrl}/#website`,
                    url: siteUrl,
                    name: brand,
                    publisher: { "@id": `${siteUrl}/#org` },
                    inLanguage: "en-US",
                  },
                ],
              }),
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
