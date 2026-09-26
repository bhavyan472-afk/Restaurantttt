import { VoiceLauncher } from "@/components/CallAssistant/VoiceLauncher";
import { Experience } from "@/components/Experience/Experience";
import { Gallery } from "@/components/Gallery/Gallery";
import { Hero } from "@/components/Hero/Hero";
import { Menu } from "@/components/Menu/Menu";
import { Reservation } from "@/components/Reservation/Reservation";
import { Reviews } from "@/components/Reviews/Reviews";
import { SignatureDishes } from "@/components/SignatureDishes/SignatureDishes";
import { Story } from "@/components/Story/Story";
import { Visit } from "@/components/Visit/Visit";
import { features } from "@/data/restaurant";

/**
 * Home page. Section order is mirrored by `pageSections` in
 * data/navigation.ts (navbar, footer and active-link tracking) — change
 * both together. Reviews and Reservations render nothing when switched off
 * in content/restaurant.ts.
 */
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <SignatureDishes />
      <Story />
      <Menu />
      <Experience />
      <Gallery />
      <Reviews />
      <Reservation />
      <Visit />
      {/* Floating mic (bottom-right, above the chat launcher). */}
      {features.aiConcierge && <VoiceLauncher />}
    </main>
  );
}
