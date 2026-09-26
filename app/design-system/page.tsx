import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import type { RevealVariantName } from "@/lib/animations";
import styles from "./design-system.module.css";

export const metadata: Metadata = {
  title: "Design System",
  description: "Internal reference for the EMBER & SAGE design system.",
  robots: { index: false, follow: false },
};

const swatches = [
  { token: "--background", value: "#0c0b0a", note: "Page background" },
  { token: "--surface", value: "#1a1511", note: "Raised panels" },
  { token: "--foreground", value: "#f3ece0", note: "Primary text" },
  { token: "--muted", value: "#aaa093", note: "Secondary text" },
  { token: "--accent", value: "#c6a462", note: "Gold accent" },
  { token: "--border", value: "rgb(243 236 224 / 0.12)", note: "Hairlines" },
];

const reveals: { name: RevealVariantName; ratio?: string }[] = [
  { name: "fadeUp" },
  { name: "fadeIn" },
  { name: "scaleReveal" },
  { name: "imageReveal", ratio: "4 / 3" },
  { name: "slideInLeft" },
  { name: "slideInRight" },
];

export default function DesignSystemPage() {
  return (
    <main id="main" className="nav-offset">
      <div className="container">
        <header className="section--tight" style={{ paddingBottom: 0 }}>
          <div className="stack">
            <span className="label label--accent">Design system</span>
            <h1 className="text-section">EMBER &amp; SAGE</h1>
            <p className="text-body-lg" style={{ maxWidth: "38rem" }}>
              Tokens, type, buttons, media and motion. Internal reference —
              not indexed.
            </p>
            <Link className="link text-small" href="/">
              ← Back to site
            </Link>
          </div>
        </header>

        {/* Colour */}
        <section className="section--tight" aria-labelledby="ds-colour">
          <h2 id="ds-colour" className="text-sub" style={{ marginBottom: "var(--space-6)" }}>
            Colour
          </h2>
          <ul role="list" className={styles.swatches}>
            {swatches.map((s) => (
              <li key={s.token} className={styles.swatch}>
                <span className={styles.chip} style={{ background: s.value }} />
                <span className="label">{s.token}</span>
                <span className="text-small">
                  {s.value} · {s.note}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <hr className="divider" />

        {/* Typography */}
        <section className="section--tight" aria-labelledby="ds-type">
          <h2 id="ds-type" className="text-sub" style={{ marginBottom: "var(--space-6)" }}>
            Typography
          </h2>
          <div className="stack" style={{ "--stack-gap": "var(--space-7)" } as React.CSSProperties}>
            <div className={styles.specimen}>
              <span className="label">Hero</span>
              <p className="text-hero">Where Fire Meets Flavor.</p>
            </div>
            <div className={styles.specimen}>
              <span className="label">Section heading</span>
              <p className="text-section">An evening by the hearth</p>
            </div>
            <div className={styles.specimen}>
              <span className="label">Subheading</span>
              <p className="text-sub">Wood-Fired Ribeye</p>
            </div>
            <div className={styles.specimen}>
              <span className="label">Body large</span>
              <p className="text-body-lg" style={{ maxWidth: "40rem" }}>
                Seasonal ingredients, cooked over open flame and served in a
                warm, unhurried room made for long evenings.
              </p>
            </div>
            <div className={styles.specimen}>
              <span className="label">Body</span>
              <p className="text-body" style={{ maxWidth: "40rem" }}>
                Dry-aged, finished with bone marrow butter, charred shallot
                and fresh sage. Served medium-rare with a side of your choice.
              </p>
            </div>
            <div className={styles.specimen}>
              <span className="label">Label</span>
              <span className="label label--accent">Reservations · Open Nightly</span>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* Buttons */}
        <section className="section--tight" aria-labelledby="ds-buttons">
          <h2 id="ds-buttons" className="text-sub" style={{ marginBottom: "var(--space-6)" }}>
            Buttons
          </h2>
          <div className="btn-group cluster">
            <Button href="#reservations">Reserve a Table</Button>
            <Button variant="secondary" href="#menu">
              Explore Menu
            </Button>
          </div>
          <p className="text-small" style={{ marginTop: "var(--space-4)" }}>
            Try hover, keyboard focus (Tab) and, on touch, the 52px targets.
          </p>
        </section>

        <hr className="divider" />

        {/* Media + motion */}
        <section className="section--tight" aria-labelledby="ds-motion">
          <h2 id="ds-motion" className="text-sub" style={{ marginBottom: "var(--space-2)" }}>
            Motion utilities
          </h2>
          <p className="text-body" style={{ marginBottom: "var(--space-6)" }}>
            Scroll-triggered, once. Disabled or reduced under
            prefers-reduced-motion.
          </p>
          <ul role="list" className={styles.reveals}>
            {reveals.map((r) => (
              <li key={r.name}>
                <Reveal variant={r.name}>
                  <div
                    className="frame frame--placeholder"
                    style={{ aspectRatio: r.ratio ?? "4 / 3" }}
                  >
                    <span className="label">{r.name}</span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
