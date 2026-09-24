import { Fragment } from "react";

/**
 * Renders content copy with *asterisk* emphasis (see data/story.ts,
 * data/experience.ts), so editors can mark a word without writing markup.
 * Only the one marker is supported, on purpose.
 */
export function Emphasis({ text, className }: { text: string; className?: string }) {
  return text.split(/\*([^*]+)\*/g).map((part, index) =>
    // split() with a capture group alternates plain text and captured words.
    index % 2 === 1 ? (
      <em key={index} className={className}>
        {part}
      </em>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}
