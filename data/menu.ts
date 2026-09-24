/**
 * ============================================================================
 *  DEMO DATA — REPLACE WITH CLIENT INFORMATION
 * ============================================================================
 *  Every dish below is illustrative. Swap the array for the client's real menu
 *  and the section re-renders from it — no markup changes.
 *
 *  Images: a dish's `image` is any path under /public — every dish currently
 *  points at the client's uploaded photograph (see `photo` below). A dish
 *  whose file is missing shows a designed placeholder, so a missing file
 *  never breaks the layout.
 *
 *  `video` (optional) is a short muted loop played over the photograph while
 *  the card is on screen — never for reduced-motion or data-saver visitors.
 */

export type MenuCategoryId =
  | "starters"
  | "soups-salads"
  | "mains"
  | "pasta"
  | "pizza"
  | "grill"
  | "desserts"
  | "drinks";

export type DietaryTag = "vegetarian" | "vegan" | "gluten-free" | "spicy";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  /** Display string, so clients can set their own currency and formatting. */
  price: string;
  category: MenuCategoryId;
  /** Path under /public. */
  image: string;
  /** Describes the plated dish for screen readers and when the image fails. */
  alt: string;
  /** Optional short muted loop over the photograph. Path under /public. */
  video?: string;
  dietary?: DietaryTag[];
  /** Surfaces the "Chef's Favourite" badge. */
  popular?: boolean;
};

export const menuCategories: { id: MenuCategoryId; label: string }[] = [
  { id: "starters", label: "Starters" },
  { id: "soups-salads", label: "Soups & Salads" },
  { id: "mains", label: "Main Course" },
  { id: "pasta", label: "Pasta" },
  { id: "pizza", label: "Pizza" },
  { id: "grill", label: "Grill" },
  { id: "desserts", label: "Desserts" },
  { id: "drinks", label: "Drinks" },
];

/** Display labels for dietary tags — accessible text, never colour alone. */
export const dietaryLabels: Record<DietaryTag, string> = {
  vegetarian: "Vegetarian",
  vegan: "Vegan",
  "gluten-free": "Gluten-Free",
  spicy: "Spicy",
};

/**
 * The client's uploaded photography and clips in /public, under their
 * original file names. Shared with the signature, story, experience,
 * reservation, gallery and hero sections so each file is named in one place.
 */
export const photo = {
  burger: "/images/14406de5-c643-4665-8f0e-01a73ef68264.png",
  mushroomPenne: "/images/2521cb1c-609a-4350-9fa0-cbbff963d215.png",
  sushiPlatter: "/images/336b0149-341b-41f8-b6ed-16c58a67c638.png",
  cappuccino: "/images/3969f2c1-7701-4d7c-ac2b-2cfc4ec77ff7.png",
  grilledChickenVegetables: "/images/3dc75347-16ab-4f0b-9853-5c3199bbcc9b.png",
  fruitCoolers: "/images/41e21f55-0845-4988-beb1-5f1a514d957a.png",
  grilledChickenMash: "/images/9192ed37-9be8-41b7-8662-fd341652822e.png",
  chocolateCake: "/images/bb4e7c12-289f-4bf8-b3a8-9759abaca6da.png",
  margherita: "/images/d15fdbcd-c096-45a9-930c-d2003e5e552f.png",
  caesarSalad: "/images/d848960d-12f9-4c87-954d-a796acfde195.png",
  truffleBurrata: "/images/c709460a-7b06-4cf7-8297-d009078cab0c.png",
  charredOctopus: "/images/af5fd234-0ec4-47d2-99fd-c881c4a15590.png",
  fireRoastedMushrooms: "/images/c419693a-4607-42d5-8708-67a5148f0fe6.png",
  tomatoBisque: "/images/1660bb3b-86d0-4440-a639-9dcb077c9a80.png",
  burrataGardenSalad: "/images/1ac72e72-e545-43e6-9747-0da39c1034e7.png",
  seasonalGreens: "/images/2455e867-307e-4eec-8b2d-5c3624defcd4.png",
  ribeye: "/images/20e7e363-c291-4627-949c-486565e73118.png",
  salmon: "/images/0f09c255-f74b-4d28-8475-47ac2408d7c4.png",
  mushroomRisotto: "/images/d09ec9ec-18a0-4bb6-a5d7-3a61f334e0d2.png",
  truffleTagliatelle: "/images/ec47a16f-e247-4ecc-9761-cb9d4cce6dea.png",
  arrabbiata: "/images/fdd799de-e32c-44ad-a0da-dedaef10d707.png",
  lobsterLinguine: "/images/d3026c9c-5d73-42ef-8df0-427a820a3464.png",
  truffleMushroomPizza: "/images/da3793d6-abf2-4840-8586-caa90b8e4f97.png",
  calabresePizza: "/images/225322c2-4ce3-4c98-8e93-b651627d29eb.png",
  prosciuttoBurrataPizza: "/images/fd1305b1-6184-4e2a-afdb-d4568cfe061e.png",
  striploin: "/images/739e519d-098e-4b54-b783-8b111090d6a6.png",
  lambChops: "/images/df9494c9-f680-4125-8fdf-45c6aa69d853.png",
  basqueCheesecake: "/images/b43b1470-93b2-4b5e-b248-a31ef26472f9.png",
  cremeBrulee: "/images/d9f7684f-6e92-4542-8c2e-3a089b63e85a.png",
  pistachioTiramisu: "/images/b45218d9-c453-4dcd-947a-23f91c82874a.png",
  oldFashioned: "/images/437f1ab3-df9f-45be-b93d-a881cac06e70.png",
  smokedNegroni: "/images/36311af5-0314-4b17-bec1-15130d561f18.png",
} as const;

