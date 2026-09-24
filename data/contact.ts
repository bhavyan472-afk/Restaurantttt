/**
 * ============================================================================
 *  DEMO DATA — REPLACE WITH CLIENT INFORMATION
 * ============================================================================
 *  Wording for the Contact section only. The FACTS — name, address, phone,
 *  email, hours and social links — are not repeated here; they come from
 *  data/restaurant.ts (`restaurantData`, `location`, `openingHours`,
 *  `socialLinks`), the single source the Location section, the chat and the
 *  SEO data also read.
 */

export const contactCopy = {
  eyebrow: "Get in Touch",
  heading: "Let's make it an evening to *remember.*",
  intro:
    "Questions, special occasions, private dining, or simply want to say hello? We'd love to hear from you.",

  methods: {
    call: "Call Us",
    email: "Email Us",
    find: "Find Us",
    /** Appended for screen readers to the Find Us link, which opens Maps. */
    findHint: "(opens directions in Google Maps in a new tab)",
  },

  hoursLabel: "Dinner Hours",
  socialLabel: "Follow Along",
  /** Shown under the icons while socialLinksAreDemo is true. */
  socialDemoNote: "Demo links — they open each platform's home page.",

  /** Keep this free of facilities the restaurant does not actually have. */
  hospitality: {
    label: "For Special Occasions",
    text: "Planning a birthday, anniversary, private dinner, or intimate gathering? Tell us what you're planning and our team can help shape the evening.",
  },

  ctas: {
    reserve: {
      label: "Looking to book a table?",
      button: "Reserve a Table",
      href: "#reservations",
    },
    directions: {
      label: "Need directions?",
      button: "Find Us",
      href: "#location",
    },
  },

  form: {
    title: "Send us a message",
    hint: "All fields are required unless marked optional.",
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
      "Partnership",
      "Other",
    ],
    submit: "Send Message",
    submitting: "Sending...",
    sent: "Message Sent",
    demoNote: "Demo contact form — messages are not sent to the restaurant.",
  },

  success: {
    heading: "Thank you.",
    lines: [
      "Your message has been received in this demo experience.",
      "The restaurant team will be able to respond once a real contact service is connected.",
    ],
    again: "Send Another Message",
  },
};
