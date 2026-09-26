import { chatbotCopy } from "@/data/chatbot";
import { experience } from "@/data/experience";
import {
  dietaryLabels,
  menuCategories,
  menuItems,
  type DietaryTag,
  type MenuCategoryId,
  type MenuItem,
} from "@/data/menu";
import { reservationConfig, reservationCopy } from "@/data/reservations";
import { bookingCta, features, openingHours, orderOnline, restaurantData } from "@/data/restaurant";
import { signatureDishes } from "@/data/signatureDishes";
import { story } from "@/data/story";
import { directionsUrl, fullAddress } from "@/lib/location";
import { normalizeQuery } from "@/lib/menuFilters";

/**
 * AI Concierge — the assistant's brain.
 *
 * ============================================================================
 *  No AI provider is connected. Replies are composed locally from the
 *  client configuration (content/restaurant.ts, via the data/ adapters), so
 *  the assistant can only say what the website already says — it never
 *  invents a dish, a price or an hour. What the guest types never leaves
 *  the browser.
 * ============================================================================
 *
 * To connect a real model, keep `getAssistantResponse`'s signature and
 * replace its body with a call to YOUR OWN server route, e.g.
 *
 *   const res = await fetch("/api/chat", {
 *     method: "POST",
 *     body: JSON.stringify({ messages: messages.map(({ role, content }) => ({ role, content })) }),
 *   });
 *   return (await res.json()) as AssistantReply;
 *
 * The route (app/api/chat/route.ts) holds the provider key in a server-only
 * environment variable — never a NEXT_PUBLIC_ one, never in this file — and
 * should ground the model in the same data files imported above.
 */

export type ChatRole = "user" | "assistant";

/** A follow-up link shown under a reply, e.g. Reserve a Table → #reservations. */
export type ChatAction = { label: string; href: string };

export type ChatMessage = {
  id: string;
  role: ChatRole;
  /** Plain text. Lines starting with "• " render as a list. */
  content: string;
  actions?: ChatAction[];
  /** Show the quick questions under this reply. */
  suggestions?: boolean;
};

export type AssistantReply = Pick<ChatMessage, "content" | "actions" | "suggestions">;

/* --- Links used by replies ---------------------------------------------- */

/** "Reserve a Table" — or Order Online / Visit Us when reservations are off. */
const RESERVE: ChatAction = { label: bookingCta.label, href: bookingCta.href };
const MENU: ChatAction = { label: "View the Menu", href: "#menu" };
const SIGNATURE: ChatAction = { label: "Signature Dishes", href: "#signature-dishes" };
const STORY: ChatAction = { label: "Our Story", href: "#story" };
const EXPERIENCE: ChatAction = { label: "The Experience", href: "#experience" };

/* --- Text helpers -------------------------------------------------------- */

/** Lower-case, accent-free, punctuation → spaces: "Crème-brûlée?" → "creme brulee". */
function normalize(text: string): string {
  return normalizeQuery(text).replace(/[^a-z0-9$]+/g, " ").trim();
}

/** Content files mark emphasis with *asterisks*; plain text here. */
const plain = (text: string) => text.replace(/\*/g, "");

const categoryLabel = (id: MenuCategoryId) =>
  menuCategories.find((c) => c.id === id)?.label ?? id;

const line = (item: MenuItem) => `• ${item.name} — ${item.price}`;

/** "A, B and C" */
function listWords(words: string[]): string {
  if (words.length <= 1) return words.join("");
  return `${words.slice(0, -1).join(", ")} and ${words.at(-1)}`;
}

/* --- Vocabulary ---------------------------------------------------------- */

const DIETARY: Record<DietaryTag, RegExp> = {
  vegetarian: /\b(vegetarian|veggie|meat free|meatless|no meat)\b/,
  vegan: /\b(vegan|plant based)\b/,
  "gluten-free": /\b(gluten|gluten free|coeliac|celiac)\b/,
  spicy: /\b(spicy|chilli|chili|heat)\b/,
};

/** Extra words guests use for common categories, keyed by category id. */
const CATEGORY_SYNONYMS: Record<string, string[]> = {
  starters: ["starter", "appetizer", "antipasti", "small plate"],
  "soups-salads": ["soup", "salad"],
  mains: ["main", "main course", "entree", "secondi"],
  pasta: ["pasta", "primi"],
  pizza: ["pizza"],
  grill: ["grill", "grilled meat", "steak"],
  desserts: ["dessert", "sweet", "pudding", "dolci"],
  drinks: ["drink", "cocktail", "beverage", "bar", "wine"],
};

