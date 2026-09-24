import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { restaurantData } from "@/data/restaurant";
import type { ChatMessage as Message } from "@/lib/chatbot";
import { ChatMessage } from "./ChatMessage";
import styles from "./chatbot.module.css";

type ChatMessagesProps = {
  messages: Message[];
  thinking: boolean;
  onAsk: (question: string) => void;
  onAction: () => void;
};

/**
 * The conversation. A `log` live region, so a screen reader announces each
 * new reply without the guest having to go looking for it. Scrolls itself;
 * the panel never grows.
 */
export function ChatMessages({ messages, thinking, onAsk, onAction }: ChatMessagesProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Scroll only this container — scrollIntoView could also move the page.
  useEffect(() => {
    const el = scrollerRef.current;
    el?.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [messages.length, thinking, reduce]);

  return (
    // The live region wraps the list rather than replacing its role, so
    // screen readers still get "list, N items" for the conversation.
    <div
      ref={scrollerRef}
      role="log"
      aria-live="polite"
      aria-relevant="additions"
      aria-label="Conversation"
      className={styles.scroller}
    >
      <ol className={styles.messages}>
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            onAsk={onAsk}
            onAction={onAction}
            busy={thinking}
          />
        ))}

        {thinking && (
          <li className={styles.messageRow} data-role="assistant">
            <div className={`${styles.bubble} ${styles.thinking}`}>
              <span className={styles.dots} aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span className="visually-hidden">{restaurantData.name} is thinking…</span>
            </div>
          </li>
        )}
      </ol>
    </div>
  );
}
