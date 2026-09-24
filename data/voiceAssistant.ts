/**
 * ============================================================================
 *  DEMO DATA — REPLACE WITH CLIENT INFORMATION
 * ============================================================================
 *  Wording for the voice assistant. Its KNOWLEDGE is the chat's
 *  (lib/chatbot.ts, built from the site's data), so the two never disagree.
 *
 *  This is a website voice demo using the browser's own speech features. It
 *  does not place a phone call, and no voice provider is connected.
 */

export const voiceCopy = {
  cta: {
    eyebrow: "Need Help?",
    title: "Talk to our AI Concierge",
    text: "Ask about our menu, reservations, opening hours, and dining experience.",
    button: "Start Voice Assistant",
  },
  states: {
    ready: {
      label: "Ready to listen",
      text: "Ask me about our menu, reservations, opening hours, or dining experience.",
    },
    listening: { label: "Listening...", text: "I'm listening." },
    thinking: { label: "Thinking...", text: "Let me find that for you." },
    speaking: { label: "Speaking...", text: "EMBER & SAGE AI Concierge" },
    unavailable: { label: "Voice unavailable", text: "" },
  },
  /** Always visible in the modal: what this is, and what it is not. */
  demoNote:
    "Voice mode is currently available as a website demo. It never places a phone call. Your browser turns speech into text, and some browsers use an online speech service to do so.",
  fallback: "You can still use our AI Concierge chat or reservation form.",
  preferTyping: "Prefer typing?",
};
