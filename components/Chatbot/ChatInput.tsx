import { useLayoutEffect, useState, type RefObject } from "react";
import { chatbotCopy } from "@/data/chatbot";
import { SendIcon } from "./ChatIcons";
import styles from "./chatbot.module.css";

type ChatInputProps = {
  inputRef: RefObject<HTMLTextAreaElement | null>;
  onSend: (text: string) => void;
  /** True while a reply is being composed: typing is allowed, sending waits. */
  busy: boolean;
};

const INPUT_ID = "chatbot-input";

/**
 * Enter sends, Shift+Enter adds a line. Composition (IME) input is left
 * alone so Enter can confirm a Japanese or Chinese candidate without sending.
 * The field grows with its text; CSS max-height caps it, then it scrolls.
 */
export function ChatInput({ inputRef, onSend, busy }: ChatInputProps) {
  const [value, setValue] = useState("");
  const canSend = value.trim() !== "" && !busy;

  useLayoutEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value, inputRef]);

  const send = () => {
    if (!canSend) return;
    onSend(value.trim());
    setValue("");
  };

  return (
    <form
      className={styles.inputBar}
      onSubmit={(event) => {
        event.preventDefault();
        send();
      }}
    >
      <label htmlFor={INPUT_ID} className="visually-hidden">
        Your question for the AI Concierge
      </label>
      <textarea
        id={INPUT_ID}
        ref={inputRef}
        className={styles.input}
        rows={1}
        value={value}
        maxLength={chatbotCopy.maxLength}
        placeholder={chatbotCopy.placeholder}
        autoComplete="off"
        enterKeyHint="send"
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
            event.preventDefault();
            send();
          }
        }}
      />
      <button type="submit" className={styles.send} aria-label="Send message" disabled={!canSend}>
        <SendIcon size={18} />
      </button>
    </form>
  );
}
