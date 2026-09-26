"use client";

import { m } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { voiceCopy } from "@/data/voiceAssistant";
import { openChatbot } from "@/lib/chatbotBridge";
import { useStepAside } from "@/lib/useStepAside";
import { MicIcon } from "./VoiceIcons";
import { VoiceModal } from "./VoiceModal";
import styles from "./voice.module.css";

/**
 * Floating voice entry point for the home page: a small mic button beside
 * the AI Concierge launcher on phones, stacked above it from tablets up. One tap opens the
 * voice dialog and starts listening straight away.
 */
export function VoiceLauncher() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) requestAnimationFrame(() => buttonRef.current?.focus());
  }, []);

  /* Like the chat launcher: on phones, step aside over the menu list and
     the forms. */
  const hidden = useStepAside();

  return (
    <>
      <m.button
        ref={buttonRef}
        type="button"
        className={styles.launcher}
        data-hidden={hidden && !open}
        aria-haspopup="dialog"
        aria-label={voiceCopy.launcher.aria}
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <MicIcon size={22} />
        <span className={styles.launcherTip} aria-hidden="true">
          {voiceCopy.launcher.label}
        </span>
      </m.button>

      <VoiceModal
        open={open}
        autoStart
        onClose={() => close()}
        onOpenChat={() => {
          close(false);
          requestAnimationFrame(() => openChatbot());
        }}
        onReserve={() => close(false)}
      />
    </>
  );
}