const escapeRegex = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * One matcher per menu category, built from the client's own category
 * labels ("Soups & Salads" → soup, salad) plus the synonyms above, so a new
 * client's categories work without touching this file.
 */
const CATEGORY: Record<MenuCategoryId, RegExp> = Object.fromEntries(
  menuCategories.map((category) => {
    const words = [
      ...normalize(category.label)
        .split(" ")
        .filter((word) => word.length > 2 && word !== "and"),
      ...(CATEGORY_SYNONYMS[category.id] ?? []),
    ].map((word) => word.replace(/s$/, ""));
    const pattern = [...new Set(words)].map(escapeRegex).join("|");
    return [category.id, new RegExp(`\\b(${pattern})(e?s)?\\b`)];
  }),
);

/** Name words too generic to identify a dish on their own. */
const NOT_DISH_WORDS = new Set([
  ...normalize(restaurantData.name).split(" "),
  "signature", "seasonal", "fire", "house", "with", "fresh",
  "pizza", "salad", "soup", "pasta", "spicy", "water",
]);

const INTENT = {
  identity: /\b(who are you|what are you|are you (a )?(human|real|person|bot|robot|ai)|chatgpt)\b/,
  greeting: /^(hi|hello|hey|good (morning|afternoon|evening)|greetings)\b/,
  thanks: /\b(thanks?|thank you|cheers|much appreciated)\b/,
  reservation: /\b(reserv\w*|book\w*|a table|table for|availability|party of)\b/,
  popular: /\b(popular|recommend\w*|best|favou?rites?|signature|must try|specials?|speciality|specialty|specialities|specialties|what should i (order|get|try))\b/,
  hours: /\b(hours?|opening|open(?! fire)|closed?|closing|what time|when|today|tonight|monday|tuesday|wednesday|thursday|friday|saturday|sunday|weekends?)\b/,
  location: /\b(where|located|location|address|directions?|find you|parking|map|neighbou?rhood)\b/,
  contact: /\b(phone|call|email|e mail|contact|reach|telephone)\b/,
  price: /\b(price|prices|cost|costs|expensive|cheap|how much|budget|pricing)\b/,
  experience: /\b(experience|atmosphere|ambi[ae]nce|vibe|setting|music|interior|decor|dress code|romantic|date night|mood|dining room)\b/,
  story: new RegExp(
    `\\b(about|story|history|philosophy|background|chef|owner|founded|restaurant|concept|${escapeRegex(normalize(restaurantData.name))})\\b`,
  ),
  order: /\b(order online|online order\w*|delivery|deliver|takeaway|take away|takeout|take out|pick ?up)\b/,
  menu: /\b(menu|food|eat|dishes|serve|cuisine|options|order)\b/,
};

/* --- Dish search --------------------------------------------------------- */

const dishTokens = new Map<string, string[]>(
  menuItems.map((item) => [
    item.id,
    normalize(item.name)
      .split(" ")
      .filter((word) => word.length >= 4 && !NOT_DISH_WORDS.has(word)),
  ]),
);

/** Dishes whose distinctive name words appear in the question, best first. */
function findDishes(query: string): MenuItem[] {
  const words = new Set(query.split(" "));
  const hit = (token: string) =>
    words.has(token) || words.has(`${token}s`) || words.has(`${token}es`);

  let best = 0;
  let matches: MenuItem[] = [];
  for (const item of menuItems) {
    const score = (dishTokens.get(item.id) ?? []).filter(hit).length;
    if (score === 0 || score < best) continue;
    if (score > best) {
      best = score;
      matches = [];
    }
    matches.push(item);
  }
  return matches;
}

function dishDetail(item: MenuItem): AssistantReply {
  const signature = signatureDishes.find((dish) => dish.id === item.id);
  const facts = [
    categoryLabel(item.category),
    ...(item.dietary ?? []).map((tag) => dietaryLabels[tag]),
    ...(item.popular ? ["Chef's Favourite"] : []),
  ];

  const parts = [
    `${item.name} — ${item.price}`,
    item.description,
    facts.join(" · "),
  ];
  if (signature) parts.push(`It's also one of our Signature Dishes (${signature.label}).`);

  return { content: parts.join("\n"), actions: signature ? [SIGNATURE, MENU] : [MENU] };
}

/* --- Replies ------------------------------------------------------------- */

