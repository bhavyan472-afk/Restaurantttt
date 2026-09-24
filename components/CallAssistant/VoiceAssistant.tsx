"use client";

import { useCallback, useRef, useState } from "react";
import { voiceCopy } from "@/data/voiceAssistant";
import { openChatbot } from "@/lib/chatbotBridge";
import { MicIcon } from "./VoiceIcons";
import { VoiceModal } from "./VoiceModal";
import styles from "./voice.module.css";

/**
 * Entry point for the voice assistant: a quiet "Need help?" block (placed in
 * the reservation details) and the modal it opens. Uses the site's .btn
 * classes directly so it matches every other secondary CTA.
 */
export function VoiceAssistant() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  return (
    <div className={styles.cta}>
      <p className={`label ${styles.ctaEyebrow}`}>{voiceCopy.cta.eyebrow}</p>
      <h3 className={styles.ctaTitle}>{voiceCopy.cta.title}</h3>
      <p className={styles.ctaText}>{voiceCopy.cta.text}</p>

      <button
        ref={triggerRef}
        type="button"
        className={`btn btn--secondary ${styles.ctaButton}`}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        <MicIcon size={18} />
        <span className="btn__label">{voiceCopy.cta.button}</span>
      </button>

      <VoiceModal
        open={open}
        onClose={() => close()}
        onOpenChat={() => {
          close(false);
          // After the dialog has closed and released focus.
          requestAnimationFrame(() => openChatbot());
        }}
        onReserve={() => close(false)}
      />
    </div>
  );
}
