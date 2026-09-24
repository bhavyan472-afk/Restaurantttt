import { m } from "motion/react";
import { forwardRef, useEffect, useState, type RefObject } from "react";
import type { ChatMessage } from "@/lib/chatbot";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { ChatMessages } from "./ChatMessages";
import styles from "./chatbot.module.css";

type ChatWindowProps = {
  id: string;
  messages: ChatMessage[];
  thinking: boolean;
  inputRef: RefObject<HTMLTextAreaElement | null>;
  onSend: (text: string) => void;
  onClear: () => void;
  onClose: () => void;
  /** A reply's in-page link was followed. */
  onAction: () => void;
};

const TITLE_ID = "chatbot-title";

/**
 * Tracks the visual viewport, so on phones the panel sits above the on-screen
 * keyboard instead of behind it (iOS does not resize the layout viewport for
 * the keyboard). Exposed as CSS variables; desktop CSS ignores them.
 */
function useVisualViewport() {
  const [vars, setVars] = useState<React.CSSProperties>({});
  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;
    const update = () =>
      setVars({
        "--vv-height": `${viewport.height}px`,
        "--vv-bottom": `${Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop)}px`,
      } as React.CSSProperties);
    update();
    viewport.addEventListener("resize", update);
    viewport.addEventListener("scroll", update);
    return () => {
      viewport.removeEventListener("resize", update);
      viewport.removeEventListener("scroll", update);
    };
  }, []);
  return vars;
}

/**
 * The panel. A non-modal dialog: the page stays usable behind it, so focus is
 * not trapped — Tab can leave, and Escape or the close button return the
 * guest to the launcher.
 */
export const ChatWindow = forwardRef<HTMLDivElement, ChatWindowProps>(function ChatWindow(
  { id, messages, thinking, inputRef, onSend, onClear, onClose, onAction },
  ref,
) {
  const viewportVars = useVisualViewport();

  return (
    <m.div
      ref={ref}
      id={id}
      role="dialog"
      aria-modal="false"
      aria-labelledby={TITLE_ID}
      tabIndex={-1}
      className={styles.panel}
      style={viewportVars}
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.98, transition: { duration: 0.2 } }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <ChatHeader
        titleId={TITLE_ID}
        canClear={messages.length > 1}
        onClear={onClear}
        onClose={onClose}
      />
      <ChatMessages messages={messages} thinking={thinking} onAsk={onSend} onAction={onAction} />
      <ChatInput inputRef={inputRef} onSend={onSend} busy={thinking} />
    </m.div>
  );
});
