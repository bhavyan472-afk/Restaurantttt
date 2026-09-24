/* Global CSS first: component CSS modules must load AFTER it, so a module
   class can refine a global one (.label, .btn) of equal specificity. */
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Chatbot } from "@/components/Chatbot/Chatbot";
import { Footer } from "@/components/Footer/Footer";
import { Navbar } from "@/components/Navbar/Navbar";
import { CursorHalo } from "@/components/ui/CursorHalo";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { restaurantData } from "@/data/restaurant";
import { buildRestaurantJsonLd } from "@/lib/seo";

/* Display: elegant editorial serif. Body: clean modern sans (variable font).
   next/font self-hosts both, so there is no layout-shifting swap and no
   third-party request at runtime. */
const display = Cormorant_Garamond({
  subsets: ["latin"],
  // Only the weights the design renders (audited): no unused @font-face.
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// "EMBER & SAGE | Where Fire Meets Flavor" — the tagline's full stop is
// punctuation for the page, not for a browser tab or search result.
const title = `${restaurantData.name} | ${restaurantData.tagline.replace(/\.$/, "")}`;

export const metadata: Metadata = {
  // Resolves every relative URL below (canonical, og:url, og:image).
  metadataBase: new URL(restaurantData.siteUrl),
  title: {
    default: title,
    template: `%s | ${restaurantData.name}`,
  },
  description: restaurantData.description,
  applicationName: restaurantData.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: restaurantData.name,
    title,
    description: restaurantData.description,
    url: "/",
    locale: "en_US",
    // Image comes from app/opengraph-image.tsx (file convention).
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: restaurantData.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0d0b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = JSON.stringify(buildRestaurantJsonLd()).replace(/</g, "\\u003c");

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        {/* Without JS, scroll reveals would stay hidden — show content instead. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>

        <MotionProvider>
          <Navbar />
          {children}
          <Footer />
          {/* Interactive enhancement, not page content: renders only its
              launcher until opened, so there is nothing extra to index. */}
          <Chatbot />
          {/* Desktop fine-pointer only; renders nothing on touch or under
              reduced motion. */}
          <CursorHalo />
        </MotionProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      </body>
    </html>
  );
}
