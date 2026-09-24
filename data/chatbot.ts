/**
 * ============================================================================
 *  DEMO DATA — REPLACE WITH CLIENT INFORMATION
 * ============================================================================
 *  Wording for the AI Concierge. The assistant's KNOWLEDGE is not here — it
 *  is read from the site's own data (menu, hours, story, experience,
 *  reservations) by lib/chatbot.ts, so it can never disagree with the page.
 *
 *  The assistant is a local demo: no AI provider is connected, and nothing
 *  typed into it leaves the browser. See lib/chatbot.ts to connect one.
 */

export const chatbotCopy = {
  name: "AI Concierge",
  /** Visible on the launcher from 1024px; part of its accessible name. */
  launcherLabel: "AI Concierge",
  welcome:
    "Welcome to EMBER & SAGE. I'm your AI Concierge. Ask me about our menu, dining experience, opening hours, or reservations.",
  fallback:
    "I'm currently connected to the EMBER & SAGE demo knowledge base. I can help with our menu, dishes, opening hours, reservations, restaurant story, and dining experience.",
  placeholder: "Ask about EMBER & SAGE...",
  /** Shown under the header, so the demo status is never implied away. */
  status: "Demo · answers from this website",
  quickQuestions: [
    "View the menu",
    "What are your opening hours?",
    "What vegetarian dishes do you have?",
    "How do I reserve a table?",
    "Tell me about EMBER & SAGE",
    "Where are you located?",
  ],
  /** Longest message a guest can send. */
  maxLength: 500,
};
