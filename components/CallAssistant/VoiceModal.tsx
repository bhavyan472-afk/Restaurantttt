"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CloseIcon, SparklesIcon } from "@/components/Chatbot/ChatIcons";
import { voiceCopy } from "@/data/voiceAssistant";
import { restaurantData } from "@/data/restaurant";
import { VOICE_MESSAGES, useVoiceAssistant } from "@/lib/useVoiceAssistant";
import { VoiceControls } from "./VoiceControls";
import { VoiceStatus } from "./VoiceStatus";
import { VoiceTranscript } from "./VoiceTranscript";
import styles from "./voice.module.css";

type VoiceModalProps = {
  open: boolean;
  onClose: () => void;
  onOpenChat: () => void;
  /** "Reserve a Table" was followed. */
  onReserve: () => void;
  /** Start listening as soon as it opens (the floating mic button). */
  autoStart?: boolean;
};

/** "prompt" while the browser will still ask for the microphone. */
function useMicPermission(active: boolean) {
  const [state, setState] = useState<PermissionState | "unknown">("unknown");
  useEffect(() => {
    if (!active || !navigator.permissions?.query) return;
    let status: PermissionStatus | null = null;
    const update = () => status && setState(status.state);
    // Firefox rejects "microphone" as a permission name — the hint just stays off.
    navigator.permissions
      .query({ name: "microphone" as PermissionName })
      .then((result) => {
        status = result;
        update();
        result.addEventListener("change", update);
      })
      .catch(() => {});
    return () => status?.removeEventListener("change", update);
  }, [active]);
  return state;
}

/**
 * The voice assistant, in a native <dialog> opened with showModal(): the
 * browser keeps focus inside it, makes the page behind inert, renders it in
 * the top layer (so no ancestor transform can misplace it) and turns Escape
 * into a `cancel` event — which we route through onClose so the microphone
 * and speech are always shut down first.
 *
 * The conversation survives closing; the microphone and speech do not.
 */
export function VoiceModal({ open, onClose, onOpenChat, onReserve, autoStart = false }: VoiceModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // Two entry points (reservation card, floating mic) → two dialogs on the page.
  const titleId = useId();
  const voice = useVoiceAssistant();
  const { shutdown, startListening } = voice;
  const micPermission = useMicPermission(open);
  const startRef = useRef(startListening);
  startRef.current = startListening;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      // The main control, not the close button, is where the guest starts.
      dialog.querySelector<HTMLElement>("[data-autofocus]")?.focus();
      // Opened from a mic button: that tap was the request to listen.
      if (autoStart) startRef.current();
    } else if (!open && dialog.open) {
      shutdown();
      dialog.close();
    }
  }, [open, shutdown, autoStart]);

  const issueIsBlocking = voice.blocked;

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault(); // Escape: close our way, with cleanup
        onClose();
      }}
      onClick={(event) => {
        // A click on the backdrop lands on the <dialog> element itself.
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.headerMark} aria-hidden="true">
            <SparklesIcon size={18} />
          </span>
          <h2 id={titleId} className={styles.title}>
            {restaurantData.name}
            <span className={styles.subtitle}>AI Concierge · Voice</span>
          </h2>
          <button
            type="button"
            className={styles.close}
            aria-label="Close voice assistant"
            onClick={onClose}
          >
            <CloseIcon size={18} />
          </button>
        </header>

        <VoiceStatus status={voice.status} blocked={issueIsBlocking} interim={voice.interim} />

        {voice.status === "listening" && micPermission === "prompt" && (
          <p className={styles.notice} data-tone="info">
            {voiceCopy.permissionHint}
          </p>
        )}

        {voice.issue && (
          <p className={styles.notice} role="alert" data-blocking={issueIsBlocking}>
            {VOICE_MESSAGES[voice.issue]}
          </p>
        )}

        <VoiceTranscript turns={voice.turns} onAction={onReserve} />

        <VoiceControls
          status={voice.status}
          blocked={issueIsBlocking}
          onStart={voice.startListening}
          onStopListening={voice.stopListening}
          onStopSpeaking={voice.stopSpeaking}
          onOpenChat={onOpenChat}
          onReserve={onReserve}
        />

        <p className={styles.demoNote}>{voiceCopy.demoNote}</p>
      </div>
    </dialog>
  );
}
