import { ConciergeIcon } from "@/components/Chatbot/ChatIcons";
import { voiceCopy } from "@/data/voiceAssistant";
import type { VoiceStatus } from "@/lib/useVoiceAssistant";
import { MicIcon, MuteIcon, StopIcon } from "./VoiceIcons";
import styles from "./voice.module.css";

type VoiceControlsProps = {
  status: VoiceStatus;
  blocked: boolean;
  onStart: () => void;
  onStopListening: () => void;
  onStopSpeaking: () => void;
  onOpenChat: () => void;
  onReserve: () => void;
};

/**
 * One main control that changes with the state, plus the way out to typing.
 * It keeps its place between states, so focus stays put as Start becomes
 * Stop and back. Built on the site's .btn classes, like every other CTA.
 */
export function VoiceControls({
  status,
  blocked,
  onStart,
  onStopListening,
  onStopSpeaking,
  onOpenChat,
  onReserve,
}: VoiceControlsProps) {
  if (blocked) {
    return (
      <div className={styles.controls}>
        <p className={styles.fallback}>{voiceCopy.fallback}</p>
        <div className={styles.buttonRow}>
          <button
            type="button"
            className={`btn btn--primary ${styles.button}`}
            onClick={onOpenChat}
            data-autofocus
          >
            <ConciergeIcon size={18} />
            <span className="btn__label">Open AI Chat</span>
          </button>
          <a href="#reservations" className={`btn btn--secondary ${styles.button}`} onClick={onReserve}>
            <span className="btn__label">Reserve a Table</span>
          </a>
        </div>
      </div>
    );
  }

  const main =
    status === "listening"
      ? { label: "Stop Listening", icon: <StopIcon size={18} />, onClick: onStopListening, variant: "secondary" }
      : status === "speaking"
        ? { label: "Stop Speaking", icon: <MuteIcon size={18} />, onClick: onStopSpeaking, variant: "secondary" }
        : { label: "Start Listening", icon: <MicIcon size={18} />, onClick: onStart, variant: "primary" };
  const thinking = status === "thinking";

  return (
    <div className={styles.controls}>
      <button
        type="button"
        className={`btn btn--${main.variant} ${styles.button}`}
        data-autofocus
        aria-disabled={thinking}
        onClick={() => !thinking && main.onClick()}
      >
        {main.icon}
        <span className="btn__label">{thinking ? "Thinking…" : main.label}</span>
      </button>

      <p className={styles.typing}>
        {voiceCopy.preferTyping}{" "}
        <button type="button" className={styles.textButton} onClick={onOpenChat}>
          Open AI Chat
        </button>
      </p>
    </div>
  );
}
