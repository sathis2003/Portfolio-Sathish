import { type FormEvent, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ArrowUpRight } from "lucide-react";
import { emailAddress, githubUrl, linkedInUrl, phoneHref, phoneNumber } from "../../data";

type Status = "idle" | "sending" | "sent" | "error";
type EmailJSError = { text?: string; status?: number; message?: string };

const SERVICE_ID = (import.meta.env as Record<string, string>).VITE_EMAILJS_SERVICE_ID ?? "";
const TEMPLATE_ID = (import.meta.env as Record<string, string>).VITE_EMAILJS_TEMPLATE_ID ?? "";
const TEMPLATE_NOTIFY_ID =
  (import.meta.env as Record<string, string>).VITE_EMAILJS_TEMPLATE_NOTIFY_ID ?? "";
const PUBLIC_KEY = (import.meta.env as Record<string, string>).VITE_EMAILJS_PUBLIC_KEY ?? "";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorDetail, setErrorDetail] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorDetail("");

    const timeInput = form.querySelector<HTMLInputElement>('input[name="time"]');
    if (timeInput) {
      timeInput.value = new Intl.DateTimeFormat("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Kolkata",
      }).format(new Date()) + " IST";
    }

    try {
      const autoReply = emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, {
        publicKey: PUBLIC_KEY,
      });

      const notify = TEMPLATE_NOTIFY_ID
        ? emailjs.sendForm(SERVICE_ID, TEMPLATE_NOTIFY_ID, form, {
            publicKey: PUBLIC_KEY,
          })
        : Promise.resolve(null);

      const results = await Promise.allSettled([autoReply, notify]);

      const describe = (r: PromiseSettledResult<unknown>, label: string) => {
        if (r.status === "fulfilled") return null;
        const reason = r.reason as EmailJSError;
        const detail = reason?.text || reason?.message || JSON.stringify(reason);
        console.error(`[EmailJS] ${label} failed:`, reason);
        return `${label}: ${detail}`;
      };

      const autoReplyErr = describe(results[0], "Auto-reply");
      const notifyErr = describe(results[1], "Notification");

      if (autoReplyErr) {
        setErrorDetail(autoReplyErr);
        setStatus("error");
        return;
      }

      if (notifyErr) {
        setErrorDetail(notifyErr);
        setStatus("error");
        return;
      }

      setStatus("sent");
      formRef.current?.reset();
    } catch (err) {
      console.error("[EmailJS] Unexpected failure:", err);
      setErrorDetail(err instanceof Error ? err.message : "Unknown error");
      setStatus("error");
    }
  }

  const [user, domain] = emailAddress.split("@");

  return (
    <section className="contact" id="contact" data-section>
      <div className="shell">
        <div className="contact-card" data-reveal>
          <span className="contact-eyebrow">
            <span className="dot" aria-hidden="true" />
            Currently accepting projects
          </span>

          <h2 className="contact-headline">
            Let's build <span className="serif">something</span> together.
          </h2>

          <a className="contact-email" href={`mailto:${emailAddress}`}>
            <span>{user}</span>
            <span className="at">@</span>
            <span>{domain}</span>
          </a>

          <div className="contact-row">
            <div className="contact-direct">
              <span className="contact-direct-label">Direct lines</span>
              <a href={phoneHref}>
                <span className="key">Phone</span>
                <span>{phoneNumber}</span>
                <ArrowUpRight size={14} className="arrow" />
              </a>
              <a href={linkedInUrl} target="_blank" rel="noreferrer">
                <span className="key">LinkedIn</span>
                <span>/sathish-kumar-p</span>
                <ArrowUpRight size={14} className="arrow" />
              </a>
              <a href={githubUrl} target="_blank" rel="noreferrer">
                <span className="key">GitHub</span>
                <span>/sathis2003</span>
                <ArrowUpRight size={14} className="arrow" />
              </a>
            </div>

            <form className="contact-form" ref={formRef} onSubmit={handleSubmit} noValidate>
              <input type="hidden" name="time" defaultValue="" />
              <span className="label">Or drop a message</span>
              <div className="field">
                <label htmlFor="from_name">Name</label>
                <input
                  id="from_name"
                  name="from_name"
                  type="text"
                  required
                  placeholder="Priya S."
                  autoComplete="name"
                  disabled={status === "sending" || status === "sent"}
                />
              </div>
              <div className="field">
                <label htmlFor="reply_to">Email</label>
                <input
                  id="reply_to"
                  name="reply_to"
                  type="email"
                  required
                  placeholder="you@company.com"
                  autoComplete="email"
                  disabled={status === "sending" || status === "sent"}
                />
              </div>
              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={3}
                  placeholder="What are you building?"
                  disabled={status === "sending" || status === "sent"}
                />
              </div>

              {status === "sent" && (
                <div className="form-status ok">Sent — I'll reply within 24h.</div>
              )}
              {status === "error" && (
                <div className="form-status err">
                  {!SERVICE_ID
                    ? "EmailJS not configured — see .env.example."
                    : errorDetail
                      ? `Couldn't send: ${errorDetail}`
                      : "Couldn't send — email me directly."}
                </div>
              )}

              {status !== "sent" && (
                <button
                  type="submit"
                  className="btn btn-on-dark"
                  disabled={status === "sending"}
                  style={{ justifySelf: "start", marginTop: 6 }}
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                  <ArrowUpRight size={15} />
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
