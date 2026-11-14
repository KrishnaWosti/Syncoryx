"use client";

import { useState } from "react";
import { ArrowIcon, CheckIcon } from "@/components/ui/icons";
import { contactLimits, contactTopics, type ContactField } from "@/lib/contact";

type Status = "idle" | "sending" | "sent";

const empty = { name: "", email: "", company: "", topic: "", message: "", website: "" };

export function ContactForm({ email }: { email: string }) {
  const [values, setValues] = useState(empty);
  const [status, setStatus] = useState<Status>("idle");
  const [fieldError, setFieldError] = useState<{ field: ContactField; text: string } | null>(
    null,
  );
  const [formError, setFormError] = useState("");

  const set =
    (key: keyof typeof empty) =>
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
      setValues((prev) => ({ ...prev, [key]: event.target.value }));
      if (fieldError?.field === key) setFieldError(null);
    };

  const errorFor = (field: ContactField) =>
    fieldError?.field === field ? fieldError.text : undefined;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFieldError(null);
    setFormError("");
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        field?: ContactField;
      };

      if (res.ok) {
        setStatus("sent");
        setValues(empty);
        // Bring the confirmation into view: the submit button sits below it.
        document.getElementById("message")?.scrollIntoView({ block: "start" });
        return;
      }

      if (data.field && data.error) {
        setFieldError({ field: data.field, text: data.error });
        document.getElementById("contact-" + data.field)?.focus();
      } else {
        setFormError(data.error || "Your message was not sent. Try again in a moment.");
      }
      setStatus("idle");
    } catch {
      setFormError("We could not reach the server. Check your connection and try again.");
      setStatus("idle");
    }
  };

  if (status === "sent") {
    return (
      <div role="status" className="rounded-[14px] border border-line bg-paper p-7 sm:p-10">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ok-tint text-ok">
          <CheckIcon width={20} height={20} />
        </span>
        <h2 className="t-h2 mt-6 !text-[1.75rem]">Message sent.</h2>
        <p className="t-body mt-3 max-w-md">
          Thanks for getting in touch. We read every message and reply within one business
          day, to the email address you gave us.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="link-arrow mt-7"
        >
          Send another message
          <ArrowIcon />
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[14px] border border-line bg-paper p-6 sm:p-9"
    >
      <h2 className="t-h2 !text-[1.75rem]">Send us a message</h2>
      <p className="t-body mt-2 text-[1rem]">
        Tell us what you are working on. We reply within one business day.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="field-label">
            Your name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={contactLimits.name}
            value={values.name}
            onChange={set("name")}
            disabled={sending}
            aria-invalid={errorFor("name") ? true : undefined}
            aria-describedby={errorFor("name") ? "contact-name-error" : undefined}
            className="field"
          />
          {errorFor("name") ? (
            <p id="contact-name-error" className="field-error">
              {errorFor("name")}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-email" className="field-label">
            Work email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={contactLimits.email}
            value={values.email}
            onChange={set("email")}
            disabled={sending}
            aria-invalid={errorFor("email") ? true : undefined}
            aria-describedby={errorFor("email") ? "contact-email-error" : undefined}
            className="field"
          />
          {errorFor("email") ? (
            <p id="contact-email-error" className="field-error">
              {errorFor("email")}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-company" className="field-label">
            Store URL or company{" "}
            <span className="font-normal text-ink-mute">(optional)</span>
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={contactLimits.company}
            placeholder="yourstore.com"
            value={values.company}
            onChange={set("company")}
            disabled={sending}
            aria-invalid={errorFor("company") ? true : undefined}
            aria-describedby={errorFor("company") ? "contact-company-error" : undefined}
            className="field"
          />
          {errorFor("company") ? (
            <p id="contact-company-error" className="field-error">
              {errorFor("company")}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-topic" className="field-label">
            What do you need help with?
          </label>
          <select
            id="contact-topic"
            name="topic"
            required
            value={values.topic}
            onChange={set("topic")}
            disabled={sending}
            aria-invalid={errorFor("topic") ? true : undefined}
            aria-describedby={errorFor("topic") ? "contact-topic-error" : undefined}
            className="field"
          >
            <option value="" disabled>
              Choose one
            </option>
            {contactTopics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
          {errorFor("topic") ? (
            <p id="contact-topic-error" className="field-error">
              {errorFor("topic")}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className="field-label">
            Your message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={6}
            maxLength={contactLimits.message}
            placeholder="What are you selling or building, which channels or tools are involved, and what is getting in the way?"
            value={values.message}
            onChange={set("message")}
            disabled={sending}
            aria-invalid={errorFor("message") ? true : undefined}
            aria-describedby={errorFor("message") ? "contact-message-error" : undefined}
            className="field resize-y"
          />
          {errorFor("message") ? (
            <p id="contact-message-error" className="field-error">
              {errorFor("message")}
            </p>
          ) : null}
        </div>

        {/* Honeypot: hidden from people, tempting to bots. */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="contact-website">Leave this field empty</label>
          <input
            id="contact-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={set("website")}
          />
        </div>
      </div>

      {formError ? (
        <p role="alert" className="mt-6 rounded-[10px] bg-[#fef3f2] px-4 py-3 text-[0.9375rem] font-medium text-[#b42318]">
          {formError} You can reach us at{" "}
          <a href={"mailto:" + email} className="underline underline-offset-4">
            {email}
          </a>{" "}
          instead.
        </p>
      ) : null}

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={sending} className="btn btn-primary disabled:opacity-60">
          {sending ? "Sending message" : "Send message"}
          {sending ? null : <ArrowIcon className="btn-arrow" />}
        </button>
        <p className="text-[0.875rem] text-ink-mute sm:max-w-xs sm:text-right">
          We only use these details to reply to you.
        </p>
      </div>
    </form>
  );
}
