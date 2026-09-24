import { m } from "motion/react";
import type { ChatMessage as Message } from "@/lib/chatbot";
import { QuickQuestions } from "./QuickQuestions";
import styles from "./chatbot.module.css";

type ChatMessageProps = {
  message: Message;
  onAsk: (question: string) => void;
  onAction: () => void;
  busy: boolean;
};

/**
 * Plain text in, simple structure out: consecutive "• " lines become a list,
 * everything else a paragraph. No HTML or markdown is ever interpreted, so a
 * guest's message can't inject markup. Shared with the voice transcript.
 */
export function MessageText({
  text,
  listClassName = styles.messageList,
}: {
  text: string;
  listClassName?: string;
}) {
  const blocks: React.ReactNode[] = [];
  let bullets: string[] = [];

  const flush = () => {
    if (bullets.length === 0) return;
    blocks.push(
      <ul key={`list-${blocks.length}`} className={listClassName}>
        {bullets.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>,
    );
    bullets = [];
  };

  for (const line of text.split("\n")) {
    if (line.startsWith("• ")) {
      bullets.push(line.slice(2));
      continue;
    }
    flush();
    if (line.trim()) blocks.push(<p key={`p-${blocks.length}`}>{line}</p>);
  }
  flush();
  return <>{blocks}</>;
}

export function ChatMessage({ message, onAsk, onAction, busy }: ChatMessageProps) {
  const fromGuest = message.role === "user";

  return (
    <m.li
      className={styles.messageRow}
      data-role={message.role}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Who said it, for screen readers; the layout says it visually. */}
      <span className="visually-hidden">{fromGuest ? "You said:" : "AI Concierge:"}</span>

      <div className={styles.bubble}>
        <MessageText text={message.content} />
      </div>

      {message.actions && message.actions.length > 0 && (
        <div className={styles.actions}>
          {message.actions.map((action) => {
            const external = /^https?:/.test(action.href);
            return (
              <a
                key={action.href}
                href={action.href}
                className={styles.action}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : { onClick: onAction })}
              >
                {action.label}
                {external && <span className="visually-hidden"> (opens in a new tab)</span>}
                <svg width="14" height="14" viewBox="0 0 18 18" fill="none" aria-hidden="true" focusable="false">
                  <path d="M3 9h11M10 4.5 14.5 9 10 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            );
          })}
        </div>
      )}

      {message.suggestions && <QuickQuestions onAsk={onAsk} disabled={busy} />}
    </m.li>
  );
}
