import type { Metadata } from "next";
import { ContactForm } from "@/components/site/ContactForm";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/ServiceParts";
import { ButtonLink } from "@/components/ui/Button";
import { getSiteFields } from "@/lib/site-fields";
import { bookHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Syncoryx",
  description:
    "Contact Syncoryx about marketplace integrations, Shopify development and store management, or customer support for your Shopify app. Send a message, book a free call or email us.",
  alternates: { canonical: "/contact" },
};

// Reads the contact email set in /admin.
export const revalidate = 0;

const include = [
  "Your store URL, or a link to your app",
  "The marketplaces, apps and tools you use today",
  "What is going wrong, or what you want to launch",
  "Any deadline we should know about",
];

export default async function ContactPage() {
  const { contactEmail, footerTagline } = await getSiteFields();

  return (
    <PageShell footerTagline={footerTagline} email={contactEmail}>
      <PageHero
        crumbs={[{ href: "/contact", label: "Contact" }]}
        eyebrow="Contact"
        title="Talk to us."
        lead="Send a message with the form below and we reply within one business day. If you would rather talk it through, book a free 30-minute call."
        secondary={{ href: "#message", label: "Send a message" }}
      />

      <section id="message" className="section bg-mist">
        <div className="wrap grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:items-start">
          <ContactForm email={contactEmail} />

          <div className="grid gap-5">
            <div className="on-signal rounded-[14px] p-7 sm:p-8">
              <p className="t-eyebrow">Prefer to talk?</p>
              <h2 className="t-h2 mt-4 !text-[1.5rem]">Book a free call</h2>
              <p className="t-body mt-3 text-[1rem]">
                Pick a time that suits you. We assess your requirements and show you how we
                would help.
              </p>
              <div className="mt-6">
                <ButtonLink href={bookHref} variant="light" arrow>
                  Choose a time
                </ButtonLink>
              </div>
            </div>

            <div className="rounded-[14px] border border-line bg-paper p-7 sm:p-8">
              <p className="t-eyebrow">Email</p>
              <a
                href={"mailto:" + contactEmail}
                className="mt-3 inline-block break-all font-semibold text-signal underline underline-offset-4"
              >
                {contactEmail}
              </a>

              <p className="t-eyebrow mt-8">Helpful to include</p>
              <ul className="mt-4 space-y-3 text-[0.9375rem]">
                {include.map((item) => (
                  <li key={item} className="flex gap-3 leading-snug">
                    <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
