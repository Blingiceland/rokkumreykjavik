import type { Metadata, Viewport } from "next";
// Self-hosted fonts (no build-time network dependency on Google Fonts).
import "@fontsource/archivo-black/400.css";
import "@fontsource/sora/400.css";
import "@fontsource/sora/500.css";
import "@fontsource/sora/600.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";
import { site, venue, presenterLockup, EVENT_YEAR } from "@/data/site";
import { events, getEventArtists } from "@/data/events";

export const viewport: Viewport = {
  themeColor: "#e8e4da",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} ${site.yearLabel} — ${site.description}`,
    template: `%s · ${site.name}`,
  },
  description:
    `${presenterLockup}. Fjögurra laugardaga tónlistarröð í garði Dillon í Reykjavík í júlí. Sautján íslensk bönd, ókeypis inn — rokk, indie, alternative og underground.`,
  keywords: [
    "Reykjavík",
    "tónleikar",
    "rokk",
    "indie",
    "alternative",
    "Iceland music",
    "Rokk í Reykjavík",
    "íslensk tónlist",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "is_IS",
    url: site.url,
    siteName: site.name,
    title: presenterLockup,
    description: `Fjórir laugardagar. Sautján bönd. Ókeypis inn. Júlí ${EVENT_YEAR}.`,
    images: [{ url: "/og.png?v=3", width: 1920, height: 1005, alt: `${site.name} ${EVENT_YEAR}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} ${site.yearLabel}`,
    description: `${site.description} Ókeypis inn — júlí ${EVENT_YEAR}.`,
    images: ["/og.png?v=3"],
  },
  robots: { index: true, follow: true },
};

function EventJsonLd() {
  const subEvents = events.map((e) => ({
    "@type": "MusicEvent",
    name: `${site.name} — ${e.title}`,
    startDate: `${e.date}T20:00:00+00:00`,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: venue.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: venue.streetAddress,
        addressLocality: "Reykjavík",
        postalCode: "101",
        addressCountry: "IS",
      },
    },
    offers: {
      "@type": "Offer",
      price: 0,
      priceCurrency: "ISK",
      url: site.url,
      availability: "https://schema.org/InStock",
    },
    isAccessibleForFree: true,
    performer: getEventArtists(e).map((a) => ({ "@type": "MusicGroup", name: a.name })),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EventSeries",
    name: site.name,
    description: `${presenterLockup}. ${site.description}`,
    url: site.url,
    isAccessibleForFree: true,
    organizer: [
      { "@type": "Organization", name: "Dillon", url: venue.mapUrl },
      { "@type": "Organization", name: "Rás 2", url: "https://www.ruv.is/ras2" },
    ],
    subEvent: subEvents,
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Thule launch: the whole site ships in the Dósin look.
    <html lang="is" data-look="thule-dos" suppressHydrationWarning>
      <body className="grain min-h-screen">
        <EventJsonLd />
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-neon focus:px-4 focus:py-2 focus:font-display focus:text-base"
        >
          Hoppa í aðalefni
        </a>
        {children}
      </body>
    </html>
  );
}
