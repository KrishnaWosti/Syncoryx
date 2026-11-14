import { ButtonLink } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/icons";
import { bookHref, site } from "@/lib/site";

const callPoints = [
  "You walk us through your store, channels or app",
  "We say what we would do, and in what order",
  "You hear plainly whether we are the right team for it",
];

/** The closing conversion block used at the foot of every page. */
export function CtaBand({
  title = "Tell us what is slowing you down.",
  body = "Book a free 30-minute call. We assess your setup and requirements, and show you how we would help. No pitch deck and no obligation.",
  email = site.email,
}: {
  title?: string;
  body?: string;
  email?: string;
}) {
  return (
    <section className="on-signal">
      <div className="wrap grid gap-12 py-20 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:py-28">
        <div>
          <p className="t-eyebrow">Free assessment call</p>
          <h2 className="t-h1 mt-5 max-w-2xl">{title}</h2>
          <p className="t-lead mt-6 max-w-xl">{body}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={bookHref} variant="light" arrow>
              Book a free call
            </ButtonLink>
            <ButtonLink href={"mailto:" + email} variant="outline-light">
              Email us instead
            </ButtonLink>
          </div>
        </div>

        <div className="border-t border-white/25 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <p className="t-eyebrow">On the call</p>
          <ul className="mt-5 space-y-4">
            {callPoints.map((point) => (
              <li key={point} className="flex gap-3 text-[1.0625rem] text-white">
                <CheckIcon className="mt-1.5 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