function menuReply(): AssistantReply {
  const labels = menuCategories.map((c) => c.label);
  const highlights = menuItems.filter((item) => item.popular).slice(0, 4);
  return {
    content: [
      `Our menu has ${menuItems.length} dishes across ${menuCategories.length} categories: ${listWords(labels)}.`,
      "A few favourites from the kitchen:",
      ...highlights.map(line),
      "Ask me about any dish, or about vegetarian, vegan or gluten-free options.",
    ].join("\n"),
    actions: [MENU],
  };
}

function dietaryReply(tags: DietaryTag[], category?: MenuCategoryId): AssistantReply {
  const matches = menuItems.filter((item) => {
    if (category && item.category !== category) return false;
    return tags.every((tag) =>
      // Vegan dishes are vegetarian too, even if not tagged twice.
      tag === "vegetarian"
        ? item.dietary?.includes("vegetarian") || item.dietary?.includes("vegan")
        : item.dietary?.includes(tag),
    );
  });

  const label = listWords(tags.map((tag) => dietaryLabels[tag].toLowerCase()));
  const within = category ? ` in ${categoryLabel(category)}` : "";

  if (matches.length === 0) {
    return {
      content: `Nothing${within} is marked ${label} on the current menu. You're welcome to note any dietary needs in the special requests field when you reserve.`,
      actions: [MENU, RESERVE],
    };
  }

  return {
    content: [
      `These dishes${within} are marked ${label} on our menu:`,
      ...matches.map(line),
      "For allergies, please mention them in the special requests field when you reserve.",
    ].join("\n"),
    actions: [MENU],
  };
}

function categoryReply(category: MenuCategoryId): AssistantReply {
  const items = menuItems.filter((item) => item.category === category);
  return {
    content: [`Our ${categoryLabel(category)}:`, ...items.map(line)].join("\n"),
    actions: [MENU],
  };
}

function popularReply(): AssistantReply {
  const favourites = menuItems.filter((item) => item.popular);
  const signatures = signatureDishes
    .map((dish) => menuItems.find((item) => item.id === dish.id))
    .filter((item): item is MenuItem => Boolean(item));

  return {
    content: [
      "These are marked as Chef's Favourites on our menu:",
      ...favourites.map(line),
      "And our Signature Dishes:",
      ...signatures.map(line),
    ].join("\n"),
    actions: [SIGNATURE, MENU],
  };
}

function hoursReply(): AssistantReply {
  return {
    content: [
      "Our dinner hours:",
      ...openingHours.map((entry) => `• ${entry.days}: ${entry.hours}`),
      `Reservations open ${reservationConfig.maxAdvanceDays} days ahead.`,
    ].join("\n"),
    actions: [RESERVE],
  };
}

function reservationReply(): AssistantReply {
  if (!features.reservations) {
    return {
      content: `We don't take bookings through this website. Please call us on ${restaurantData.phoneDisplay} and we'll be glad to help.`,
      actions: [{ label: "Call", href: `tel:${restaurantData.phone}` }, RESERVE],
    };
  }
  const { minGuests, maxGuests, reservationDurationMinutes } = reservationConfig;
  return {
    content: [
      "I'd be happy to help you reserve a table. You can use our reservation form to choose your date, time, and party size.",
      `Tables are for ${minGuests}–${maxGuests} guests, and a seating lasts about ${reservationDurationMinutes} minutes. ${reservationCopy.note}`,
    ].join("\n"),
    actions: [RESERVE],
  };
}

function locationReply(): AssistantReply {
  return {
    content: `You'll find us at ${fullAddress()}.`,
    actions: [
      { label: "Get Directions", href: directionsUrl() },
      { label: "Visit Us", href: "#visit" },
    ],
  };
}

function contactReply(): AssistantReply {
  return {
    content: `You can reach the restaurant by phone at ${restaurantData.phoneDisplay} or by email at ${restaurantData.email}.`,
    actions: [
      { label: "Call", href: `tel:${restaurantData.phone}` },
      { label: "Email", href: `mailto:${restaurantData.email}` },
    ],
  };
}

function orderReply(): AssistantReply {
  return orderOnline
    ? {
        content: "You can order online for delivery or pick-up — the menu and prices are the same as in the restaurant.",
        actions: [{ label: orderOnline.label, href: orderOnline.href }, MENU],
      }
    : {
        content: `We don't take online orders through this website. Please call us on ${restaurantData.phoneDisplay} and we'll be happy to help.`,
        actions: [{ label: "Call", href: `tel:${restaurantData.phone}` }, MENU],
      };
}

