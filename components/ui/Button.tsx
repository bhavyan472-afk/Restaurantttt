import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  /** Show the animated arrow. Defaults to true. */
  arrow?: boolean;
  className?: string;
} & (
  | ({ href: string } & Omit<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      "href" | "className" | "children"
    >)
  | ({ href?: undefined } & Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      "className" | "children"
    >)
);

function Arrow() {
  return (
    <svg
      className="btn__arrow"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3 9h11M10 4.5 14.5 9 10 13.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Premium button. Renders a link (next/link, or <a> for #anchors / external /
 * tel: / mailto:) when `href` is given, otherwise a real <button>.
 *
 * Presets:  <Button href="#reservations">Reserve a Table</Button>
 *           <Button variant="secondary" href="#menu">Explore Menu</Button>
 */
export function Button({
  children,
  variant = "primary",
  arrow = true,
  className,
  ...props
}: ButtonProps) {
  const classes = cn("btn", `btn--${variant}`, className);
  const content = (
    <>
      <span className="btn__label">{children}</span>
      {arrow && <Arrow />}
    </>
  );

  if (props.href !== undefined) {
    const { href, ...anchorProps } = props;
    const isInternalRoute = href.startsWith("/") && !href.startsWith("//");
    if (isInternalRoute) {
      return (
        <Link href={href} className={classes} {...anchorProps}>
          {content}
        </Link>
      );
    }
    // Off-site links (e.g. an Order Online provider) open in a new tab.
    const external = /^https?:\/\//.test(href) && anchorProps.target === undefined;
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...anchorProps}
      >
        {content}
      </a>
    );
  }

  const { href: _href, ...buttonProps } = props;
  void _href;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
