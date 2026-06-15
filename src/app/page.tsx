import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Countdown } from "@/components/countdown";
import { Schedule } from "@/components/schedule";
import { ArtistGrid } from "@/components/artist-grid";
import { PlaylistSection } from "@/components/playlist-section";
import { SupportSection } from "@/components/support-section";
import { SignupSection } from "@/components/signup-section";
import { SponsorSection } from "@/components/sponsor-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Countdown />
        <Schedule />
        <ArtistGrid />
        <PlaylistSection />
        <SupportSection />
        <SignupSection />
        <SponsorSection />
      </main>
      <Footer />
    </>
  );
}
