import { ArtifactCaption } from "@/components/site/Artifacts";
import { SyncBoard } from "@/components/site/SyncBoard";
import { ButtonLink } from "@/components/ui/Button";
import { defaultSiteFields, type SiteFields } from "@/lib/site-fields";
import { bookHref, site } from "@/lib/site";

/** Renders the editable tagline: [brackets] highlight a phrase, a newline breaks the line. */
function Tagline({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, lineIndex) => (
        <span key={lineIndex}>
          {lineIndex > 0 ? <br /> : null}
          {line.split(/\[(.*?)\]/).map((part, partIndex) =>
            partIndex % 2 === 1 ? (
              <span key={partIndex} className="text-signal">
                {part}
              </span>
            ) : (
              part
            ),
          )}
        </span>
      ))}
    </>
  );
}

export function Hero({
  fields = defaultSiteFields,
}: {
  fields?: Pick<SiteFields, "heroTagline" | "heroSubtitle" | "ctaText">;
}) {
  return (
    <section className="overflow-hidden border-b border-line">
      <div className="wrap pb-16 pt-12 sm:pt-16 lg:pb-24 lg:pt-20">
        <p className="t-eyebrow">{site.positioning}</p>
        <h1 className="t-hero mt-6 max-w-[17ch]">
          <Tagline text={fields.heroTagline} />
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:mt-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="min-w-0 lg:pt-2">
            <p className="t-lead max-w-xl">{fields.heroSubtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={bookHref} arrow>
                {fields.ctaText}
              </ButtonLink>
              <ButtonLink href="#services" variant="outline">
                See what we take on
              </ButtonLink>
            </div>
            <p className="mt-5 max-w-md text-[0.9375rem] text-ink-mute">
              A free 30-minute call. We assess what you need and tell you plainly whether
              we can help.
            </p>
          </div>

          <div className="min-w-0">
            <SyncBoard />
            {/* The other side of the business: a support ticket, in one line. */}
            <div className="panel mt-3 flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
              <span className="t-eyebrow shrink-0 !text-[0.625rem]">App support inbox</span>
              <span className="min-w-0 flex-1 truncate text-[0.875rem] font-medium">
                &ldquo;Etsy orders are not importing after install&rdquo;
              </span>
              <span className="pill pill-ok shrink-0 self-start sm:self-auto">
                Resolved in chat
              </span>
            </div>
            <ArtifactCaption>
              Illustration with sample data: the kind of work we set up and look after.
            </ArtifactCaption>
          </div>
        </div>
      </div>
    </section>
  );
}
