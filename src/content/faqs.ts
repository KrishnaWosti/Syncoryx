import type { FaqItem } from "@/components/site/Faq";

export const homeFaqs: FaqItem[] = [
  {
    q: "What happens on the free call?",
    a: "It is a 30-minute video call booked through Calendly. You walk us through your store, your sales channels or your app, and what is getting in the way. We assess your requirements, explain how we would approach them, and tell you honestly if we are not the right fit. There is no charge and no obligation.",
  },
  {
    q: "Which marketplaces and platforms do you work with?",
    a: "Shopify is our home base. On the marketplace side we work with Etsy, Walmart Marketplace, TikTok Shop, eBay, Faire and Square, along with the connector apps that link them. If you sell somewhere that is not on this list, ask. The method carries over.",
  },
  {
    q: "Do you only take on new builds, or existing stores and integrations too?",
    a: "Both. Much of our work is inheriting a store or an integration that already exists and is misbehaving. We find out why inventory is drifting or orders are stuck, fix it, and then keep an eye on it.",
  },
  {
    q: "We are a small app team. Is outsourced support realistic for us?",
    a: "That is exactly who it is built for. You get trained support professionals from a shared pool, with coverage sized to your ticket volume, instead of hiring, training and managing a full-time team. As your install base grows, the coverage grows with it.",
  },
  {
    q: "Do you guarantee sales or revenue results?",
    a: "No, and we are wary of anyone who does. Sales depend on your product, pricing and market. What we take responsibility for is the technical and operational foundation: channels that stay in sync, a store that works and converts well, and customers who get answers.",
  },
  {
    q: "How is pricing structured?",
    a: "It depends on the scope. One-off projects such as a store build or a marketplace integration are quoted after the assessment call. Ongoing management and support are sized to the workload and coverage you need. You get the numbers in writing before any work starts.",
  },
];

export const marketplaceFaqs: FaqItem[] = [
  {
    q: "Do you build the integration yourselves or use existing apps?",
    a: "Usually the right answer is an established connector app, configured properly. We help you choose one that fits your catalog, order volume and budget, then implement and manage it. Where an off-the-shelf connector cannot do what you need, we can build custom functionality around it.",
  },
  {
    q: "We already have an integration and it keeps breaking. Can you take it over?",
    a: "Yes. We start by finding out why: mismatched SKUs, variant mapping, sync rules that conflict, or an app that is simply the wrong fit. Then we fix the cause rather than patching symptoms, and monitor it afterwards.",
  },
  {
    q: "Which marketplaces should we start with?",
    a: "It depends on your products, margins and how much operational load you can absorb. That is one of the main things we cover on the assessment call. Starting with one channel and getting it stable usually beats launching five at once.",
  },
  {
    q: "Will our Shopify store stay the source of truth?",
    a: "In most setups, yes. Products, inventory and pricing are managed in Shopify and pushed to each marketplace, and orders flow back in. We agree the rules up front so there is one place to make a change.",
  },
  {
    q: "What does ongoing management include?",
    a: "Watching sync health, resolving listing and order errors, handling catalog updates across channels, and dealing with marketplace or app changes when they happen. You get one team to call instead of several vendors.",
  },
];

export const shopifyFaqs: FaqItem[] = [
  {
    q: "We do not have a store yet. Where do we start?",
    a: "With the assessment call. We look at what you are selling, how you will fulfil orders and where else you want to sell, then set up the store, theme, products, payments, shipping and essential apps, and support you through launch.",
  },
  {
    q: "Can you work on a store someone else built?",
    a: "Yes. We review the theme, apps and customizations first so we know what we are inheriting, then take on changes and maintenance from there.",
  },
  {
    q: "Do you build custom Shopify apps?",
    a: "Yes, when a store needs functionality that no existing app provides well. We will tell you first if an existing app would do the job for less.",
  },
  {
    q: "Do you run ads or guarantee growth?",
    a: "No. We do not manage ad spend and we do not promise revenue. We handle the technical side that marketing depends on: landing pages, product pages, checkout, tracking, analytics and the apps your marketing team uses.",
  },
  {
    q: "Can we hand over day to day store management?",
    a: "Yes. Product and collection updates, app upkeep, theme fixes and small improvements can all sit with us on an ongoing basis, so the store keeps moving without tying up your team.",
  },
];

export const appSupportFaqs: FaqItem[] = [
  {
    q: "How does the shared pool model work?",
    a: "Rather than hiring dedicated full-time staff, you draw on a pool of trained support professionals who are briefed on your product. You get the coverage you need without paying for idle time, and there is cover when someone is away.",
  },
  {
    q: "How do your people learn our app?",
    a: "We start with onboarding: your docs, a walkthrough of the product, your most common tickets and your tone of voice. We build internal notes as we go, and anything we cannot answer is escalated to you and added to those notes.",
  },
  {
    q: "What happens to tickets you cannot solve?",
    a: "They are escalated to your development team with the store details, what the customer was trying to do, what we already tried and steps to reproduce. Your developers get a clear report, not a forwarded complaint.",
  },
  {
    q: "Which channels and tools do you work in?",
    a: "Live chat and email are the core. We work inside your existing helpdesk and tools, so customers see one consistent support experience under your brand.",
  },
  {
    q: "Is this just a virtual assistant service?",
    a: "No. Our support staff understand how online stores, marketplaces, integrations and Shopify apps work, because that is the rest of our business. They can troubleshoot a merchant's setup, not only read from a script.",
  },
  {
    q: "Can coverage change as we grow?",
    a: "Yes. Coverage is based on your requirements and can be scaled up as your install base and ticket volume grow.",
  },
];

export const processFaqs: FaqItem[] = [
  {
    q: "What do you need from us to get started?",
    a: "Access to the relevant accounts (store, marketplace seller accounts, helpdesk), a point of contact who can make decisions, and an honest picture of what is and is not working today.",
  },
  {
    q: "How long does a project take?",
    a: "It depends on scope. A single marketplace integration is a very different job from a full store build. After the assessment call you get a written plan with a timeline you can hold us to.",
  },
  {
    q: "Do you work with our existing apps and tools?",
    a: "Wherever they are doing their job, yes. We only recommend a change when a tool is the cause of the problem or a better fit clearly exists.",
  },
  {
    q: "What happens after launch?",
    a: "You can keep us on for monitoring, maintenance and support, or take it in-house with a proper handover. Integrations and stores need looking after either way, so we plan for it from the start.",
  },
];
