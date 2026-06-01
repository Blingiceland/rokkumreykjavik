import { NextResponse } from "next/server";

// Minimal, privacy-respecting subscribe endpoint.
// Wire `process.env.NEWSLETTER_WEBHOOK` (Mailchimp/Buttondown/etc.) to forward.
// Stores nothing here by default.
export async function POST(req: Request) {
  let email = "";
  try {
    const body = await req.json();
    email = String(body?.email ?? "").trim();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!valid) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 422 });
  }

  const hook = process.env.NEWSLETTER_WEBHOOK;
  if (hook) {
    try {
      await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      return NextResponse.json({ ok: false, error: "provider_error" }, { status: 502 });
    }
  }

  return NextResponse.json({ ok: true });
}
