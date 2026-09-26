/**
 * Wording for the Visit Us section (address, hours, map, contact form).
 * The heading comes from content/restaurant.ts → visit; the FACTS (address,
 * phone, email, hours, social links) from the same file via
 * data/restaurant.ts. This file is template wording only — no client facts.
 */

import { restaurant } from "@/content/restaurant";

export const visitCopy = {
  eyebrow: restaurant.visit.eyebrow,
  heading: restaurant.visit.heading,
  intro: restaurant.visit.intro,
  labels: {
    address: "Address",
    hours: "Opening Hours",
    phone: "Phone",
    email: "Email",
    transport: "Getting Here",
    parking: "Parking",
    accessibility: "Accessibility",
    social: "Follow Along",
  },
  directions: "Get Directions",
  directionsHint: "(opens Google Maps in a new tab)",
  mapTitle: (name: string, address: string) => `Map showing ${name} at ${address}`,
  socialDemoNote: "Demo links — they open each platform's home page.",
  /** Keep this free of facilities the restaurant does not actually have. */
  message: {
    label: "Get in Touch",
    heading: "Planning something *special?*",
    text: "Birthdays, anniversaries, private dinners or a question about the menu — send us a note and the team will reply by email.",
  },
};

export const contactCopy = {
  form: {
    title: "Send us a message",
    hint: "Questions, private dining or a special occasion — we reply by email.",
    labels: {
      name: "Your Name",
      email: "Email Address",
      phone: "Phone Number",
      reason: "What can we help with?",
      subject: "Subject",
      message: "Message",
    },
    placeholders: {
      name: "Your name",
      email: "you@example.com",
      phone: "+1 ...",
      reason: "Choose a topic",
      subject: "How can we help?",
      message: "Tell us how we can help...",
    },
    reasons: [
      "General Question",
      "Reservation Question",
      "Private Dining",
      "Special Occasion",
      "Dietary Requirements",
      "Other",
    ],
    submit: "Send Message",
    submitting: "Sending...",
    sent: "Message Sent",
    demoNote: "Demo form — messages are not sent until email is set up (see README).",
  },

  success: {
    heading: "Thank you.",
    lines: ["Your message has been sent to the restaurant.", "We'll reply by email as soon as we can."],
    demoLines: [
      "Your message has been received in this demo.",
      "Nothing was sent — email delivery is not set up yet.",
    ],
    again: "Send Another Message",
  },
};
