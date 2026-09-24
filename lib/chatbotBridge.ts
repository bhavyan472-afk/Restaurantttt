/**
 * Lets other parts of the site open the one AI Concierge chat (Step 10)
 * without importing it or sharing its state — e.g. the voice assistant's
 * "Open AI Chat". A plain DOM event: no context provider, no second window.
 */

const OPEN_EVENT = "ember-sage:open-chatbot";

export function openChatbot(): void {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

/** Subscribe; returns the unsubscribe function. */
export function onOpenChatbot(handler: () => void): () => void {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}
