import {
  restaurantData,
  socialLinksAreDemo,
  type SocialLink,
  type SocialPlatform,
} from "@/data/restaurant";

/* Inline SVG, 24px grid, stroked like the Lucide icons used elsewhere on the
   site (there is no icon package). TikTok and X are simplified marks. */
const paths: Record<SocialPlatform, React.ReactNode> = {
  instagram: (
    <>
      <rect x="2.75" y="2.75" width="18.5" height="18.5" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  facebook: <path d="M18 2.75h-3a5 5 0 0 0-5 5v3H7v4h3v6.5h4v-6.5h3l1-4h-4v-3a1 1 0 0 1 1-1h3z" />,
  tiktok: <path d="M14 2.75v12.5a4 4 0 1 1-4-4M14 2.75c.4 2.9 2.6 5 5.5 5.25" />,
  x: <path d="M4 3.75h4.25L20 20.25h-4.25zM4 20.25l6.75-7.5M13.25 11.25 20 3.75" />,
  youtube: (
    <>
      <path d="M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </>
  ),
};

/** Decorative platform icon; the link around it carries the name. */
export function SocialIcon({ platform, size = 20 }: { platform: SocialPlatform; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[platform]}
    </svg>
  );
}

/**
 * Spoken name for a social link. While the links are demo placeholders it
 * says so, rather than claiming an account the restaurant does not have.
 */
export function socialLinkLabel(link: SocialLink): string {
  return socialLinksAreDemo
    ? `${link.label} (demo link to the ${link.label} home page, opens in a new tab)`
    : `Visit ${restaurantData.name} on ${link.label} (opens in a new tab)`;
}