export const clip = {
  /** 960×960, 2 s — the margherita, gently animated. */
  margherita: "/images/1.mp4",
  /** 1200×800, 2 s — sushi platter transitioning to a wood-fired pizza. */
  sushiToPizza: "/images/2.mp4",
  /** 1056×880, 2 s — the Caesar salad, gently animated. */
  caesarSalad: "/images/3.mp4",
  /** 1280×720, 10 s — a cheeseburger assembling in slow motion. */
  burgerAssembly: "/video/gemini_generated_video_1506444a.mp4",
  /** 1280×720, 10 s — the burger, then a molten chocolate cake. File name
      has a space: renderers URL-encode it, existsSync checks it as is. */
  burgerToChocolate: "/video/2 (2).mp4",
} as const;

/**
 * Menu-card photography in /public/images/menu, one file per dish named by
 * its `id`. Used by the menu cards only — the other sections keep `photo`.
 * The margherita has no menu-card photo yet and still uses `photo`.
 */
export const menuPhoto = {
  truffleBurrata: "/images/menu/truffle-burrata.jpg",
  charredOctopus: "/images/menu/charred-octopus.jpg",
  sushiPlatter: "/images/menu/chefs-sushi-platter.jpg",
  fireRoastedMushrooms: "/images/menu/fire-roasted-mushrooms.jpg",
  tomatoBisque: "/images/menu/roasted-tomato-bisque.jpg",
  burrataGardenSalad: "/images/menu/burrata-garden-salad.jpg",
  caesarSalad: "/images/menu/classic-caesar-salad.jpg",
  seasonalGreens: "/images/menu/seasonal-greens.jpg",
  ribeye: "/images/menu/fire-roasted-ribeye.webp",
  salmon: "/images/menu/herb-crusted-salmon.png",
  mushroomRisotto: "/images/menu/wild-mushroom-risotto.webp",
  grilledChickenMash: "/images/menu/ember-chicken-supreme.webp",
  truffleTagliatelle: "/images/menu/truffle-tagliatelle.jpg",
  arrabbiata: "/images/menu/spicy-arrabbiata.webp",
  lobsterLinguine: "/images/menu/lobster-linguine.webp",
  mushroomPenne: "/images/menu/creamy-mushroom-penne.webp",
  truffleMushroomPizza: "/images/menu/truffle-mushroom-pizza.webp",
  calabresePizza: "/images/menu/spicy-calabrese.webp",
  prosciuttoBurrataPizza: "/images/menu/prosciutto-burrata.webp",
  striploin: "/images/menu/dry-aged-striploin.webp",
  lambChops: "/images/menu/grilled-lamb-chops.webp",
  burger: "/images/menu/ember-smash-burger.webp",
  grilledChickenVegetables: "/images/menu/lemon-herb-grilled-chicken.webp",
  chocolateCake: "/images/menu/chocolate-layer-cake.webp",
  basqueCheesecake: "/images/menu/burnt-basque-cheesecake.webp",
  cremeBrulee: "/images/menu/vanilla-creme-brulee.webp",
  pistachioTiramisu: "/images/menu/pistachio-tiramisu.webp",
  oldFashioned: "/images/menu/ember-old-fashioned.webp",
  smokedNegroni: "/images/menu/smoked-negroni.webp",
  fruitCoolers: "/images/menu/garden-fruit-coolers.webp",
  cappuccino: "/images/menu/house-cappuccino.jpg",
} as const;

