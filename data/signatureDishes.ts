/**
 * ============================================================================
 *  DEMO DATA — REPLACE WITH CLIENT INFORMATION
 * ============================================================================
 *  The dishes the Signature section showcases, in display order. The FIRST
 *  entry is the featured dish and gets the large treatment; the section is
 *  composed for six in total (one featured + five), and works with 4–6.
 *
 *  Each entry points at a dish in data/menu.ts by `id`. Name, price and
 *  category are read from there, so the two sections can never disagree on
 *  what a dish costs or is called — change the price once, in the menu.
 *  Only the presentation lives here: the label, the longer editorial
 *  description and the portrait photograph.
 *
 *  Images: any path under /public, cropped to portrait 4:5. The entries below
 *  use the client's uploaded photography (see `photo` in data/menu.ts). A
 *  missing file falls back to the dish's menu photo, then to a designed
 *  placeholder — see public/images/signature/README.md.
 */

import { photo } from "./menu";

export type SignatureDish = {
  /** The dish's `id` in data/menu.ts. Must exist — the build fails otherwise. */
  id: string;
  /** Small uppercase line above the name, e.g. "Chef's Signature". */
  label: string;
  /** Editorial description; longer and more evocative than the menu line. */
  description: string;
  /** Portrait photograph, path under /public. */
  image: string;
  /** Describes this photograph. Falls back to the menu item's alt text. */
  alt?: string;
  /** Optional short muted loop over the photograph. Falls back to the menu's. */
  video?: string;
};

// DEMO DATA — REPLACE WITH CLIENT INFORMATION
export const signatureDishes: SignatureDish[] = [
  {
    id: "fire-roasted-ribeye",
    label: "Chef's Signature",
    description:
      "Dry-aged ribeye finished over open flame with smoked shallot butter and seasonal vegetables.",
    image: photo.ribeye,
    alt: "Thick slices of bone-in ribeye, pink at the centre, with roasted potatoes, asparagus and charred tomatoes by candlelight.",
  },
  {
    id: "truffle-tagliatelle",
    label: "Signature",
    description:
      "Hand-cut tagliatelle, black truffle, parmesan cream, and freshly shaved truffle.",
    image: photo.truffleTagliatelle,
    alt: "A dark bowl of tagliatelle in parmesan cream, heaped with shaved black truffle.",
  },
  {
    id: "charred-octopus",
    label: "From the Ember",
    description:
      "Tender charred octopus with smoked paprika, lemon, herbs, and ember-roasted vegetables.",
    image: photo.charredOctopus,
    alt: "Charred octopus tentacles over a smooth purée with blistered tomatoes, herbs and a grilled lemon half.",
  },
  {
    id: "wild-mushroom-risotto",
    label: "Chef's Favourite",
    description:
      "Creamy arborio rice, wild mushrooms, aged parmesan, thyme, and roasted garlic.",
    image: photo.mushroomRisotto,
    alt: "Creamy risotto topped with seared wild mushrooms, herbs and shaved parmesan.",
  },
  {
    id: "burnt-basque-cheesecake",
    label: "Signature",
    description:
      "Silky Basque cheesecake with a deeply caramelised exterior and seasonal berry compote.",
    image: photo.basqueCheesecake,
    alt: "A burnt Basque cheesecake with a slice cut away, its dark caramelised top beside fresh berries.",
  },
  {
    id: "smoked-negroni",
    label: "House Signature",
    description:
      "A classic Negroni reimagined with subtle smoke, bitter orange, and aromatic botanicals.",
    image: photo.smokedNegroni,
    alt: "A Negroni over a large ice cube with an orange twist, applewood smoke spilling from a lifted glass cloche.",
  },
];
