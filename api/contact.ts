// Vercel Function behind the contact form: validates the message and sends it with Resend.
// Env: RESEND_API_KEY (required), CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL (a sender on a domain verified in Resend).
import { Resend } from "resend";

const TO = process.env.CONTACT_TO_EMAIL || "maateodtc@gmail.com";
const FROM = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(body: Record<string, unknown>, key: string, max: number): string {
  const v = body[key];
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return Response.json({ error: "Email is not configured" }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot filled in: a bot. Pretend it worked so it doesn't retry.
  if (field(body, "website", 200)) return Response.json({ ok: true });

  const name = field(body, "name", 120).replace(/[\r\n]+/g, " ");
  const email = field(body, "email", 254);
  const message = field(body, "message", 5000);
  if (!name || !message || !EMAIL_RE.test(email)) {
    return Response.json({ error: "Name, a valid email and a message are required" }, { status: 400 });
  }

  const { error } = await new Resend(apiKey).emails.send({
    from: FROM,
    to: TO,
    replyTo: email,
    subject: `Portfolio — ${name}`,
    text: `${message}\n\n— ${name} <${email}>`,
  });
  if (error) {
    console.error("Resend error", error);
    return Response.json({ error: "Could not send the message" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