// DEMO DATA — REPLACE WITH CLIENT INFORMATION
export const menuItems: MenuItem[] = [
  /* --- Starters --------------------------------------------------------- */
  {
    id: "truffle-burrata",
    name: "Truffle Burrata",
    description:
      "Creamy burrata, shaved black truffle, heirloom tomatoes, basil oil.",
    price: "$18",
    category: "starters",
    image: menuPhoto.truffleBurrata,
    alt: "Burrata with shaved black truffle and heirloom tomatoes.",
    dietary: ["vegetarian", "gluten-free"],
    popular: true,
  },
  {
    id: "charred-octopus",
    name: "Charred Octopus",
    description:
      "Smoked paprika, lemon, garden herbs, ember-roasted vegetables.",
    price: "$21",
    category: "starters",
    image: menuPhoto.charredOctopus,
    alt: "Charred octopus over ember-roasted vegetables.",
    dietary: ["gluten-free"],
  },
  {
    id: "chefs-sushi-platter",
    name: "Chef's Sushi Platter",
    description:
      "Salmon and tuna nigiri, tiger prawn, dragon and signature rolls, wasabi, pickled ginger. To share.",
    price: "$28",
    category: "starters",
    image: menuPhoto.sushiPlatter,
    alt: "A dark stone platter of salmon, tuna and prawn nigiri with glazed and tobiko-topped rolls, wasabi and pickled ginger.",
  },
  {
    id: "fire-roasted-mushrooms",
    name: "Fire-Roasted Mushrooms",
    description: "Wild mushrooms, garlic butter, thyme, grilled sourdough.",
    price: "$14",
    category: "starters",
    image: menuPhoto.fireRoastedMushrooms,
    alt: "Fire-roasted wild mushrooms with grilled sourdough.",
    dietary: ["vegetarian"],
  },

  /* --- Soups & Salads --------------------------------------------------- */
  {
    id: "roasted-tomato-bisque",
    name: "Roasted Tomato Bisque",
    description: "Slow-roasted tomato, smoked cream, basil, sourdough crumb.",
    price: "$12",
    category: "soups-salads",
    image: menuPhoto.tomatoBisque,
    alt: "Bowl of roasted tomato bisque finished with cream.",
    dietary: ["vegetarian"],
  },
  {
    id: "burrata-garden-salad",
    name: "Burrata Garden Salad",
    description: "Stone fruit, rocket, aged balsamic, toasted hazelnut.",
    price: "$15",
    category: "soups-salads",
    image: menuPhoto.burrataGardenSalad,
    alt: "Garden salad with burrata, stone fruit and rocket.",
    dietary: ["vegetarian", "gluten-free"],
  },
  {
    id: "classic-caesar-salad",
    name: "Classic Caesar Salad",
    description:
      "Crisp romaine, garlic-toasted croutons, shaved parmesan, creamy Caesar dressing.",
    price: "$14",
    category: "soups-salads",
    image: menuPhoto.caesarSalad,
    video: clip.caesarSalad,
    alt: "Romaine Caesar salad with golden croutons, parmesan shavings and creamy dressing in a speckled bowl.",
  },
  {
    id: "seasonal-greens",
    name: "Seasonal Greens",
    description: "Market leaves, citrus vinaigrette, herbs, toasted seeds.",
    price: "$13",
    category: "soups-salads",
    image: menuPhoto.seasonalGreens,
    alt: "Bowl of seasonal market greens with toasted seeds.",
    dietary: ["vegan", "gluten-free"],
  },

  /* --- Main Course ------------------------------------------------------ */
  {
    id: "fire-roasted-ribeye",
    name: "Fire-Roasted Ribeye",
    description:
      "Dry-aged, open flame, smoked shallot butter, seasonal vegetables.",
    price: "$42",
    category: "mains",
    image: menuPhoto.ribeye,
    alt: "Sliced fire-roasted ribeye with smoked shallot butter.",
    dietary: ["gluten-free"],
    popular: true,
  },
  {
    id: "herb-crusted-salmon",
    name: "Herb-Crusted Salmon",
    description: "Brown butter, fennel, preserved lemon, dill oil.",
    price: "$32",
    category: "mains",
    image: menuPhoto.salmon,
    alt: "Herb-crusted salmon fillet with fennel.",
    dietary: ["gluten-free"],
  },
  {
    id: "wild-mushroom-risotto",
    name: "Wild Mushroom Risotto",
    description: "Arborio rice, wild mushrooms, aged parmesan, thyme, roasted garlic.",
    price: "$26",
    category: "mains",
    image: menuPhoto.mushroomRisotto,
    alt: "Creamy wild mushroom risotto topped with parmesan.",
    dietary: ["vegetarian", "gluten-free"],
  },
  {
    id: "ember-chicken-supreme",
    name: "Ember Chicken Supreme",
    description:
      "Chargrilled corn-fed breast, whipped garlic mash, roasted vegetables, pepper cream.",
    price: "$28",
    category: "mains",
    image: menuPhoto.grilledChickenMash,
    alt: "Chargrilled chicken breast with garlic mash, roasted broccoli and peppers, lemon and a pot of pepper cream.",
    dietary: ["gluten-free"],
  },

  /* --- Pasta ------------------------------------------------------------ */
  {
    id: "truffle-tagliatelle",
    name: "Truffle Tagliatelle",
    description: "Hand-cut pasta, black truffle, parmesan cream, shaved truffle.",
    price: "$24",
    category: "pasta",
    image: menuPhoto.truffleTagliatelle,
    alt: "Hand-cut tagliatelle with shaved black truffle.",
    dietary: ["vegetarian"],
    popular: true,
  },
  {
    id: "spicy-arrabbiata",
    name: "Spicy Arrabbiata",
    description: "San Marzano tomato, calabrian chilli, garlic, basil.",
    price: "$19",
    category: "pasta",
    image: menuPhoto.arrabbiata,
    alt: "Arrabbiata pasta in a chilli tomato sauce with basil.",
    dietary: ["vegan", "spicy"],
  },
  {
    id: "lobster-linguine",
    name: "Lobster Linguine",
    description: "Native lobster, brandy bisque, chilli, chive.",
    price: "$34",
    category: "pasta",
    image: menuPhoto.lobsterLinguine,
    alt: "Linguine with lobster in a brandy bisque.",
    dietary: ["spicy"],
  },
  {
    id: "creamy-mushroom-penne",
    name: "Creamy Mushroom Penne",
    description:
      "Penne, pan-roasted mushrooms, parmesan cream, chilli flakes, parsley.",
    price: "$22",
    category: "pasta",
    image: menuPhoto.mushroomPenne,
    alt: "Penne in a creamy parmesan sauce with roasted mushrooms, chilli flakes and parsley.",
    dietary: ["vegetarian"],
  },

  /* --- Pizza ------------------------------------------------------------ */
  {
    id: "ember-margherita",
    name: "Ember Margherita",
    description: "San Marzano, fior di latte, basil, cold-pressed olive oil.",
    price: "$18",
    category: "pizza",
    image: photo.margherita,
    video: clip.margherita,
    alt: "Wood-fired margherita with a blistered crust, melted mozzarella and fresh basil on a wooden board.",
    dietary: ["vegetarian"],
  },
  {
    id: "truffle-mushroom-pizza",
    name: "Truffle Mushroom Pizza",
    description: "Wild mushroom, taleggio, truffle cream, thyme.",
    price: "$24",
    category: "pizza",
    image: menuPhoto.truffleMushroomPizza,
    alt: "Truffle and wild mushroom pizza with taleggio.",
    dietary: ["vegetarian"],
    popular: true,
  },
  {
    id: "spicy-calabrese",
    name: "Spicy Calabrese",
    description: "'Nduja, hot honey, fior di latte, oregano.",
    price: "$22",
    category: "pizza",
    image: menuPhoto.calabresePizza,
    alt: "Calabrese pizza with 'nduja and hot honey.",
    dietary: ["spicy"],
  },
  {
    id: "prosciutto-burrata",
    name: "Prosciutto & Burrata",
    description: "24-month prosciutto, burrata, rocket, aged balsamic.",
    price: "$25",
    category: "pizza",
    image: menuPhoto.prosciuttoBurrataPizza,
    alt: "Pizza topped with prosciutto, burrata and rocket.",
  },

  /* --- Grill ------------------------------------------------------------ */
  {
    id: "dry-aged-striploin",
    name: "Dry-Aged Striploin",
    description: "45-day aged, smoked salt, charred onion, red wine jus.",
    price: "$46",
    category: "grill",
    image: menuPhoto.striploin,
    alt: "Dry-aged striploin steak carved over charred onion.",
    dietary: ["gluten-free"],
    popular: true,
  },
  {
    id: "grilled-lamb-chops",
    name: "Grilled Lamb Chops",
    description: "Herb marinade, burnt aubergine, mint, pomegranate.",
    price: "$38",
    category: "grill",
    image: menuPhoto.lambChops,
    alt: "Grilled lamb chops with burnt aubergine.",
    dietary: ["gluten-free"],
  },
  {
    id: "ember-smash-burger",
    name: "Ember Smash Burger",
    description:
      "Flame-grilled beef, aged cheddar, pickles, red onion, toasted brioche, fries.",
    price: "$24",
    category: "grill",
    image: menuPhoto.burger,
    alt: "Flame-grilled cheeseburger with melted cheddar, lettuce, tomato and red onion in a sesame brioche, fries alongside.",
    popular: true,
  },
  {
    id: "lemon-herb-grilled-chicken",
    name: "Lemon & Herb Grilled Chicken",
    description:
      "Twice-marinated breast, charred seasonal vegetables, grilled lemon, rosemary.",
    price: "$27",
    category: "grill",
    image: menuPhoto.grilledChickenVegetables,
    alt: "Two chargrilled chicken breasts with rosemary, lemon wedges and charred tomatoes, peppers, courgette and broccoli.",
    dietary: ["gluten-free"],
  },

  /* --- Desserts --------------------------------------------------------- */
  {
    id: "chocolate-layer-cake",
    name: "Dark Chocolate Layer Cake",
    description:
      "Dark chocolate sponge, silky ganache, vanilla ice cream, fresh strawberries.",
    price: "$12",
    category: "desserts",
    image: menuPhoto.chocolateCake,
    alt: "A tall slice of layered chocolate cake with glossy ganache, chocolate shards, vanilla ice cream and strawberries.",
    dietary: ["vegetarian"],
    popular: true,
  },
  {
    id: "burnt-basque-cheesecake",
    name: "Burnt Basque Cheesecake",
    description: "Caramelised top, vanilla, seasonal berry compote.",
    price: "$11",
    category: "desserts",
    image: menuPhoto.basqueCheesecake,
    alt: "Slice of burnt Basque cheesecake with berry compote.",
    dietary: ["vegetarian"],
  },
  {
    id: "vanilla-creme-brulee",
    name: "Vanilla Crème Brûlée",
    description: "Tahitian vanilla, caramelised sugar crust.",
    price: "$10",
    category: "desserts",
    image: menuPhoto.cremeBrulee,
    alt: "Crème brûlée with a cracked caramelised sugar crust.",
    dietary: ["vegetarian", "gluten-free"],
  },
  {
    id: "pistachio-tiramisu",
    name: "Pistachio Tiramisu",
    description: "Sicilian pistachio, espresso, mascarpone, cocoa.",
    price: "$12",
    category: "desserts",
    image: menuPhoto.pistachioTiramisu,
    alt: "Pistachio tiramisu dusted with cocoa.",
    dietary: ["vegetarian"],
  },

  /* --- Drinks ----------------------------------------------------------- */
  {
    id: "ember-old-fashioned",
    name: "Signature Ember Old Fashioned",
    description: "Rye, smoked demerara, charred orange, aromatic bitters.",
    price: "$16",
    category: "drinks",
    image: menuPhoto.oldFashioned,
    alt: "Old fashioned cocktail with a charred orange twist.",
    popular: true,
  },
  {
    id: "smoked-negroni",
    name: "Smoked Negroni",
    description: "Gin, campari, sweet vermouth, applewood smoke.",
    price: "$15",
    category: "drinks",
    image: menuPhoto.smokedNegroni,
    alt: "Negroni served under a cloche of applewood smoke.",
  },
  {
    id: "garden-fruit-coolers",
    name: "Garden Fruit Coolers",
    description:
      "Alcohol-free: lime & mint, summer berry, passion fruit & mango, blue citrus.",
    price: "$9",
    category: "drinks",
    image: menuPhoto.fruitCoolers,
    alt: "Four iced coolers — lime and mint, berry, passion fruit and blue citrus — with fresh fruit and mint.",
    dietary: ["vegan", "gluten-free"],
  },
  {
    id: "house-cappuccino",
    name: "House Cappuccino",
    description: "Double espresso, velvety steamed milk, a dusting of cocoa.",
    price: "$5",
    category: "drinks",
    image: menuPhoto.cappuccino,
    alt: "Cappuccino with leaf latte art and cocoa dusting in a speckled cup, coffee beans on the saucer.",
    dietary: ["vegetarian", "gluten-free"],
  },
];
