import { Contact } from "@/components/Contact/Contact";
import { Experience } from "@/components/Experience/Experience";
import { Gallery } from "@/components/Gallery/Gallery";
import { Hero } from "@/components/Hero/Hero";
import { Location } from "@/components/Location/Location";
import { Menu } from "@/components/Menu/Menu";
import { Reservation } from "@/components/Reservation/Reservation";
import { Reviews } from "@/components/Reviews/Reviews";
import { SignatureDishes } from "@/components/SignatureDishes/SignatureDishes";
import { Story } from "@/components/Story/Story";

/**
 * Home page.
 *
 * Every navbar item (data/navigation.ts) has its section here ("About" is
 * #story). Signature Dishes, Reviews and Location have no nav items of their
 * own, but #signature-dishes, #reviews and #location can still be linked.
 */
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Menu />
      <SignatureDishes />
      <Story />
      <Experience />
      <Gallery />
      <Reservation />
      <Reviews />
      <Location />
      <Contact />
    </main>
  );
}
