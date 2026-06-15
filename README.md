# Rokk í Reykjavík

Interactive event platform for the July concert series in Reykjavík, presented by
Dillon and Rás 2. **Fjórir laugardagar. Sextán bönd. Ein borg sem þarf að heyrast.**
Admission is always free — there is no ticket sales flow.

Built with Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion · lucide-react. Self-hosted fonts, mobile-first, accessible, SEO-ready, deployable to Vercel.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (runs the privacy guard first)
npm start        # serve the production build
```

## Project structure

```
src/
  app/
    layout.tsx           Root layout: fonts, SEO metadata, OpenGraph, JSON-LD
    page.tsx             Home page composition
    globals.css          Theme tokens, grain texture, reduced-motion
    api/subscribe/route.ts  Newsletter endpoint (wire to your provider)
    sitemap.ts, robots.ts   SEO routes
  components/            Hero, Schedule, ArtistGrid, SupportSection, etc.
  components/ui/         Button + accessible Dialog primitives
  data/
    artists.ts           The 16 artists + the public Artist schema (privacy note below)
    events.ts            Event meta, 4 Saturdays, optional set times
    site.ts              Name, year, presenters, venue
    sponsors.ts          Sponsors
scripts/
  check-no-financials.mjs  Build-time privacy guard
```

## Editing content

Everything is data-driven. To change the lineup, edit `src/data/artists.ts`
and `src/data/events.ts`. Each Saturday's lineup references artists by `id`.
Set times live in each event's optional `setTimes` map; until an entry exists,
that set renders a "væntanlegt" placeholder automatically.

## Privacy: no artist financials, ever

The internal lineup data included artist costs/fees. **These must never appear
on the public site.** Two safeguards enforce this:

1. The public `Artist` type in `artists.ts` has no field for any financial figure,
   so there is nowhere to put one.
2. `scripts/check-no-financials.mjs` scans the source on every build
   (`npm run build` → `prebuild` → `guard`) and fails the build if a forbidden
   financial field name appears.

Run it directly any time with `npm run guard`.

## Newsletter signup

`POST /api/subscribe` validates the email and, if `NEWSLETTER_WEBHOOK` is set,
forwards `{ email }` to your provider (Mailchimp, Buttondown, etc.). Copy
`.env.example` to `.env.local` and set the value. Without it, the endpoint
validates and returns success without storing anything.

## Deploy to Vercel

1. Push this folder to a Git repository.
2. Import the repo in Vercel — it auto-detects Next.js, no config needed.
3. (Optional) Add the `NEWSLETTER_WEBHOOK` environment variable.
4. Point `rokkumreykjavik.is` at the deployment in Vercel's Domains settings.

## Future app expansion

The data layer is already decoupled from the UI, so the same `data` types
can back a mobile app or a PWA. The footer teases this; a natural next step is a
per-artist "watchlist" using local storage and push reminders per set time.
