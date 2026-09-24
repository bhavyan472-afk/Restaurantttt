"use client";

import { m } from "motion/react";
import { useEffect, useState } from "react";
import { easeOut } from "@/lib/animations";
import styles from "./location.module.css";

type LocationMapProps = {
  name: string;
  /** One-line address, for the accessible label. */
  address: string;
  /** Printed along the main avenue of the illustrated map. */
  street: string;
  directionsUrl: string;
  /** A real map embed, when the client has one. */
  embedUrl?: string;
  /** Label the map as illustrative / demo. */
  isDemo: boolean;
  labels: { demoNote: string; unavailable: string; viewDirections: string };
};

/** How long an embed may take before we offer directions instead. */
const EMBED_TIMEOUT = 12000;

/**
 * The map. Without an embed URL it is an illustrated, on-brand street map —
 * no provider, no API key, no request — with the restaurant pinned at the
 * centre. With `embedUrl` it lazy-loads that map in an iframe, and if it
 * does not arrive shows "Map unavailable" with a directions link, never a
 * blank box.
 */
export function LocationMap({
  name,
  address,
  street,
  directionsUrl,
  embedUrl,
  isDemo,
  labels,
}: LocationMapProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!embedUrl || loaded) return;
    const timer = window.setTimeout(() => setFailed(true), EMBED_TIMEOUT);
    return () => window.clearTimeout(timer);
  }, [embedUrl, loaded]);

  return (
    <figure className={styles.map}>
      <div className={`frame ${styles.mapFrame}`}>
        {embedUrl && !failed ? (
          <iframe
            className={styles.embed}
            src={embedUrl}
            title={`Map showing ${name} at ${address}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        ) : embedUrl && failed ? (
          <div className={styles.fallback} role="status">
            <p className={`label ${styles.fallbackLabel}`}>{labels.unavailable}</p>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--secondary"
            >
              <span className="btn__label">{labels.viewDirections}</span>
              <span className="visually-hidden"> (opens Google Maps in a new tab)</span>
            </a>
          </div>
        ) : (
          <div
            className={styles.illustration}
            role="img"
            aria-label={`${isDemo ? "Illustrative map" : "Map"}: ${name}, ${address}`}
          >
            <IllustratedStreets street={street} />
            <Compass />
            <m.div
              className={styles.marker}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 0.8, delay: 0.7, ease: easeOut }}
            >
              <span className={styles.markerLabel}>
                <span className={styles.markerName}>{name}</span>
                <span className={styles.markerKind}>Restaurant</span>
              </span>
              <span className={styles.pin}>
                <span className={styles.pulse} />
                <span className={styles.pulse} />
                <span className={styles.pinDot} />
              </span>
            </m.div>
          </div>
        )}
      </div>

      <figcaption className={styles.mapCaption}>
        {isDemo && <span className={styles.mapNote}>{labels.demoNote}</span>}
        <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className={`link ${styles.mapLink}`}>
          Open in Google Maps
          <span className="visually-hidden"> (opens in a new tab)</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false">
            <path d="M3.5 8.5 8.5 3.5M4.5 3.5h4v4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </figcaption>
    </figure>
  );
}

/**
 * A quiet, warm-toned street grid: minor streets, one diagonal boulevard, a
 * river band and a small green, with the restaurant's avenue running through
 * the centre. Purely decorative (the wrapper carries the label), and scaled
 * with `slice` so the centre — the pin — stays put at any aspect ratio.
 */
function IllustratedStreets({ street }: { street: string }) {
  const minorH = Array.from({ length: 11 }, (_, i) => 35 + i * 65);
  const minorV = Array.from({ length: 9 }, (_, i) => 20 + i * 75);

  return (
    <svg
      className={styles.streets}
      viewBox="0 0 600 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="600" height="700" className={styles.ground} />

      {/* River */}
      <path
        className={styles.water}
        d="M-20 540 C 110 490, 230 610, 360 575 S 560 490, 640 540 L 640 640 C 520 600, 400 680, 300 670 S 90 600, -20 640 Z"
      />

      {/* A small green */}
      <rect x="392" y="92" width="150" height="120" rx="6" className={styles.green} />

      {/* Minor streets */}
      <g className={styles.minor}>
        {minorH.map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="600" y2={y} />
        ))}
        {minorV.map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="700" />
        ))}
      </g>

      {/* Boulevard and cross street */}
      <line x1="-10" y1="110" x2="610" y2="600" className={styles.boulevard} />
      <line x1="320" y1="0" x2="320" y2="700" className={styles.cross} />

      {/* The restaurant's avenue, through the centre. The label sits below
          the line (the marker card is above it) and starts just right of
          centre: `slice` crops the sides on tall frames, never the middle. */}
      <line x1="0" y1="350" x2="600" y2="350" className={styles.avenue} />
      <text x="336" y="374" className={styles.streetLabel}>
        {street.toUpperCase()}
      </text>
    </svg>
  );
}

/** North arrow, pinned to the frame's corner (outside the cropped drawing). */
function Compass() {
  return (
    <svg className={styles.compass} width="34" height="44" viewBox="-17 -27 34 44" aria-hidden="true" focusable="false">
      <text y="-17" textAnchor="middle">N</text>
      <circle r="15" />
      <path d="M0 -9 L4 3 L0 1 L-4 3 Z" />
    </svg>
  );
}
