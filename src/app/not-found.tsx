import { PageShell } from "@/components/site/PageShell";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <PageShell>
      <section>
        <div className="wrap py-24 lg:py-36">
          <p className="t-eyebrow">Error 404</p>
          <h1 className="t-h1 mt-5 max-w-[16ch]">This page is out of sync.</h1>
          <p className="t-lead mt-6 max-w-xl">
            The address may have changed, or the page never existed. The links below will
            get you back on track.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/" arrow>
              Go to the home page
            </ButtonLink>
            <ButtonLink href="/services" variant="outline">
              See our services
            </ButtonLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
