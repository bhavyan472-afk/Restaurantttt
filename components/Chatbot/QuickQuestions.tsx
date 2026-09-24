import { chatbotCopy } from "@/data/chatbot";
import styles from "./chatbot.module.css";

type QuickQuestionsProps = {
  onAsk: (question: string) => void;
  disabled?: boolean;
};

/** Suggested questions. Real buttons — Tab reaches each, Enter/Space asks it. */
export function QuickQuestions({ onAsk, disabled }: QuickQuestionsProps) {
  return (
    <ul role="list" className={styles.quick} aria-label="Suggested questions">
      {chatbotCopy.quickQuestions.map((question) => (
        <li key={question}>
          <button
            type="button"
            className={styles.chip}
            aria-disabled={disabled}
            onClick={() => !disabled && onAsk(question)}
          >
            {question}
          </button>
        </li>
      ))}
    </ul>
  );
}
