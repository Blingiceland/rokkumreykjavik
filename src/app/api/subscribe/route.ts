import { NextResponse } from "next/server";

// Minimal, privacy-respecting subscribe endpoint.
// Wire `process.env.NEWSLETTER_WEBHOOK` to forward each signup. By default this
// is a Google Apps Script web-app URL that appends a row to a Sheet
// (see docs/newsletter-google-sheet.md). Works the same for Buttondown/Zapier
// style hooks. Stores nothing here itself.
export async function POST(req: Request) {
  let email = "";
  try {
    const body = await req.json();
    email = String(body?.email ?? "").trim().toLowerCase();
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
        body: JSON.stringify({ email, ts: new Date().toISOString(), source: "rokkumreykjavik.is" }),
      });
    } catch {
      return NextResponse.json({ ok: false, error: "provider_error" }, { status: 502 });
    }
  }

  return NextResponse.json({ ok: true });
}
