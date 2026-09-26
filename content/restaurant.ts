/**
 * ============================================================================
 *  CLIENT CONFIGURATION — the ONE file to edit for a new restaurant.
 * ============================================================================
 *  Every component, the AI concierge's knowledge, the booking emails and the
 *  search-engine data read from here. See README → "How to make a new client
 *  version".
 *
 *  Images live in /public/images/<client-name>/ — set IMG below.
 *  Wrap a word in *asterisks* in a heading to set it in the accent italic.
 *
 *  Everything below is DEMO CONTENT for the template ("EMBER & SAGE", a
 *  wood-fired Italian grill). Set `demo: false` once it is all real.
 */

import type { RestaurantConfig } from "./types";

/** This client's image folder under /public. */
const IMG = "/images/ember-sage";

export const restaurant: RestaurantConfig = {
  demo: true,

  brand: {
    name: "EMBER & SAGE",
    tagline: "Where Fire Meets Flavor.",
    description:
      "EMBER & SAGE is a wood-fired Italian grill: hand-made pasta, pizza from the oak oven and prime cuts over open flame, in an intimate candle-lit room.",
    cuisine: ["Italian", "Wood-fired", "Grill"],
    priceRange: "$$$",
    backdropWord: "EMBER",
    statement:
      "A wood-fired Italian grill — pasta made by hand, pizza from the oak oven, and prime cuts finished over open flame.",
  },

  theme: {
    background: "#0c0b0a",
    backgroundAlt: "#18130f",
    surface: "#1a1511",
    foreground: "#f3ece0",
    muted: "#aaa093",
    accent: "#c6a462",
    accentHover: "#e2c891",
    onAccent: "#15110c",
  },

  contact: {
    phone: "+12125550142",
    phoneDisplay: "+1 (212) 555-0142",
    email: "hello@example.com",
    address: {
      street: "123 Culinary Avenue",
      area: "Downtown",
      city: "New York",
      region: "NY",
      postalCode: "10001",
      country: "US",
      latitude: 40.7484,
      longitude: -73.9857,
    },
  },

  hours: [
    {
      days: "Monday – Thursday",
      hours: "5:00 PM – 10:00 PM",
      schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "17:00",
      closes: "22:00",
    },
    {
      days: "Friday – Saturday",
      hours: "5:00 PM – 11:30 PM",
      schemaDays: ["Friday", "Saturday"],
      opens: "17:00",
      closes: "23:30",
    },
    {
      days: "Sunday",
      hours: "4:00 PM – 9:00 PM",
      schemaDays: ["Sunday"],
      opens: "16:00",
      closes: "21:00",
    },
  ],

  // Demo: each platform's home page — never someone else's account.
  social: [
    { platform: "instagram", label: "Instagram", url: "https://www.instagram.com/" },
    { platform: "facebook", label: "Facebook", url: "https://www.facebook.com/" },
    { platform: "tiktok", label: "TikTok", url: "https://www.tiktok.com/" },
  ],

  features: {
    reservations: true,
    orderOnline: true,
    aiConcierge: true,
    reviews: true,
  },

  orderOnline: {
    url: "",
    label: "Order Online",
  },

  reservations: {
    notifyEmail: "",
    minGuests: 1,
    maxGuests: 12,
    defaultGuests: 2,
    durationMinutes: 90,
    minLeadMinutes: 60,
    maxAdvanceDays: 90,
    timeSlots: [
      "5:30 PM",
      "6:00 PM",
      "6:30 PM",
      "7:00 PM",
      "7:30 PM",
      "8:00 PM",
      "8:30 PM",
      "9:00 PM",
      "9:30 PM",
    ],
    closedDates: [],
    referencePrefix: "ES",
    copy: {
      eyebrow: "Reservations",
      heading: "Reserve your *table.*",
      intro:
        "Join us for an evening by the fire — oak-oven pizza, hand-made pasta and cuts from the grill.",
      aside: "Good food deserves good company.",
      image: {
        src: `${IMG}/dishes/creme-brulee.png`,
        alt: "A vanilla crème brûlée with a spoon breaking its caramelised crust, berries on top and candles softly lit behind.",
      },
    },
  },

  hero: {
    label: "Wood-Fired Italian Grill",
    headingLines: [
      { text: "Where Fire", accent: false },
      { text: "Meets Flavor.", accent: true },
    ],
    supporting:
      "Oak-fired pizza, hand-made pasta and prime cuts from the open grill — an intimate Italian table, shaped by flame.",
    image: {
      src: `${IMG}/hero/grill-embers.webp`,
      alt: "A thick-cut steak searing on a glowing grill, embers rising into the dark.",
    },
    // The client's uploaded clip, served from /public/video. Phones fall back
    // to the desktop file while `mobile` is empty.
    video: {
      desktop: ["/video/Cinematic_slow_motion_close_up.mp4"],
      mobile: [],
    },
  },

  signature: {
    eyebrow: "From the Fire",
    heading: "Signature *dishes.*",
    intro:
      "The plates that define our kitchen — Italian classics, finished over oak and open flame.",
    dishes: [
      {
        id: "fire-roasted-ribeye",
        label: "Chef's Signature",
        description:
          "Dry-aged ribeye finished over open flame with smoked shallot butter and seasonal vegetables.",
        image: `${IMG}/dishes/ribeye.png`,
        video: "/video/gemini_generated_video_cf10333e.mp4",
        alt: "Thick slices of bone-in ribeye, pink at the centre, with roasted potatoes, asparagus and charred tomatoes by candlelight.",
      },
      {
        id: "truffle-tagliatelle",
        label: "Made by Hand",
        description:
          "Hand-cut tagliatelle, black truffle, parmesan cream, and freshly shaved truffle.",
        image: `${IMG}/dishes/truffle-tagliatelle.png`,
        video: "/video/gemini_generated_video_8c41379a.mp4",
        alt: "A dark bowl of tagliatelle in parmesan cream, heaped with shaved black truffle.",
      },
      {
        id: "charred-octopus",
        label: "From the Grill",
        description:
          "Tender charred octopus with smoked paprika, lemon, herbs, and ember-roasted vegetables.",
        image: `${IMG}/dishes/charred-octopus.png`,
        video: "/video/PixVerse_V6_Image_Text_360P_Charred_Octopus cr.mp4",
        alt: "Charred octopus tentacles over a smooth purée with blistered tomatoes, herbs and a grilled lemon half.",
      },
      {
        id: "wild-mushroom-risotto",
        label: "Chef's Favourite",
        description:
          "Creamy arborio rice, wild mushrooms, aged parmesan, thyme, and roasted garlic.",
        image: `${IMG}/dishes/mushroom-risotto.png`,
        video: "/video/PixVerse_V6_Image_Text_720P_5Second_Video_Prom.mp4",
        alt: "Creamy risotto topped with seared wild mushrooms, herbs and shaved parmesan.",
      },
      {
        id: "burnt-basque-cheesecake",
        label: "Dolci",
        description:
          "Silky cheesecake with a deeply caramelised top, baked in the oak oven, with seasonal berry compote.",
        image: `${IMG}/dishes/basque-cheesecake.png`,
        video: "/video/PixVerse_V6_Image_Text_360P_5Second_Video_Prom.mp4",
        alt: "A burnt Basque cheesecake with a slice cut away, its dark caramelised top beside fresh berries.",
      },
      {
        id: "smoked-negroni",
        label: "House Signature",
        description:
          "A classic Negroni reimagined with subtle smoke, bitter orange, and aromatic botanicals.",
        image: `${IMG}/dishes/smoked-negroni.png`,
        video: "/video/PixVerse_V6_Image_Text_360P_5Second_Video_Prom (1).mp4",
        alt: "A Negroni over a large ice cube with an orange twist, applewood smoke spilling from a lifted glass cloche.",
      },
    ],
  },

  story: {
    eyebrow: "Our Story",
    heading: "Born from fire.\nCrafted with *intention.*",
    intro: "",
    lead: "EMBER & SAGE began with a simple belief: the best Italian food is cooked slowly, over real fire.",
    paragraphs: [
      "Our pizza bakes in an *oak-fired oven*, our pasta is rolled by hand every afternoon, and our meat and fish finish over glowing embers.",
      "The kitchen follows the Italian way — a few *seasonal* ingredients at their peak, handled with care and very little fuss.",
      "Every plate balances warmth, smoke, freshness, and *restraint*.",
    ],
    closing: ["This is our table.", "This is EMBER & SAGE."],
    images: {
      main: {
        src: `${IMG}/dishes/striploin.png`,
        alt: "A fire-seared striploin carved into pink slices, with roasted potatoes, asparagus and herbs, candles glowing behind.",
      },
      detail: {
        src: `${IMG}/dishes/margherita.png`,
        alt: "A wood-fired margherita with a blistered crust, melted mozzarella and fresh basil.",
      },
    },
    caption: "Fire • Season • Craft",
    principles: [
      { title: "Fire", text: "Oak oven and open grill are the heart of our kitchen." },
      { title: "Seasonal", text: "We let the Italian season guide the ingredients." },
      { title: "Craft", text: "Pasta by hand, dough rested for 48 hours, nothing rushed." },
    ],
  },

  menu: {
    eyebrow: "Our Menu",
    heading: "Crafted for the *table.*",
    intro:
      "Antipasti to share, pasta made by hand, pizza from the oak oven and cuts from the open grill.",
    categories: [
      { id: "starters", label: "Starters" },
      { id: "soups-salads", label: "Soups & Salads" },
      { id: "pizza", label: "Pizza" },
      { id: "pasta", label: "Pasta" },
      { id: "grill", label: "Grill" },
      { id: "mains", label: "Main Course" },
      { id: "desserts", label: "Desserts" },
      { id: "drinks", label: "Drinks" },
    ],
    items: [
      /* --- Starters ------------------------------------------------------ */
      {
        id: "truffle-burrata",
        name: "Truffle Burrata",
        description: "Creamy burrata, shaved black truffle, heirloom tomatoes, basil oil.",
        price: "$18",
        category: "starters",
        dietary: ["vegetarian", "gluten-free"],
        popular: true,
        featured: true,
        image: `${IMG}/menu/truffle-burrata.jpg`,
        alt: "Burrata with shaved black truffle and heirloom tomatoes.",
      },
      {
        id: "charred-octopus",
        name: "Charred Octopus",
        description: "Smoked paprika, lemon, garden herbs, ember-roasted vegetables.",
        price: "$21",
        category: "starters",
        dietary: ["gluten-free"],
        image: `${IMG}/menu/charred-octopus.jpg`,
        alt: "Charred octopus over ember-roasted vegetables.",
      },
      {
        id: "gamberi-alla-brace",
        name: "Gamberi alla Brace",
        description: "Tiger prawns grilled over oak, calabrian chilli, garlic, lemon, parsley.",
        price: "$22",
        category: "starters",
        dietary: ["gluten-free", "spicy"],
      },
      {
        id: "fire-roasted-mushrooms",
        name: "Fire-Roasted Mushrooms",
        description: "Wild mushrooms, garlic butter, thyme, grilled sourdough.",
        price: "$14",
        category: "starters",
        dietary: ["vegetarian"],
        image: `${IMG}/menu/fire-roasted-mushrooms.jpg`,
        alt: "Fire-roasted wild mushrooms with grilled sourdough.",
      },

      /* --- Soups & Salads ------------------------------------------------ */
      {
        id: "roasted-tomato-bisque",
        name: "Roasted Tomato Soup",
        description: "Slow-roasted San Marzano tomato, smoked cream, basil, sourdough crumb.",
        price: "$12",
        category: "soups-salads",
        dietary: ["vegetarian"],
        image: `${IMG}/menu/roasted-tomato-bisque.jpg`,
        alt: "Bowl of roasted tomato soup finished with cream.",
      },
      {
        id: "burrata-garden-salad",
        name: "Burrata Garden Salad",
        description: "Stone fruit, rocket, aged balsamic, toasted hazelnut.",
        price: "$15",
        category: "soups-salads",
        dietary: ["vegetarian", "gluten-free"],
        featured: true,
        image: `${IMG}/menu/burrata-garden-salad.jpg`,
        alt: "Garden salad with burrata, stone fruit and rocket.",
      },
      {
        id: "classic-caesar-salad",
        name: "Grilled Caesar Salad",
        description: "Flame-kissed romaine, garlic croutons, shaved parmesan, anchovy dressing.",
        price: "$14",
        category: "soups-salads",
        image: `${IMG}/menu/classic-caesar-salad.jpg`,
        alt: "Romaine Caesar salad with golden croutons, parmesan shavings and creamy dressing.",
      },
      {
        id: "seasonal-greens",
        name: "Seasonal Greens",
        description: "Market leaves, citrus vinaigrette, herbs, toasted seeds.",
        price: "$13",
        category: "soups-salads",
        dietary: ["vegan", "gluten-free"],
        image: `${IMG}/menu/seasonal-greens.jpg`,
        alt: "Bowl of seasonal market greens with toasted seeds.",
      },

      /* --- Pizza (oak oven) ---------------------------------------------- */
      {
        id: "ember-margherita",
        name: "Margherita",
        description: "San Marzano, fior di latte, basil, cold-pressed olive oil.",
        price: "$18",
        category: "pizza",
        dietary: ["vegetarian"],
        featured: true,
        image: `${IMG}/dishes/margherita.png`,
        alt: "Wood-fired margherita with a blistered crust, melted mozzarella and fresh basil.",
      },
      {
        id: "truffle-mushroom-pizza",
        name: "Truffle Mushroom Pizza",
        description: "Wild mushroom, taleggio, truffle cream, thyme.",
        price: "$24",
        category: "pizza",
        dietary: ["vegetarian"],
        popular: true,
        image: `${IMG}/menu/truffle-mushroom-pizza.webp`,
        alt: "Truffle and wild mushroom pizza with taleggio.",
      },
      {
        id: "spicy-calabrese",
        name: "Diavola Calabrese",
        description: "'Nduja, spicy salami, hot honey, fior di latte, oregano.",
        price: "$22",
        category: "pizza",
        dietary: ["spicy"],
        image: `${IMG}/menu/spicy-calabrese.webp`,
        alt: "Calabrese pizza with 'nduja and hot honey.",
      },
      {
        id: "prosciutto-burrata",
        name: "Prosciutto & Burrata",
        description: "24-month prosciutto, burrata, rocket, aged balsamic.",
        price: "$25",
        category: "pizza",
        image: `${IMG}/menu/prosciutto-burrata.webp`,
        alt: "Pizza topped with prosciutto, burrata and rocket.",
      },

      /* --- Pasta --------------------------------------------------------- */
      {
        id: "truffle-tagliatelle",
        name: "Truffle Tagliatelle",
        description: "Hand-cut pasta, black truffle, parmesan cream, shaved truffle.",
        price: "$24",
        category: "pasta",
        dietary: ["vegetarian"],
        popular: true,
        featured: true,
        image: `${IMG}/menu/truffle-tagliatelle.jpg`,
        alt: "Hand-cut tagliatelle with shaved black truffle.",
      },
      {
        id: "spicy-arrabbiata",
        name: "Penne all'Arrabbiata",
        description: "San Marzano tomato, calabrian chilli, garlic, basil.",
        price: "$19",
        category: "pasta",
        dietary: ["vegan", "spicy"],
        image: `${IMG}/menu/spicy-arrabbiata.webp`,
        alt: "Arrabbiata pasta in a chilli tomato sauce with basil.",
      },
      {
        id: "lobster-linguine",
        name: "Lobster Linguine",
        description: "Native lobster, brandy bisque, chilli, chive.",
        price: "$34",
        category: "pasta",
        dietary: ["spicy"],
        image: `${IMG}/menu/lobster-linguine.webp`,
        alt: "Linguine with lobster in a brandy bisque.",
      },
      {
        id: "creamy-mushroom-penne",
        name: "Penne ai Funghi",
        description: "Pan-roasted mushrooms, parmesan cream, chilli flakes, parsley.",
        price: "$22",
        category: "pasta",
        dietary: ["vegetarian"],
        image: `${IMG}/menu/creamy-mushroom-penne.webp`,
        alt: "Penne in a creamy parmesan sauce with roasted mushrooms.",
      },

      /* --- Grill --------------------------------------------------------- */
      {
        id: "fire-roasted-ribeye",
        name: "Fire-Roasted Ribeye",
        description: "Dry-aged, open flame, smoked shallot butter, seasonal vegetables.",
        price: "$42",
        category: "grill",
        dietary: ["gluten-free"],
        popular: true,
        featured: true,
        // Still used by the signature dishes section; the menu row shows the video.
        image: `${IMG}/menu/fire-roasted-ribeye.webp`,
        video: "/video/gemini_generated_video_cf10333e.mp4",
        alt: "Sliced fire-roasted ribeye with smoked shallot butter.",
      },
      {
        id: "dry-aged-striploin",
        name: "Dry-Aged Striploin",
        description: "45-day aged, smoked salt, charred onion, red wine jus.",
        price: "$46",
        category: "grill",
        dietary: ["gluten-free"],
        popular: true,
        image: `${IMG}/menu/dry-aged-striploin.webp`,
        alt: "Dry-aged striploin steak carved over charred onion.",
      },
      {
        id: "grilled-lamb-chops",
        name: "Grilled Lamb Chops",
        description: "Rosemary marinade, burnt aubergine, mint, pomegranate.",
        price: "$38",
        category: "grill",
        dietary: ["gluten-free"],
        image: `${IMG}/menu/grilled-lamb-chops.webp`,
        alt: "Grilled lamb chops with burnt aubergine.",
      },
      {
        id: "ember-smash-burger",
        name: "Ember Grill Burger",
        description: "Flame-grilled beef, aged provolone, pickles, red onion, focaccia bun, fries.",
        price: "$24",
        category: "grill",
        popular: true,
        image: `${IMG}/menu/ember-smash-burger.webp`,
        alt: "Flame-grilled cheeseburger with melted cheese, lettuce, tomato and red onion, fries alongside.",
      },

      /* --- Main Course --------------------------------------------------- */
      {
        id: "herb-crusted-salmon",
        name: "Herb-Crusted Salmon",
        description: "Brown butter, fennel, preserved lemon, dill oil.",
        price: "$32",
        category: "mains",
        dietary: ["gluten-free"],
        image: `${IMG}/menu/herb-crusted-salmon.png`,
        alt: "Herb-crusted salmon fillet with fennel.",
      },
      {
        id: "wild-mushroom-risotto",
        name: "Wild Mushroom Risotto",
        description: "Arborio rice, wild mushrooms, aged parmesan, thyme, roasted garlic.",
        price: "$26",
        category: "mains",
        dietary: ["vegetarian", "gluten-free"],
        featured: true,
        image: `${IMG}/menu/wild-mushroom-risotto.webp`,
        alt: "Creamy wild mushroom risotto topped with parmesan.",
      },
      {
        id: "ember-chicken-supreme",
        name: "Pollo alla Brace",
        description: "Chargrilled corn-fed chicken, whipped garlic mash, roasted vegetables, pepper cream.",
        price: "$28",
        category: "mains",
        dietary: ["gluten-free"],
        image: `${IMG}/menu/ember-chicken-supreme.webp`,
        alt: "Chargrilled chicken breast with garlic mash and roasted vegetables.",
      },
      {
        id: "lemon-herb-grilled-chicken",
        name: "Lemon & Rosemary Chicken",
        description: "Twice-marinated breast, charred seasonal vegetables, grilled lemon.",
        price: "$27",
        category: "mains",
        dietary: ["gluten-free"],
        image: `${IMG}/menu/lemon-herb-grilled-chicken.webp`,
        alt: "Chargrilled chicken breasts with rosemary, lemon wedges and charred vegetables.",
      },

      /* --- Desserts ------------------------------------------------------ */
      {
        id: "pistachio-tiramisu",
        name: "Pistachio Tiramisu",
        description: "Sicilian pistachio, espresso, mascarpone, cocoa.",
        price: "$12",
        category: "desserts",
        dietary: ["vegetarian"],
        popular: true,
        featured: true,
        image: `${IMG}/menu/pistachio-tiramisu.webp`,
        alt: "Pistachio tiramisu dusted with cocoa.",
      },
      {
        id: "burnt-basque-cheesecake",
        name: "Burnt Basque Cheesecake",
        description: "Baked in the oak oven, vanilla, seasonal berry compote.",
        price: "$11",
        category: "desserts",
        dietary: ["vegetarian"],
        image: `${IMG}/menu/burnt-basque-cheesecake.webp`,
        alt: "Slice of burnt Basque cheesecake with berry compote.",
      },
      {
        id: "chocolate-layer-cake",
        name: "Dark Chocolate Torta",
        description: "Dark chocolate sponge, silky ganache, vanilla gelato, fresh strawberries.",
        price: "$12",
        category: "desserts",
        dietary: ["vegetarian"],
        image: `${IMG}/menu/chocolate-layer-cake.webp`,
        alt: "A slice of layered chocolate cake with ganache, vanilla gelato and strawberries.",
      },
      {
        id: "vanilla-creme-brulee",
        name: "Vanilla Crème Brûlée",
        description: "Tahitian vanilla, caramelised sugar crust.",
        price: "$10",
        category: "desserts",
        dietary: ["vegetarian", "gluten-free"],
        image: `${IMG}/menu/vanilla-creme-brulee.webp`,
        alt: "Crème brûlée with a cracked caramelised sugar crust.",
      },

      /* --- Drinks -------------------------------------------------------- */
      {
        id: "smoked-negroni",
        name: "Smoked Negroni",
        description: "Gin, campari, sweet vermouth, applewood smoke.",
        price: "$15",
        category: "drinks",
        popular: true,
        featured: true,
        image: `${IMG}/menu/smoked-negroni.webp`,
        alt: "Negroni served under a cloche of applewood smoke.",
      },
      {
        id: "ember-old-fashioned",
        name: "Ember Old Fashioned",
        description: "Rye, smoked demerara, charred orange, aromatic bitters.",
        price: "$16",
        category: "drinks",
        image: `${IMG}/menu/ember-old-fashioned.webp`,
        alt: "Old fashioned cocktail with a charred orange twist.",
      },
      {
        id: "limonata-della-casa",
        name: "Limonata della Casa",
        description: "Alcohol-free: Amalfi lemon, rosemary syrup, sparkling water.",
        price: "$8",
        category: "drinks",
        dietary: ["vegan", "gluten-free"],
      },
      {
        id: "house-cappuccino",
        name: "Cappuccino",
        description: "Double espresso, velvety steamed milk, a dusting of cocoa.",
        price: "$5",
        category: "drinks",
        dietary: ["vegetarian", "gluten-free"],
        image: `${IMG}/menu/house-cappuccino.jpg`,
        alt: "Cappuccino with latte art and a cocoa dusting.",
      },
    ],
  },

  experience: {
    eyebrow: "The Experience",
    heading: "More than a *meal.*",
    intro:
      "An intimate room where the oven glows, the grill crackles, and conversation comes together around the table.",
    paragraphs: [
      "At EMBER & SAGE, dinner unfolds slowly.",
      "The glow of the open kitchen, the crackle of the oak oven, the aroma of the grill and the rhythm of conversation become part of the meal.",
    ],
    closing: ["Come for the food.", "Stay for the atmosphere."],
    visual: {
      wide: `${IMG}/dishes/old-fashioned.png`,
      portrait: `${IMG}/dishes/old-fashioned.png`,
      alt: "An old fashioned with a flamed orange twist and a wisp of smoke, candles and decanters glowing across the bar.",
    },
    details: ["Oak oven", "Open grill", "Intimate tables", "Evening dining"],
    aside: {
      src: `${IMG}/dishes/lamb-chops.png`,
      alt: "Grilled lamb chops standing over roasted vegetables, a glass of red wine and candlelight behind.",
    },
    pillars: [
      {
        keyword: "Fire",
        title: "Open-Fire Cooking",
        description:
          "Watch pizza blister in the oak oven and steaks sear over embers — smoke, char and depth on every plate.",
        icon: "flame",
      },
      {
        keyword: "Seasonal",
        title: "Seasonal Ingredients",
        description: "The menu follows the Italian seasons, so each visit tastes a little different.",
        icon: "leaf",
      },
      {
        keyword: "Intimate",
        title: "Intimate Dining",
        description: "Warm lighting, thoughtful details, and a setting designed for lingering conversations.",
        icon: "users",
      },
      {
        keyword: "Hospitality",
        title: "Effortless Hospitality",
        description:
          "From the first welcome to the final course, every detail is designed to make you feel at home.",
        icon: "heart",
      },
    ],
  },

  gallery: {
    eyebrow: "Gallery",
    heading: "From our *kitchen.*",
    intro: "The plates, the pours and the fire behind them — straight from the pass to your table.",
    // Keep the total cell count a multiple of 4 (large = 4, wide/tall = 2, else 1).
    tiles: [
      {
        src: `${IMG}/dishes/burger.png`,
        video: `${IMG}/video/burger-assembly.mp4`,
        cropMark: true,
        caption: "Ember Grill Burger",
        alt: "A flame-grilled cheeseburger in a toasted bun.",
        size: "large",
      },
      {
        src: `${IMG}/dishes/truffle-burrata.png`,
        caption: "Truffle Burrata",
        alt: "Burrata under shaved black truffle with cherry tomatoes, rocket and toasted bread.",
      },
      {
        src: `${IMG}/dishes/lobster-linguine.png`,
        caption: "Lobster Linguine",
        alt: "Linguine in a rich bisque topped with a split lobster tail and herbs.",
        size: "tall",
      },
      {
        src: `${IMG}/dishes/fire-roasted-mushrooms.png`,
        caption: "Fire-Roasted Mushrooms",
        alt: "A plate of glossy fire-roasted wild mushrooms with thyme and parsley.",
      },
      {
        src: `${IMG}/dishes/salmon.png`,
        caption: "Herb-Crusted Salmon",
        alt: "Herb-crusted salmon fillet on a creamy purée with asparagus and grilled lemon.",
      },
      {
        src: `${IMG}/dishes/prosciutto-burrata-pizza.png`,
        caption: "Prosciutto & Burrata",
        alt: "Wood-fired pizza with prosciutto, a whole burrata, rocket and parmesan.",
        size: "wide",
      },
      {
        src: `${IMG}/dishes/tomato-bisque.png`,
        caption: "Roasted Tomato Soup",
        alt: "Roasted tomato soup swirled with cream, basil and roasted cherry tomatoes.",
      },
      {
        src: `${IMG}/dishes/margherita.png`,
        video: `${IMG}/video/margherita.mp4`,
        caption: "Margherita from the Oak Oven",
        alt: "A wood-fired margherita with a blistered crust, melted mozzarella and fresh basil.",
        size: "wide",
      },
      {
        src: `${IMG}/dishes/pistachio-tiramisu.png`,
        caption: "Pistachio Tiramisu",
        alt: "A layered slice of pistachio tiramisu covered in crushed pistachios.",
        size: "tall",
      },
      {
        src: `${IMG}/dishes/arrabbiata.png`,
        caption: "Penne all'Arrabbiata",
        alt: "Penne arrabbiata in a chilli tomato sauce with basil and parmesan.",
      },
      {
        src: `${IMG}/dishes/truffle-mushroom-pizza.png`,
        caption: "Truffle Mushroom Pizza",
        alt: "Pizza topped with wild mushrooms, truffle cream and shaved black truffle.",
      },
      {
        src: `${IMG}/dishes/burrata-garden-salad.png`,
        caption: "Burrata Garden Salad",
        alt: "Burrata on a garden salad of tomatoes, radish, rocket and toasted nuts.",
      },
      {
        src: `${IMG}/dishes/calabrese-pizza.png`,
        caption: "Diavola Calabrese",
        alt: "Wood-fired pizza with spicy salami, melted mozzarella and basil.",
      },
    ],
  },

  reviews: {
    eyebrow: "Guest Experiences",
    heading: "A table worth *remembering.*",
    intro: "A few words from guests who have shared an evening with us.",
    // `sample: true` — template reviews, shown only while `demo` is true.
    // Replace with real, attributable reviews, or leave the list empty to
    // hide the section.
    items: [
      {
        id: "daniel-r",
        author: "Daniel R.",
        rating: 5,
        quote: "An unforgettable evening from the first course to the final drink.",
        source: "Guest",
        date: "2026-08-22",
        featured: true,
        sample: true,
      },
      {
        id: "sofia-m",
        author: "Sofia M.",
        rating: 5,
        quote:
          "We came for my mother's birthday and the team made it feel effortless. The ribeye was cooked exactly as she asked, and someone had quietly added a candle to her dessert.",
        source: "Guest",
        date: "2026-09-06",
        occasion: "Birthday dinner",
        sample: true,
      },
      {
        id: "priya-k",
        author: "Priya K.",
        rating: 5,
        quote:
          "The margherita came out of the oak oven blistered and smoky, exactly like Naples. From most tables you can watch the kitchen working the fire.",
        source: "Guest",
        date: "2026-07-18",
        sample: true,
      },
      {
        id: "james-t",
        author: "James T.",
        rating: 4,
        quote:
          "Wonderful food in a lovely, dim room. It gets lively on a Saturday, so ask for a corner table if you want a quiet conversation.",
        source: "Guest",
        date: "2026-06-27",
        sample: true,
      },
      {
        id: "amelie-d",
        author: "Amélie D.",
        rating: 5,
        quote:
          "The Smoked Negroni alone is worth the visit. Service was warm without hovering, and nobody rushed us out after dessert.",
        source: "Guest",
        date: "2026-05-30",
        sample: true,
      },
      {
        id: "marcus-l",
        author: "Marcus L.",
        rating: 5,
        quote:
          "Our anniversary. The Truffle Tagliatelle and the Burnt Basque Cheesecake were the highlights — and the staff remembered we were celebrating without us having to remind them.",
        source: "Guest",
        date: "2026-04-11",
        occasion: "Anniversary",
        sample: true,
      },
    ],
  },

  visit: {
    eyebrow: "Visit Us",
    heading: "Come find your *table.*",
    intro:
      "In the heart of the city — questions, private dinners and special occasions are always welcome.",
  },
};
