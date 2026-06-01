import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Countdown } from "@/components/countdown";
import { Schedule } from "@/components/schedule";
import { ArtistGrid } from "@/components/artist-grid";
import { TicketsSection } from "@/components/tickets-section";
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
        <TicketsSection />
        <SignupSection />
        <SponsorSection />
      </main>
      <Footer />
    </>
  );
}
