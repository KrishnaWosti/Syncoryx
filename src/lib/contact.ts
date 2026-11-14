/** Shared between the contact form and the API route that stores messages. */
export const contactTopics = [
  "Marketplace integration",
  "Shopify development or store management",
  "Support for our app or SaaS",
  "Something else",
] as const;

export type ContactTopic = (typeof contactTopics)[number];

export const contactLimits = {
  name: 100,
  email: 200,
  company: 200,
  message: 5000,
  minMessage: 10,
} as const;

export type ContactField = "name" | "email" | "company" | "topic" | "message";
