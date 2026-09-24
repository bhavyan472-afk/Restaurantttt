import { useEffect, useRef } from "react";
import { MessageText } from "@/components/Chatbot/ChatMessage";
import type { VoiceTurn } from "@/lib/useVoiceAssistant";
import styles from "./voice.module.css";

type VoiceTranscriptProps = {
  turns: VoiceTurn[];
  /** A reply's in-page link was followed. */
  onAction: () => void;
};

/**
 * The spoken conversation, written down. A `log` region so a screen reader
 * hears each new line; scrolls inside the modal once it grows.
 */
export function VoiceTranscript({ turns, onAction }: VoiceTranscriptProps) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = ref.current;
    el?.scrollTo({ top: el.scrollHeight });
  }, [turns.length]);

  if (turns.length === 0) return null;

  return (
    <ol ref={ref} role="log" aria-live="polite" aria-label="Transcript" className={styles.transcript}>
      {turns.map((turn) => (
        <li key={turn.id} className={styles.turn} data-role={turn.role}>
          <p className={styles.turnWho}>{turn.role === "user" ? "You" : "AI Concierge"}</p>
          <div className={styles.turnText}>
            <MessageText text={turn.content} listClassName={styles.turnList} />
          </div>
          {turn.actions && turn.actions.length > 0 && (
            <div className={styles.turnActions}>
              {turn.actions.map((action) => {
                const external = /^https?:/.test(action.href);
                return (
                  <a
                    key={action.href}
                    href={action.href}
                    className={styles.turnAction}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : { onClick: onAction })}
                  >
                    {action.label}
                    {external && <span className="visually-hidden"> (opens in a new tab)</span>}
                  </a>
                );
              })}
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
