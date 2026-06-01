import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TicketsSection } from "@/components/tickets-section";

export const metadata: Metadata = {
  title: "Miðar",
  description: "Miðar á Rokk(um) Reykjavík — stakir dagar og laugardagapassi.",
};

export default function TicketsPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <TicketsSection />
      </main>
      <Footer />
    </>
  );
}
