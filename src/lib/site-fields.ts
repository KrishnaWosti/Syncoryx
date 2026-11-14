import { cache } from "react";
import { getDb } from "@/lib/mongodb";
import { site } from "@/lib/site";

/**
 * Copy that can be edited from /admin. Stored in the "settings" collection.
 * The key is versioned so copy saved for the previous site design does not
 * override the current messaging.
 */
export const SITE_FIELDS_KEY = "site_fields_v2";

export type SiteFields = {
  heroTagline: string;
  heroSubtitle: string;
  ctaText: string;
  contactEmail: string;
  footerTagline: string;
  workSectionTitle: string;
  workSectionSubtitle: string;
};

export const defaultSiteFields: SiteFields = {
  // [Brackets] mark the highlighted phrase. A line break starts a new line.
  heroTagline: "We run the [hard parts] of eCommerce.",
  heroSubtitle:
    "Syncoryx connects your store to the marketplaces worth selling on, builds and manages your Shopify storefront, and staffs human support for Shopify apps. One partner, accountable for the technical and operational work.",
  ctaText: "Book a free call",
  contactEmail: site.email,
  footerTagline: "Marketplace integrations · Shopify · App support",
  workSectionTitle: "Recent work, described plainly.",
  workSectionSubtitle:
    "A few engagements that show the kind of problems we take on. Client names stay private.",
};

export const siteFieldNames = Object.keys(defaultSiteFields) as (keyof SiteFields)[];

/** Reads editable copy, falling back to defaults if the database is unreachable. */
export const getSiteFields = cache(async (): Promise<SiteFields> => {
  try {
    const db = await getDb();
    const stored = await db.collection("settings").findOne({ key: SITE_FIELDS_KEY });
    if (!stored) return defaultSiteFields;

    const merged = { ...defaultSiteFields };
    for (const name of siteFieldNames) {
      const value = stored[name];
      if (typeof value === "string" && value.trim()) merged[name] = value;
    }
    return merged;
  } catch (error) {
    console.warn("Site fields unavailable, using defaults:", (error as Error).message);
    return defaultSiteFields;
  }
});
