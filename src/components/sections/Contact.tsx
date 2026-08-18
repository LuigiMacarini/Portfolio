"use client";

import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/layout/Section";
import { SOCIALS, RESUME_EMAIL } from "@/lib/socials";
import type { Dictionary } from "@/app/[locale]/dictionaries";

const MESSAGE_LIMIT = 500;

type Status = "idle" | "sending" | "success" | "fallback" | "error";

export function Contact({ dict }: { dict: Dictionary["contact"] }) {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [fallbackHref, setFallbackHref] = useState("");
  const activeSocials = SOCIALS.filter((social) => social.href);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const company = String(formData.get("company") ?? "");
    const messageValue = String(formData.get("message") ?? "");

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, message: messageValue }),
      });

      if (!response.ok) throw new Error("request failed");

      const data = (await response.json()) as { ok: boolean; delivered?: boolean };

      if (data.delivered) {
        setStatus("success");
        form.reset();
        setMessage("");
        return;
      }

      const subject = encodeURIComponent(`Portfolio contact: ${name}`);
      const bodyLines = [company ? `Company: ${company}` : null, `Email: ${email}`, "", messageValue]
        .filter((line): line is string => line !== null)
        .join("\n");
      setFallbackHref(
        `mailto:${RESUME_EMAIL}?subject=${subject}&body=${encodeURIComponent(bodyLines)}`
      );
      setStatus("fallback");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id="contact">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionHeading eyebrow={dict.eyebrow} heading={dict.heading} />
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-mist-600">{dict.body}</p>
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-12">
              <p className="font-mono text-[10px] uppercase tracking-wider text-mist-400">
                {dict.altHeading}
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {activeSocials.map((social) => (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      target={social.href.startsWith("http") ? "_blank" : undefined}
                      rel={social.href.startsWith("http") ? "noreferrer noopener" : undefined}
                      className="inline-flex items-center gap-2 font-display text-lg uppercase tracking-tight transition-colors hover:text-signal-ink"
                    >
                      {social.label} <span aria-hidden>↗</span>
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={`mailto:${RESUME_EMAIL}`}
                    className="inline-flex items-center gap-2 font-display text-lg uppercase tracking-tight transition-colors hover:text-signal-ink"
                  >
                    {RESUME_EMAIL} <span aria-hidden>↗</span>
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={100} className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="border border-line">
            <div className="grid grid-cols-1 divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0">
              <Field label={dict.form.name} name="name" autoComplete="name" required />
              <Field label={dict.form.email} name="email" type="email" autoComplete="email" required />
            </div>
            <div className="border-t border-line">
              <Field label={dict.form.company} name="company" autoComplete="organization" />
            </div>
            <div className="border-t border-line p-5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="message"
                  className="font-mono text-[10px] uppercase tracking-wider text-mist-400"
                >
                  {dict.form.message}
                </label>
                <span className="font-mono text-[10px] text-mist-400">
                  {message.length}/{MESSAGE_LIMIT}
                </span>
              </div>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                maxLength={MESSAGE_LIMIT}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="mt-2 w-full resize-none bg-transparent font-sans text-sm text-ink outline-none transition-colors focus:bg-mist-50 placeholder:text-mist-300"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line p-5">
              <Button type="submit" variant="solid" disabled={status === "sending"}>
                {status === "sending" ? dict.form.sending : dict.form.submit}
              </Button>
              {status === "success" && (
                <p className="font-mono text-xs uppercase tracking-wide text-signal-ink">
                  {dict.form.success}
                </p>
              )}
              {status === "fallback" && (
                <a
                  href={fallbackHref}
                  className="font-mono text-xs uppercase tracking-wide text-signal-ink underline underline-offset-4"
                >
                  {dict.form.fallback} ↗
                </a>
              )}
              {status === "error" && (
                <p className="font-mono text-xs uppercase tracking-wide text-danger">
                  {dict.form.error}
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className="p-5">
      <label htmlFor={name} className="font-mono text-[10px] uppercase tracking-wider text-mist-400">
        {label}
        {required && <span className="text-signal-ink"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-2 w-full bg-transparent font-sans text-sm text-ink outline-none transition-colors focus:bg-mist-50 placeholder:text-mist-300"
      />
    </div>
  );
}
