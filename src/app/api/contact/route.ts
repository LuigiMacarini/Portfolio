import { RESUME_EMAIL } from "@/lib/socials";

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  message?: unknown;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const { name, email, company, message } = body;

  if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(message)) {
    return Response.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return Response.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ ok: true, delivered: false });
  }

  const companyLine = isNonEmptyString(company) ? `Company: ${company}\n` : "";

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // onboarding@resend.dev only works for a Resend sandbox account. Once
        // a real sending domain is verified in Resend, swap this address.
        from: "Portfolio <onboarding@resend.dev>",
        to: RESUME_EMAIL,
        reply_to: email,
        subject: `Portfolio contact: ${name}`,
        text: `${companyLine}Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    });

    return Response.json({ ok: true, delivered: resendResponse.ok });
  } catch {
    return Response.json({ ok: true, delivered: false });
  }
}
