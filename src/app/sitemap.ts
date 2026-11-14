import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes: {
  path: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/services/marketplace-integration", changeFrequency: "monthly", priority: 0.9 },
  { path: "/services/shopify", changeFrequency: "monthly", priority: 0.9 },
  { path: "/services/app-support", changeFrequency: "monthly", priority: 0.9 },
  { path: "/work", changeFrequency: "monthly", priority: 0.7 },
  { path: "/process", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about", changeFrequency: "yearly", priority: 0.6 },
  { path: "/book", changeFrequency: "yearly", priority: 0.8 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((route) => ({
    url: site.url + route.path,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
