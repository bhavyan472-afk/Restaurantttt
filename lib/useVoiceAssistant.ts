"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatAction, ChatMessage } from "@/lib/chatbot";

/**
 * Voice interface for the AI Concierge.
 *
 *   voice → browser speech-to-text → lib/chatbot (the SAME knowledge as the
 *   chat) → reply text → browser text-to-speech
 *
 * Browser-native only: the Web Speech API where the browser offers it, and a
 * graceful fallback where it does not. No voice provider, no API key, no
 * phone call. The microphone is only requested by `startListening`, i.e. an
 * explicit tap, and every recogniser and utterance is torn down on stop,
 * close and unmount.
 *
 * To connect a real voice provider later, keep this hook's return shape and
 * swap the recogniser / synthesiser for calls to your own server route —
 * credentials stay on the server.
 */

/* --- Minimal Web Speech typings (not in TypeScript's DOM lib) ------------ */

type RecognitionAlternative = { transcript: string };
type RecognitionResult = { isFinal: boolean; 0: RecognitionAlternative; length: number };
type RecognitionEvent = { resultIndex: number; results: ArrayLike<RecognitionResult> };
type RecognitionErrorEvent = { error: string };

type Recognition = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  maxAlternatives: number;
  onstart: (() => void) | null;
  onresult: ((event: RecognitionEvent) => void) | null;
  onerror: ((event: RecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

type RecognitionConstructor = new () => Recognition;

function getRecognition(): RecognitionConstructor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: RecognitionConstructor;
    webkitSpeechRecognition?: RecognitionConstructor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

const hasSynthesis = () =>
  typeof window !== "undefined" &&
  "speechSynthesis" in window &&
  typeof window.SpeechSynthesisUtterance === "function";

/* --- Public types -------------------------------------------------------- */

export type VoiceStatus = "ready" | "listening" | "thinking" | "speaking";

/** Why voice cannot be used (persistent) or why the last try failed (transient). */
export type VoiceIssue =
  | "unsupported" // no speech recognition in this browser
  | "denied" // microphone permission refused — not asked again
  | "no-microphone"
  | "no-speech"
  | "network"
  | "failed"; // recognition or reply failed for another reason

export type VoiceTurn = {
  id: string;
  role: "user" | "assistant";
  content: string;
  actions?: ChatAction[];
};

export const VOICE_MESSAGES: Record<VoiceIssue, string> = {
  unsupported:
    "Voice mode isn't supported in this browser. You can continue with our AI Concierge chat.",
  denied:
    "Microphone access was not granted. You can continue using the AI Concierge chat instead.",
  "no-microphone": "I couldn't find a microphone. You can continue with our AI Concierge chat.",
  "no-speech": "I couldn't hear that clearly. Please try again.",
  network: "Your browser's speech service couldn't be reached. Please try again, or use the chat.",
  failed: "Something went wrong on my side. Please try again, or use the chat.",
};

/** Issues that end voice for this visit; the rest just need another try. */
export const BLOCKING: VoiceIssue[] = ["unsupported", "denied", "no-microphone"];

let counter = 0;
const nextId = () => `v${Date.now().toString(36)}${(counter++).toString(36)}`;

/** Reply text as it should sound: bullets become pauses, not "bullet". */
function toSpeech(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.replace(/^•\s*/, "").trim())
    .filter(Boolean)
    // Chrome cuts off long utterances; speak sentence-sized pieces.
    .flatMap((line) => line.match(/[^.!?]+[.!?]*/g) ?? [line])
    .map((piece) => piece.trim())
    .filter(Boolean);
}

export function useVoiceAssistant() {
  const [status, setStatus] = useState<VoiceStatus>("ready");
  const [issue, setIssue] = useState<VoiceIssue | null>(null);
  const [interim, setInterim] = useState("");
  const [turns, setTurns] = useState<VoiceTurn[]>([]);
  const [support, setSupport] = useState({ recognition: false, synthesis: false, checked: false });

  const recognitionRef = useRef<Recognition | null>(null);
  const finalRef = useRef("");
  const errorRef = useRef<VoiceIssue | null>(null);
  const deniedRef = useRef(false);
  const turnsRef = useRef(turns);
  turnsRef.current = turns;
  /** Bumped on stop/close so a reply still in flight is not spoken. */
  const sessionRef = useRef(0);

  // Detect after mount — never during render, so SSR and client agree.
  useEffect(() => {
    const recognition = Boolean(getRecognition());
    setSupport({ recognition, synthesis: hasSynthesis(), checked: true });
    if (!recognition) setIssue("unsupported");
  }, []);

  /* --- Speaking ---------------------------------------------------------- */

  const stopSpeaking = useCallback(() => {
    if (hasSynthesis()) window.speechSynthesis.cancel();
    setStatus((current) => (current === "speaking" ? "ready" : current));
  }, []);

  const speak = useCallback((text: string) => {
    if (!hasSynthesis()) {
      setStatus("ready");
      return;
    }
    const synth = window.speechSynthesis;
    synth.cancel();
    const pieces = toSpeech(text);
    if (pieces.length === 0) {
      setStatus("ready");
      return;
    }
    const session = sessionRef.current;
    setStatus("speaking");
    // Some browsers accept utterances but never play them (no voices
    // installed). Don't leave the guest stuck in "Speaking…".
    window.setTimeout(() => {
      if (session === sessionRef.current && !synth.speaking && !synth.pending) {
        setStatus((current) => (current === "speaking" ? "ready" : current));
      }
    }, 2000);
    pieces.forEach((piece, index) => {
      const utterance = new SpeechSynthesisUtterance(piece);
      utterance.lang = "en-US";
      utterance.rate = 1;
      if (index === pieces.length - 1) {
        utterance.onend = () => {
          if (session === sessionRef.current) setStatus("ready");
        };
      }
      // "interrupted"/"canceled" come from our own stop — not an error.
      utterance.onerror = () => {
        if (session === sessionRef.current) setStatus("ready");
      };
      synth.speak(utterance);
    });
  }, []);

  /* --- Asking ------------------------------------------------------------ */

  const ask = useCallback(
    async (question: string) => {
      const text = question.trim();
      if (!text) return;
      const session = sessionRef.current;
      const userTurn: VoiceTurn = { id: nextId(), role: "user", content: text };
      const history = [...turnsRef.current, userTurn];
      setTurns(history);
      setStatus("thinking");

      try {
        // The chat's knowledge, loaded on first use.
        const { getAssistantResponse } = await import("@/lib/chatbot");
        const reply = await getAssistantResponse(history as ChatMessage[]);
        if (session !== sessionRef.current) return;
        setTurns((list) => [
          ...list,
          { id: nextId(), role: "assistant", content: reply.content, actions: reply.actions },
        ]);
        speak(reply.content);
      } catch {
        if (session !== sessionRef.current) return;
        setIssue("failed");
        setStatus("ready");
      }
    },
    [speak],
  );

  /* --- Listening --------------------------------------------------------- */

  const detach = (recognition: Recognition | null) => {
    if (!recognition) return;
    recognition.onstart = recognition.onresult = recognition.onerror = recognition.onend = null;
  };

  const startListening = useCallback(() => {
    const Ctor = getRecognition();
    if (!Ctor) {
      setIssue("unsupported");
      return;
    }
    // Never ask again after a refusal in this visit.
    if (deniedRef.current) {
      setIssue("denied");
      return;
    }

    stopSpeaking();
    detach(recognitionRef.current);
    recognitionRef.current?.abort();

    const recognition = new Ctor();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    finalRef.current = "";
    errorRef.current = null;
    setInterim("");
    setIssue(null);

    recognition.onstart = () => setStatus("listening");

    recognition.onresult = (event) => {
      let finalText = "";
      let interimText = "";
      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) finalText += result[0].transcript;
        else interimText += result[0].transcript;
      }
      finalRef.current = finalText;
      setInterim((finalText + " " + interimText).trim());
    };

    recognition.onerror = (event) => {
      const map: Record<string, VoiceIssue | null> = {
        "not-allowed": "denied",
        "service-not-allowed": "denied",
        "audio-capture": "no-microphone",
        "no-speech": "no-speech",
        network: "network",
        aborted: null, // our own stop/close
      };
      const mapped = event.error in map ? map[event.error] : "failed";
      if (mapped === "denied") deniedRef.current = true;
      errorRef.current = mapped;
    };

    recognition.onend = () => {
      recognitionRef.current = null;
      const heard = finalRef.current.trim() || "";
      setInterim("");
      if (errorRef.current) {
        setIssue(errorRef.current);
        setStatus("ready");
      } else if (heard) {
        void ask(heard);
      } else {
        setIssue("no-speech");
        setStatus("ready");
      }
    };

    recognitionRef.current = recognition;
    try {
      recognition.start(); // the browser asks for the microphone here, if needed
      setStatus("listening");
    } catch {
      recognitionRef.current = null;
      setIssue("failed");
      setStatus("ready");
    }
  }, [ask, stopSpeaking]);

  /** Stop and use what was heard so far (onend processes it). */
  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  /** Close/unmount: silence everything, drop anything in flight. */
  const shutdown = useCallback(() => {
    sessionRef.current++;
    const recognition = recognitionRef.current;
    detach(recognition);
    recognition?.abort();
    recognitionRef.current = null;
    if (hasSynthesis()) window.speechSynthesis.cancel();
    setInterim("");
    setStatus("ready");
  }, []);

  useEffect(() => shutdown, [shutdown]);

  const blocked = issue !== null && BLOCKING.includes(issue);

  return {
    status,
    issue,
    blocked,
    interim,
    turns,
    support,
    startListening,
    stopListening,
    stopSpeaking,
    shutdown,
    clearIssue: () => setIssue((current) => (current && BLOCKING.includes(current) ? current : null)),
  };
}
