import { chatbotCopy } from "@/data/chatbot";
import { restaurantData } from "@/data/restaurant";
import { CloseIcon, SparklesIcon } from "./ChatIcons";
import styles from "./chatbot.module.css";

type ChatHeaderProps = {
  titleId: string;
  canClear: boolean;
  onClear: () => void;
  onClose: () => void;
};

export function ChatHeader({ titleId, canClear, onClear, onClose }: ChatHeaderProps) {
  return (
    // A div, not <header>: outside a sectioning element <header> becomes a
    // second page-level banner landmark.
    <div className={styles.header}>
      <span className={styles.headerMark} aria-hidden="true">
        <SparklesIcon size={18} />
      </span>

      <div className={styles.headerText}>
        <h2 id={titleId} className={styles.headerTitle}>
          {restaurantData.name}
          <span className={styles.headerSubtitle}>{chatbotCopy.name}</span>
        </h2>
        {/* States what this is — never implies a person is on the other end. */}
        <p className={styles.headerStatus}>
          <span className={styles.statusDot} aria-hidden="true" />
          {chatbotCopy.status}
        </p>
      </div>

      <div className={styles.headerActions}>
        {canClear && (
          <button type="button" className={styles.clear} onClick={onClear} aria-label="Clear chat">
            Clear<span className={styles.clearLong}> chat</span>
          </button>
        )}
        <button
          type="button"
          className={styles.iconButton}
          aria-label="Close the AI Concierge"
          onClick={onClose}
        >
          <CloseIcon size={18} />
        </button>
      </div>
    </div>
  );
}
