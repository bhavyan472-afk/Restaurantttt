/**
 *  Wording for the AI Concierge. The assistant's KNOWLEDGE is not here — it
 *  is read from content/restaurant.ts (menu, hours, address, story,
 *  experience, reservations) by lib/chatbot.ts, so it can never disagree
 *  with the page.
 *
 *  The assistant is a local demo: no AI provider is connected, and nothing
 *  typed into it leaves the browser. See lib/chatbot.ts to connect one.
 */

import { restaurant } from "@/content/restaurant";

const name = restaurant.brand.name;

export const chatbotCopy = {
  name: "AI Concierge",
  /** Visible on the launcher from 1024px; part of its accessible name. */
  launcherLabel: "AI Concierge",
  welcome:
    `Welcome to ${name}. I'm your AI Concierge. Ask me about our menu, dining experience, opening hours, or reservations.`,
  fallback:
    `I answer from the ${name} website. I can help with our menu, dishes, opening hours, reservations, address, restaurant story, and dining experience.`,
  placeholder: `Ask about ${name}...`,
  /** Shown under the header, so the demo status is never implied away. */
  status: "Demo · answers from this website",
  quickQuestions: [
    "View the menu",
    "What are your opening hours?",
    "What vegetarian dishes do you have?",
    "How do I reserve a table?",
    `Tell me about ${name}`,
    "Where are you located?",
  ],
  /** Longest message a guest can send. */
  maxLength: 500,
};