function priceReply(): AssistantReply {
  const prices = menuItems
    .map((item) => Number(item.price.replace(/[^0-9.]/g, "")))
    .filter((value) => Number.isFinite(value) && value > 0);
  const currency = menuItems[0]?.price.replace(/[0-9.,\s]/g, "") ?? "";
  return {
    content: `Dishes on our menu range from ${currency}${Math.min(...prices)} to ${currency}${Math.max(...prices)}. Ask me about any dish for its price.`,
    actions: [MENU],
  };
}

function storyReply(): AssistantReply {
  const principles = story.principles.map((p) => p.title);
  return {
    content: [
      plain(story.lead),
      plain(story.paragraphs[0] ?? ""),
      `Our kitchen is guided by ${principles.length === 1 ? "one principle" : `${principles.length} principles`}: ${listWords(principles)}.`,
    ]
      .filter(Boolean)
      .join("\n"),
    actions: [STORY],
  };
}

function experienceReply(): AssistantReply {
  return {
    content: [
      ...experience.paragraphs.map(plain),
      ...experience.pillars.map((pillar) => `• ${pillar.title}`),
      experience.closing.join(" "),
    ].join("\n"),
    actions: [EXPERIENCE, RESERVE],
  };
}

/** Compose a reply to one question. Pure and synchronous — easy to test. */
export function answer(question: string): AssistantReply {
  const q = normalize(question);
  if (!q) return { content: chatbotCopy.fallback, suggestions: true };

  if (INTENT.identity.test(q)) {
    return {
      content:
        `I'm the ${restaurantData.name} AI Concierge — an assistant that answers from this website's content. I'm not a person, and I can't see live availability or take bookings, but I can point you to everything you need.`,
      suggestions: true,
    };
  }

  const short = q.split(" ").length <= 4;
  if (short && INTENT.thanks.test(q)) {
    return { content: "My pleasure. Is there anything else I can help you with?" };
  }
  if (short && INTENT.greeting.test(q)) {
    return {
      content: "Good evening, and welcome. How can I help — our menu, opening hours, reservations, or the dining experience?",
      suggestions: true,
    };
  }

  if (INTENT.order.test(q)) return orderReply();
  if (INTENT.reservation.test(q)) return reservationReply();

  const dishes = findDishes(q);
  const tags = (Object.keys(DIETARY) as DietaryTag[]).filter((tag) => DIETARY[tag].test(q));
  const category = (Object.keys(CATEGORY) as MenuCategoryId[]).find((id) => CATEGORY[id].test(q));

  // "Is the ribeye gluten-free?" — answer about that one dish.
  if (tags.length > 0 && dishes.length === 1) {
    const [dish] = dishes;
    const marked = tags.filter((tag) => dish.dietary?.includes(tag));
    const missing = tags.filter((tag) => !dish.dietary?.includes(tag));
    const says = [
      marked.length ? `${dish.name} is marked ${listWords(marked.map((t) => dietaryLabels[t]))} on our menu.` : "",
      missing.length ? `It isn't marked ${listWords(missing.map((t) => dietaryLabels[t]))}.` : "",
    ].filter(Boolean);
    return {
      content: [...says, `${dish.description} (${dish.price})`].join("\n"),
      actions: [MENU],
    };
  }
  if (tags.length > 0) return dietaryReply(tags, category);

  if (dishes.length === 1) return dishDetail(dishes[0]);
  if (dishes.length > 1) {
    return {
      content: [
        "I found a few dishes that match:",
        ...dishes.slice(0, 6).map(line),
        "Ask me about any of them for more detail.",
      ].join("\n"),
      actions: [MENU],
    };
  }

  if (category) return categoryReply(category);
  if (INTENT.popular.test(q)) return popularReply();
  if (INTENT.hours.test(q)) return hoursReply();
  if (INTENT.location.test(q)) return locationReply();
  if (INTENT.contact.test(q)) return contactReply();
  if (INTENT.price.test(q)) return priceReply();
  if (INTENT.experience.test(q)) return experienceReply();
  if (INTENT.story.test(q)) return storyReply();
  if (INTENT.menu.test(q)) return menuReply();

  return { content: chatbotCopy.fallback, suggestions: true };
}

/**
 * The provider seam: the whole conversation in, the next reply out. The demo
 * answers the latest question after a short, human-feeling pause; a real
 * implementation calls a server route (see the note at the top).
 */
export async function getAssistantResponse(messages: ChatMessage[]): Promise<AssistantReply> {
  const latest = [...messages].reverse().find((message) => message.role === "user");
  await new Promise((resolve) => setTimeout(resolve, 550 + Math.random() * 450));
  return answer(latest?.content ?? "");
}
