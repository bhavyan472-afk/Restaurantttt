"use client";

import { AnimatePresence, m } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { chatbotCopy } from "@/data/chatbot";
import { restaurantData } from "@/data/restaurant";
import type { ChatMessage } from "@/lib/chatbot";
import { onOpenChatbot } from "@/lib/chatbotBridge";
import { useStepAside } from "@/lib/useStepAside";
import { CloseIcon, ConciergeIcon } from "./ChatIcons";
import { ChatWindow } from "./ChatWindow";
import styles from "./chatbot.module.css";

const PANEL_ID = "chatbot-panel";

const WELCOME: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content: chatbotCopy.welcome,
  suggestions: true,
};

let counter = 0;
const nextId = () => `m${Date.now().toString(36)}${(counter++).toString(36)}`;

/**
 * AI Concierge — launcher and panel, mounted once in the root layout.
 *
 * The conversation lives here, above the panel, so closing and reopening
 * keeps it for the rest of the visit (no storage, no account). The reply
 * logic is loaded on the first question, not with the page.
 */
export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [thinking, setThinking] = useState(false);

  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;
  const thinkingRef = useRef(thinking);
  thinkingRef.current = thinking;
  /** Bumped by Clear chat, so a reply still in flight is dropped. */
  const conversation = useRef(0);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    // Next frame: on phones the launcher is hidden while open, and cannot
    // take focus until the closed state has rendered.
    if (returnFocus) requestAnimationFrame(() => launcherRef.current?.focus());
  }, []);

  // Other features (the voice assistant) can open the chat — see chatbotBridge.
  useEffect(() => onOpenChatbot(() => setOpen(true)), []);

  // Escape closes, from anywhere, while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !event.defaultPrevented) close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  // On open: the input on desktop; the panel itself on touch devices, so the
  // on-screen keyboard does not jump up before the guest has read anything.
  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => {
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      (coarse ? panelRef.current : inputRef.current)?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [open]);

  /* On phones, step aside over the menu list and the forms, so the
     launcher never covers prices, fields or submit buttons. */
  const hideLauncher = useStepAside();

  const ask = useCallback(async (text: string) => {
    const question = text.trim();
    // One question at a time; the UI disables sending too.
    if (!question || thinkingRef.current) return;
    thinkingRef.current = true;

    const history = [...messagesRef.current, { id: nextId(), role: "user" as const, content: question }];
    setMessages(history);
    setThinking(true);
    const current = ++conversation.current;

    try {
      const { getAssistantResponse } = await import("@/lib/chatbot");
      const reply = await getAssistantResponse(history);
      if (current !== conversation.current) return;
      setMessages((list) => [...list, { id: nextId(), role: "assistant", ...reply }]);
    } catch {
      if (current !== conversation.current) return;
      setMessages((list) => [
        ...list,
        {
          id: nextId(),
          role: "assistant",
          content: "I'm sorry — I couldn't answer that just now. Please try again in a moment.",
        },
      ]);
    } finally {
      if (current === conversation.current) setThinking(false);
    }
  }, []);

  const clear = useCallback(() => {
    conversation.current++;
    setThinking(false);
    setMessages([WELCOME]);
    inputRef.current?.focus();
  }, []);

  return (
    <div className={styles.root}>
      <AnimatePresence>
        {open && (
          <ChatWindow
            ref={panelRef}
            id={PANEL_ID}
            messages={messages}
            thinking={thinking}
            inputRef={inputRef}
            onSend={ask}
            onClear={clear}
            onClose={() => close()}
            // Following a link scrolls the page; get out of its way.
            onAction={() => close(false)}
          />
        )}
      </AnimatePresence>

      <m.button
        ref={launcherRef}
        type="button"
        className={styles.launcher}
        data-open={open}
        data-hidden={hideLauncher && !open}
        aria-expanded={open}
        aria-controls={open ? PANEL_ID : undefined}
        aria-label={open ? "Close the AI Concierge" : `Open the ${restaurantData.name} AI Concierge`}
        onClick={() => (open ? close() : setOpen(true))}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className={styles.launcherIcon} aria-hidden="true">
          {open ? <CloseIcon size={22} /> : <ConciergeIcon size={24} />}
        </span>
        <span className={styles.launcherLabel} aria-hidden="true">
          {chatbotCopy.launcherLabel}
        </span>
      </m.button>
    </div>
  );
}
