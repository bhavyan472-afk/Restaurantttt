import { voiceCopy } from "@/data/voiceAssistant";
import type { VoiceStatus as Status } from "@/lib/useVoiceAssistant";
import { MicIcon } from "./VoiceIcons";
import styles from "./voice.module.css";

type VoiceStatusProps = {
  status: Status;
  /** True when voice cannot be used here (unsupported, denied, no mic). */
  blocked: boolean;
  /** Words heard so far, while listening. */
  interim: string;
};

/**
 * The orb and the state line. The state is always written out (never shown
 * by colour or motion alone) and announced through a polite live region.
 * Motion is ambient — rings while listening, bars while speaking — and CSS
 * holds it still under reduced motion.
 */
export function VoiceStatus({ status, blocked, interim }: VoiceStatusProps) {
  const copy = blocked ? voiceCopy.states.unavailable : voiceCopy.states[status];

  return (
    <div className={styles.status} data-status={blocked ? "blocked" : status}>
      <div className={styles.orb} aria-hidden="true">
        <span className={styles.ring} />
        <span className={styles.ring} />
        <span className={styles.orbCore}>
          {status === "speaking" ? (
            <span className={styles.bars}>
              <span />
              <span />
              <span />
              <span />
              <span />
            </span>
          ) : status === "thinking" ? (
            <span className={styles.spinner} />
          ) : (
            <MicIcon size={28} />
          )}
        </span>
      </div>

      <div role="status" aria-live="polite" className={styles.statusText}>
        <p className={`label label--accent ${styles.statusLabel}`}>
          <span className={styles.statusDot} aria-hidden="true" />
          {copy.label}
        </p>
        {copy.text && <p className={styles.statusSupport}>{copy.text}</p>}
      </div>

      {/* What the recogniser has heard so far — live, before it is final. */}
      {status === "listening" && interim && (
        <p className={styles.interim}>
          <span className="visually-hidden">Heard so far: </span>“{interim}”
        </p>
      )}
    </div>
  );
}
