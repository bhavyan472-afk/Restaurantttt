# EMBER & SAGE — restaurant website template

Next.js 16 (App Router) · React 19 · TypeScript · Motion (`motion/react`) · plain CSS design tokens.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck
```

## Reusing this as a template

Every client-specific value lives in `data/` and is marked **DEMO DATA — REPLACE WITH CLIENT INFORMATION**:

| File | Contents |
| --- | --- |
| `data/restaurant.ts` | name, tagline, contact (`phone` + `phoneDisplay`), `siteUrl`, `location` (incl. optional `mapEmbedUrl`, `transport`, `parking`, `accessibility`), `openingHours`, `socialLinks`, `socialLinksAreDemo`, `restaurantDataIsDemo` |
| `data/location.ts` | Location section wording only — its facts come from `data/restaurant.ts` |
| `data/contact.ts` | Contact section wording: headings, form labels, topics, hospitality note, CTAs, success copy — its facts come from `data/restaurant.ts` |
| `data/menu.ts` | `menuCategories`, `menuItems` (32 demo dishes across 8 categories) |
| `data/voiceAssistant.ts` | Voice assistant wording: entry-point copy, state lines, demo note |
| `data/chatbot.ts` | AI Concierge wording: welcome, fallback, quick questions, status line. Its knowledge comes from the other data files |
| `data/reservations.ts` | `reservationConfig` (guests, seating length, lead time, slots, closed dates, demo availability) and section copy. Hours come from `openingHours` |
| `data/experience.ts` | Experience section copy, art-directed images, detail labels, four pillars and CTA |
| `data/story.ts` | Story section copy, images, principles and CTA (demo copy, not a real history) |
| `data/signatureDishes.ts` | `signatureDishes` — which menu dishes to showcase, with label, editorial copy and portrait image |
| `data/reviews.ts` | `reviews`, `ratingSummary`, `reviewsCopy`, `reviewsAreDemo` — all demo; replace with real, attributable reviews before launch |
| `data/navigation.ts` | `navLinks` — the nav items and their section anchors; `footerLinks` — the footer's Explore list |
| `data/footer.ts` | Footer wording: statement, CTA, group labels, backdrop word, legal links (placeholders until the pages exist) |
| `data/hero.ts` | `heroContent` (copy, CTAs) and `heroMedia` (poster, video paths) |

SEO metadata, JSON-LD, robots, sitemap and the Open Graph card are all generated from this data.

## Structure

```
app/            routes, layout (fonts, metadata, JSON-LD), globals.css (design system)
components/ui/  Button, Reveal, ImageFrame, MotionProvider  (shared primitives)
components/<Section>/   empty until its build step (Navbar, Hero, Menu, …)
data/           client content          lib/  animations, utils, seo
public/images, public/video
```

`/design-system` is a noindexed reference page for tokens, type, buttons and motion.

## Conventions

- **CSS order**: `app/globals.css` is the first import in `app/layout.tsx`, so
  every CSS module loads after it and a module class can refine a global one
  of equal specificity (e.g. `label` + `styles.eyebrow`). Keep it first.
- **Tokens** in `:root` of `app/globals.css` (`--background`, `--foreground`, `--muted`, `--accent`, `--border`, spacing, type, motion). Dark theme only.
- **Type**: Cormorant Garamond (display) + Manrope (body). Classes `.text-hero`, `.text-section`, `.text-sub`, `.text-body-lg`, `.text-body`, `.label`. Pick the heading *element* for structure, the *class* for looks.
- **Layout**: `.container`, `.section`, `.stack`, `.cluster`. Breakpoints: 768 / 1024 / 1440 (min-width), mobile-first.
- **Motion**: `<Reveal variant="fadeUp" delay={0.1}>` — variants `fadeUp | fadeIn | imageReveal | headingReveal | scaleReveal | slideInLeft | slideInRight` in `lib/animations.ts` (see the Motion section below). Only transform/opacity/clip-path. Reduced motion is honoured in JS (`MotionConfig`) and CSS. Animate key elements only.
- **Images**: use `<ImageFrame src alt sizes ratio />` (fixed aspect ratio → no layout shift, lazy by default). Set `priority` on the one LCP image only.
- **Video** (later steps): `muted loop playsInline preload="metadata"` with a `poster`, compressed MP4 (H.264) + WebM, under ~3 MB for hero loops.
- **Buttons are themeable** via custom properties, so a placement can restyle one without new CSS: `--btn-radius`, `--btn-min-h`, `--btn-pad`, `--btn-font-size`, `--btn-tracking`. Set them on an ancestor — `.btn` in `globals.css` has the same specificity as a CSS-module class and wins on source order, so overriding a real property (`display`, `font-size`) from a module will not apply.

## Motion & interactions

One library (`motion/react`, via `LazyMotion` + `MotionConfig reducedMotion="user"`)
plus CSS transitions. Timing guide at the top of `lib/animations.ts`.

- **Page load**: navbar settles in (CSS `navIn`), then the hero's staged
  entrance (label → masked heading lines → copy → CTAs → scroll cue).
- **Section headings**: `variant="headingReveal"` — the text rises as a
  mask opens; one unsplit text node, so screen readers read it whole.
  Eyebrow → heading → intro stagger by 0.1s.
- **Hero scroll-out**: media pushes in (`HeroMedia`), the copy drifts down
  and dims, the scroll cue fades (`HeroContent`).
- **Parallax**: `lib/useScrollParallax.ts` — ≥1024px, fine pointer, no
  reduced motion; motion values, no re-renders.
- **Magnetic CTA**: `components/ui/Magnetic.tsx` wraps the hero and footer
  Reserve buttons only; ≤5px via the CSS `translate` property; desktop mouse
  only.
- **Cursor halo**: `components/ui/CursorHalo.tsx` — a ring that trails the
  system cursor (never replaces it); opens over controls, hides over text
  fields and dialogs; not rendered on touch or under reduced motion.
- **Hover language**: arrows move 5px while labels lean back 2px (`.btn`);
  images scale ≤1.03; menu card names lean in while price and description
  stay still. Hover is always decoration, never the only way to reach content.
- **Forms**: focused labels turn ember; errors ease in (no shake) with a
  faint terracotta wash on the field.
- **Reduced motion**: global CSS rule kills CSS animation/transition
  durations; `MotionConfig` strips JS transforms; `[data-reveal-clip]`
  drops mask wipes to fades; parallax, magnetic, hero drift and the cursor
  are off.

## Navigation

`components/Navbar/` — `Navbar.tsx` (fixed bar) and `MobileMenu.tsx` (full-screen overlay), sharing `navbar.module.css`. Rendered once in `app/layout.tsx`.

- **Adding a section**: add it to `data/navigation.ts` and give the section that `id`. Links and active-state tracking pick it up automatically; targets that don't exist yet are skipped rather than erroring.
- **Anchor offset**: `--nav-h` feeds `scroll-padding-top`, so anchored sections never land under the bar. Pages that aren't full-bleed under the navbar use `className="nav-offset"` on `<main>`.
- **No scroll listeners**: the scrolled state comes from an IntersectionObserver on a sentinel at the document top; active section from `lib/useActiveSection.ts`.
- The bar is transparent at the top and sits over the hero video — it never assumes a light background.

## Hero

`components/Hero/` — `Hero.tsx` (server), `HeroMedia.tsx` (background), `HeroContent.tsx` (copy), `hero.module.css`.
Layers back to front: **video → poster → scrim → vignette → content**.

- **Adding the video**: drop the files into `public/video/` using the names in
  [its README](public/video/README.md) and rebuild. `Hero.tsx` checks which exist
  **at build time**, so a video that hasn't been supplied is never referenced —
  no 404, no broken media element, and the poster carries the section alone.
- **Poster** `public/images/hero-poster.webp` is generated, not photographic.
  Replace it with a real frame from the video. It is the LCP image and is
  priority-loaded.
- **Copy** lives in `data/hero.ts`. `headingLines` is one entry per rendered line —
  each animates separately, so the line break is a design decision, not wrapping.
- **Reduced motion**: the video is never downloaded, parallax is off, and the
  entrance keeps its fades but drops the movement.
- `<source>` elements are attached after mount, so only one encode is fetched and
  the video stays off the critical path.

## Menu

`components/Menu/` — `Menu.tsx` (server shell), `MenuHeader.tsx` (server),
`MenuBrowser.tsx` (owns the selected category), `MenuCategories.tsx`,
`MenuGrid.tsx`, `MenuCard.tsx`, `MenuBadge.tsx`, `menu.module.css`.

- **Editing the menu**: `data/menu.ts` only. Categories come from
  `menuCategories`, dishes from `menuItems`; the grid, tabs and counts all
  follow. Nothing about a dish is written into markup.
- **Photography**: `public/images/menu/<id>.webp`, resolved at build time the
  same way the hero video is — see [that folder's README](public/images/menu/README.md).
  Dishes without a photo get a designed placeholder, so partial photography
  still looks deliberate.
- **Categories are a real ARIA tablist** with roving tabindex and Arrow/Home/End
  keys, so the eight of them cost one Tab stop.
- **Switching** re-keys the grid inside `AnimatePresence` in `popLayout` mode,
  which keeps the outgoing cards out of flow — without it the panel collapses
  for a frame and shoves the rest of the page upward.
- Dietary information is always spelled out; colour is never the only signal.

## Signature Dishes

`components/SignatureDishes/` — `SignatureDishes.tsx` (server shell, header, CTA),
`SignatureDishFeatured.tsx`, `SignatureDishGrid.tsx`, `SignatureDishCard.tsx`,
`SignatureDishInfo.tsx` (shared text block), `SignatureMedia.tsx` (the only
client component: image, fallback, parallax), `signature.module.css`.
Anchor: `#signature-dishes`, placed after the Menu. It has no navbar item.

- **Editing**: `data/signatureDishes.ts`. The first entry is the featured dish;
  the layout is composed for six (works with 4–6). Each entry references a
  menu item by `id`, and **name, price and category come from `data/menu.ts`**,
  so the two sections cannot disagree. A bad `id` fails the build.
- **Photography**: `public/images/signature/`, portrait 4:5 — see
  [that folder's README](public/images/signature/README.md). Falls back to the
  dish's menu photo, then to a designed placeholder.
- **Parallax** runs only at ≥1024px with a fine pointer and no reduced-motion
  preference. It is a motion value driven from scroll: no re-renders. The
  logic is shared as `lib/useScrollParallax.ts`.

## Story

`components/Story/` — `Story.tsx` (server shell, resolves images), `StoryHeader.tsx`,
`StoryContent.tsx`, `StoryImage.tsx` (client: parallax, fallback), `StoryPrinciples.tsx`,
`StoryCTA.tsx`, `Emphasis.tsx`, `story.module.css`. Anchor `#story`, after
Signature Dishes; no navbar item. The CTA points at `#experience`.

- **Editing**: `data/story.ts` only. Wrap a word in `*asterisks*` to set it in
  the display italic (ember-coloured in the heading, cream in the story).
- **Photography**: `public/images/story/` — see [its README](public/images/story/README.md).
- **Motion**: the portrait uses the `imageReveal` curtain plus `useScrollParallax`.
  Under reduced motion the curtain is replaced by a fade (CSS override), since
  `MotionConfig` strips transforms but not clip-path.
- `*emphasis*` in content copy is rendered by `components/ui/Emphasis.tsx`,
  shared with Experience.

## Experience

`components/Experience/` — `Experience.tsx` (server shell, resolves images),
`ExperienceHeader.tsx`, `ExperienceVisual.tsx` (client: art-directed main image,
parallax), `ExperienceAside.tsx` (client), `ExperiencePillars.tsx`,
`ExperiencePillar.tsx`, `ExperienceIcon.tsx`, `ExperienceCTA.tsx`,
`experience.module.css`. Anchor `#experience` (navbar item; the Story CTA
lands here). The CTA points at `#reservations`.

- **Editing**: `data/experience.ts` only — copy, pillars (icon is one of
  `flame | leaf | users | heart`), detail labels and CTA.
- **Photography**: `public/images/experience/` — see [its README](public/images/experience/README.md).
  The main visual uses `getImageProps` + `<picture>` for a phone-specific photograph.
- **Icons** are inline SVG (Lucide paths) — there is no icon package.
- **Pillars** are plain content, not controls: the hover (arrow, ember rule,
  brighter title) is decoration and nothing is hidden without it.

## Reservations

> **Front-end demo.** Nothing is stored or sent. The confirmation card says so.

`components/Reservation/` — `Reservation.tsx` (server: heading, hours, image),
`ReservationForm.tsx` (client: state, validation, submit), `DateSelector.tsx`,
`TimeSelector.tsx`, `GuestSelector.tsx`, `Field.tsx`, `ReservationConfirmation.tsx`,
`ReservationImage.tsx`, `reservation.module.css`. Anchor `#reservations`
(navbar item, navbar/mobile/hero/Experience CTAs).

- **Rules** live in `lib/reservations.ts` (pure functions): the booking window,
  which slots a date offers, demo availability and every validation message.
  A slot is offered only if the whole seating (`reservationDurationMinutes`)
  fits inside that day's `openingHours`, and — today — starts at least
  `minLeadMinutes` from now. Dates are local `YYYY-MM-DD` strings throughout.
- **Going live**: replace the body of `submitReservation` in
  `lib/reservationService.ts` (booking provider, route handler, Supabase…).
  Keep the signature; throw an `Error` with a guest-readable message on
  failure and the form shows it. Re-validate on the server. Set
  `demoFullyBookedRate` to 0 and feed real availability into `getTimeSlots`.
- **Controls**: native date input (keyboard and screen-reader support, the
  platform calendar on phones); time slots are a real radio group (arrow
  keys; booked slots disabled and labelled); the guest stepper uses
  `aria-disabled` at its limits so focus is never dropped.
- **Validation** is custom (`noValidate`): errors appear after a field is left
  or after submit, clear as soon as they are fixed, carry an icon and text,
  and are wired with `aria-invalid` / `aria-describedby`. Submit focuses the
  first invalid field; the confirmation heading takes focus on arrival.

## AI Concierge (chatbot)

> **Local demo.** No AI provider is connected, no API key exists, and nothing
> typed leaves the browser. The panel's status line says so.

`components/Chatbot/` — `Chatbot.tsx` (launcher + conversation state, mounted
once in `app/layout.tsx`), `ChatWindow.tsx` (non-modal dialog), `ChatHeader.tsx`,
`ChatMessages.tsx` (`role="log"` live region), `ChatMessage.tsx`, `ChatInput.tsx`,
`QuickQuestions.tsx`, `ChatIcons.tsx` (inline Lucide paths), `chatbot.module.css`.

- **Knowledge** is `lib/chatbot.ts`: `answer(question)` recognises intents
  (menu, a dish by name, dietary, category, favourites, hours, reservations,
  location, contact, prices, story, experience) and composes replies **only**
  from `menuItems`, `signatureDishes`, `openingHours`, `restaurantData`,
  `location`, `story`, `experience` and `reservationConfig`. Anything else gets
  the fallback — it never invents facts. It is loaded on the first question,
  not with the page.
- **Connecting a real model**: replace the body of `getAssistantResponse` with
  a `fetch` to your own route (e.g. `app/api/chat/route.ts`) that holds the
  key in a server-only env var and grounds the model in the same data. Keep
  the `AssistantReply` shape (`content`, optional `actions`, `suggestions`).
- **Reservations** are never taken in chat — replies link to `#reservations`,
  and following a link closes the panel.
- **Behaviour**: history survives close/reopen for the visit (React state);
  Escape closes and focus returns to the launcher; on phones the panel sits
  above the on-screen keyboard (visual viewport), the launcher hides while
  the panel is open and steps aside over the reservation form.
- Other features open the chat through `openChatbot()` in `lib/chatbotBridge.ts`
  (a DOM event) — there is only ever one chat window.

## Voice assistant

> **Website demo.** Browser-native speech only; no voice provider, no API
> key, and it never places a phone call. The dialog says so.

`components/CallAssistant/` — `VoiceAssistant.tsx` ("Need help?" entry point,
rendered in the reservation details), `VoiceModal.tsx` (native `<dialog>` via
`showModal()`: focus containment, inert page, Escape), `VoiceStatus.tsx` (orb +
announced state line), `VoiceControls.tsx`, `VoiceTranscript.tsx`,
`VoiceIcons.tsx`, `voice.module.css`. Browser APIs live in
`lib/useVoiceAssistant.ts`.

- **Flow**: Start Listening → Web Speech `SpeechRecognition` (feature-detected,
  incl. `webkitSpeechRecognition`) → the **same** `getAssistantResponse` as the
  chat → transcript → `speechSynthesis` reads the reply (Stop Speaking).
  There is no second knowledge base.
- **Microphone** is requested only by Start Listening (the recogniser's own
  prompt). A refusal is remembered for the visit and never re-asked; the
  dialog offers the chat and the reservation form instead.
- **Clean-up**: closing the dialog, Stop, the end of recognition and unmount
  all abort recognition and cancel speech; stale replies are dropped.
- **States**: ready, listening, thinking, speaking — plus unsupported, denied,
  no microphone, no speech, network and failure messages. Always in words;
  reduced motion swaps the rings/bars/spinner for still indicators.
- **Going live** with a hosted voice provider: keep the hook's return shape
  and route audio/text through your own server endpoint.

## Reviews

> **Demo content.** Every review and the 4.9 / 248 summary are fictional.
> While `reviewsAreDemo` is `true` the section says so under the rating.

`components/Reviews/` — `Reviews.tsx` (server: header, rating summary, CTA),
`FeaturedReview.tsx`, `ReviewCarousel.tsx` (client), `ReviewCard.tsx`,
`StarRating.tsx`, `reviews.module.css`. Helpers in `lib/reviews.ts`. Anchor
`#reviews` (navbar item).

- **Editing**: `data/reviews.ts` only. Mark one review `featured`; the rest
  fill the carousel. `source` may name a platform **only** for a review that
  can be verified there — demo entries say "Guest".
- **Carousel**: native scroll-snap (touch swipe, trackpad and arrow keys on
  the focused row), buttons step one review, position announced politely.
  No autoplay. Three across on laptops, two on tablets, one (with a peek) on
  phones.
- **StarRating** is one labelled image ("4.5 out of 5 stars") and supports
  fractional ratings.
- **SEO**: no review / `aggregateRating` markup is emitted (see `lib/seo.ts`);
  add it only once reviews are real.

## Location

`components/Location/` — `Location.tsx` (server), `LocationDetails.tsx`
(address, hours, phone, email, actions), `LocationMap.tsx` (client),
`location.module.css`. Helpers in `lib/location.ts`. Anchor `#location`; no
navbar item.

- **One source of truth**: address, phone, email and hours come from
  `data/restaurant.ts` (`location`, `restaurantData`, `openingHours`) — the
  same data the hero, chat and SEO use. The directions link is built from
  the address (Google Maps URLs format, no API key).
- **Map**: without `location.mapEmbedUrl` an illustrated on-brand street map
  is drawn inline (no provider, no request), pinned at the centre and
  labelled "Illustrative map". Set `mapEmbedUrl` to the client's real Google
  Maps embed and the section lazy-loads it in an iframe instead; if it fails
  or takes >12s it shows "Map unavailable" with a directions link. Note a
  third-party map may set cookies — consider consent in the EU.
- **Getting-there notes** (`transport`, `parking`, `accessibility`) render
  only when set. None are invented.
- **Demo flag**: while `restaurantDataIsDemo` is `true`, `lib/seo.ts` leaves
  the address, coordinates, phone, email and hours out of the JSON-LD, and
  the map is labelled as illustrative. Set it to `false` with real data.

## Contact

> **Front-end demo.** Nothing is stored or sent. The form and the thank-you
> panel say so.

`components/Contact/` — `Contact.tsx` (server: heading, layout, CTA band),
`ContactInfo.tsx` (call / email / find-us rows, dinner hours, hospitality
note), `SocialLinks.tsx` (inline SVG icons), `ContactForm.tsx` (client: state,
validation, submit), `ContactSuccess.tsx`, `contact.module.css`. Anchor
`#contact` (navbar item).

- **One source of truth**: phone, email, address, hours and social links come
  from `data/restaurant.ts`; Find Us reuses `directionsUrl()` from
  `lib/location.ts`. The CTA band links to `#reservations` and `#location`.
- **Shared form controls**: the card, inputs, `Field`, errors and submit
  button are the Reservation form's (`components/Reservation/Field.tsx`,
  `reservation.module.css`), so the two forms stay identical. `--error` is a
  global token.
- **Rules** are `lib/contact.ts` (pure `validateContact`): name, email,
  subject and message required; phone and topic optional; message 10–2000
  characters.
- **Going live**: replace the body of `submitContactMessage` in
  `lib/contactService.ts` with a `fetch` to your own route handler or server
  action that holds the email/CRM key server-side. Keep the signature; throw
  an `Error` with a guest-readable message on failure. Re-validate on the
  server and add spam protection there.
- **Socials**: while `socialLinksAreDemo` is `true` the icons link to each
  platform's home page, are labelled as demo links, and are left out of the
  JSON-LD `sameAs`. Point them at the real profiles and set it to `false`.
- **States**: Send Message → Sending... → Message Sent → thank-you panel
  (heading takes focus) → Send Another Message resets and focuses the name.

## Footer

`components/Footer/` — `Footer.tsx` (server: layout, CTA, bottom bar),
`FooterBrand.tsx`, `FooterNavigation.tsx`, `FooterContact.tsx` (Visit +
Contact), `FooterHours.tsx`, `FooterSocials.tsx`, `footer.module.css`.
Rendered once in `app/layout.tsx`, after `<main>`.

- **One source of truth**: name, tagline, address, phone, email, hours and
  social links come from `data/restaurant.ts`; Get Directions reuses
  `directionsUrl()` from `lib/location.ts`. Social icons are shared with
  Contact via `components/ui/SocialIcon.tsx`.
- **Layout**: source order is the phone order (brand, reservation CTA,
  explore, visit, contact, hours, social); `grid-template-areas` rearrange
  it at 768 and 1024. The brand name is sized in container units so it
  stays on one line in any column.
- **Legal links**: `footerCopy.legal` entries without an `href` render as
  plain text announced "page coming soon" — add the `href` once the page
  exists.
- **Back to top** is a plain `#home` link: smooth via `scroll-behavior`
  (off under reduced motion) and it moves keyboard focus to the top.
- The large "EMBER" backdrop is `aria-hidden`, pointer-events none and
  clipped by the footer. The bottom padding clears the floating chat
  launcher.

## Responsive & touch

Breakpoints stay 768 / 1024 / 1440 (min-width, mobile-first); every section
sits in the shared `.container`. Verified at 320, 360, 375, 390, 414, 768,
820, 1024, 1280, 1440 and 1920: no page-level horizontal scroll (category
tabs and the review carousel scroll inside their own clipped tracks), no
layout shift, no console errors.

- **Touch targets**: 44px minimum under a finger. Compact controls (menu
  chips, desktop nav links) stay compact under a mouse and grow via
  `@media (pointer: coarse)`, so landscape tablets get full-size targets.
- **Small text**: badges and micro-labels never go below 12px (`0.75rem`).
- **Hero video**: the mobile encode is chosen below 768px; reduced motion,
  Data Saver or 2g/3g connections get the poster only and no video bytes.
- **Dialogs**: chat and voice panels fit inside the viewport with an 8px
  inset; inputs use 16px text so iOS does not zoom on focus. On phones the
  chat launcher steps aside while the reservation or contact form is on
  screen.
- **Motion**: the custom cursor and magnetic buttons run only under
  `(hover: hover) and (pointer: fine)`; reveals and form feedback stay.

## SEO, accessibility & performance

Audited with axe-core (WCAG 2.0/2.1/2.2 A + AA) plus a scripted keyboard
walk and throttled load, against `next build` output. Re-run after changes.

- **Metadata** lives in `app/layout.tsx`, built from `data/restaurant.ts`:
  title `EMBER & SAGE | Where Fire Meets Flavor`, description, canonical,
  Open Graph and Twitter `summary_large_image`. The share image is generated
  from configuration by `app/opengraph-image.tsx` (1200×630) — replace it
  with a photograph when one exists.
- **Site URL**: set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) at build
  time. It drives `metadataBase`, canonical, Open Graph, JSON-LD,
  `sitemap.xml` and `robots.txt`. The fallback is the reserved
  `example.com` placeholder — set it before going live.
- **Structured data**: `lib/seo.ts` emits schema.org `Restaurant`. While
  `restaurantDataIsDemo` is `true` the address, phone, email, geo and hours
  are deliberately withheld, and `sameAs` is withheld while
  `socialLinksAreDemo` is: never state demo details as fact. There is no
  `aggregateRating` — the reviews are demo content. Flip both flags with
  the real client data and the fields appear.
- **Icons**: `app/icon.svg` (browsers), `app/apple-icon.tsx` (iOS home
  screen, 180×180 PNG generated from the same mark),
  `app/manifest.ts`.
- **Headings**: one `<h1>` (the hero), sections `<h2>`, cards `<h3>`.
  Landmarks: one `<main>`, `<header>`/`<nav aria-label="Main">`, `<footer>`.
  Dialog headers are plain `<div>`s so they never become a second banner.
- **Forms**: every field has a real label, `autocomplete`, `aria-invalid`
  and an `aria-describedby` error; submitting an empty form focuses the
  first invalid field; the result is announced via `role="alert"`.
- **Focus**: 2px `--accent-hover` ring globally, a 3px ember ring on
  inputs and the search field. `scroll-padding-bottom` keeps focused
  elements clear of the chat launcher (WCAG 2.4.11).
- **Reduced motion** is honoured by `MotionConfig`, the global CSS rule and
  the hero's own `animation: none` — all content resolves to its visible
  state, nothing waits on a delay.
- **Performance**: the hero entrance is CSS keyframes, not Motion, so it
  starts at first paint instead of after hydration and the hero renders
  with JS disabled. Fonts are self-hosted via `next/font` (`display: swap`)
  and only the rendered weights are requested. The chatbot's reply engine
  is a dynamic `import()`, the map is an inline SVG (a real embed is a lazy
  iframe), and images are AVIF/WebP with `sizes` and lazy loading below the
  fold.
- **Measured** on the production build at 390px with 4× CPU throttling and
  slow-4G emulation (headless Edge, software raster — not a phone, and not
  Lighthouse): FCP ≈ 2.2–2.4s, LCP ≈ 3.5–4.0s, CLS 0, ~22 requests
  (~230KB JS transfer, 100KB fonts). LCP lands on the hero copy as its
  1.4s entrance finishes; shortening the stagger in `hero.module.css`
  would pull it in at the cost of the composition.
- **Headers** in `next.config.ts`: `nosniff`, `Referrer-Policy`,
  `X-Frame-Options`, and a `Permissions-Policy` that keeps the microphone
  for the voice assistant while denying camera and geolocation.
- **No secrets in client code**: the concierge and voice assistant are
  local/demo logic, and the contact and reservation submissions are stubs
  (`lib/contactService.ts`, `lib/reservationService.ts`) — give them a
  server route and keep keys out of `NEXT_PUBLIC_`.

Known nit, unrelated to this step: at desktop widths the chat launcher
overlaps the hero's city/region line in the bottom-right.

## QA

Last full pass: 2026-09-22, against the production build (`npm run build`
+ `next start`), driven headless through the Chrome DevTools Protocol.
Test scripts live outside the repo; re-create them per pass or re-run the
checks by hand.

- **Data & logic** (bundled from the real modules, 104 assertions): unique
  dish ids, complete fields, valid categories/dietary values; every
  category, search term, dietary and popular filter plus their
  combinations and reset; signature-dish prices resolved from the menu;
  reservation rules (past/invalid dates, booking window, guest range
  1–12, unavailable slots, field validation); contact validation; chatbot
  answers drawn from data with a safe fallback for unknown questions.
- **Journey** (96 checks at 1440/768, 93 at 390): hero, nav anchors and
  scrolled state, mobile menu (open/close/Escape/scroll lock), menu
  categories + search + filters + empty state, signature/story/experience
  CTAs, a full reservation through confirmation and reset, chatbot
  (quick questions, typing indicator, send, clear, Escape), voice
  fallback, reviews carousel, location links, contact form through
  success and reset, footer links and back-to-top.
- **Accessibility**: axe-core (WCAG 2.0/2.1/2.2 A + AA) reports 0
  violations on the page, both forms, the chat panel and the voice dialog,
  at desktop, mobile and reduced motion; 77-stop keyboard walk with no
  traps and nothing obscured.
- **Responsive**: 320–1920px — no horizontal overflow, no clipped text,
  no text under 12px, CLS 0, chat and voice dialogs inside the viewport.
- **Clean**: no console errors or failed requests in dev or production,
  no TypeScript errors (including `--noUnusedLocals --noUnusedParameters`),
  no `console.log`/TODO leftovers, no secrets.

Browser support is verified in Chromium (Edge) only — no Firefox or Safari
is installed here. The build emits `-webkit-backdrop-filter` alongside
every `backdrop-filter` for Safari; `<dialog>`, `:has()` and `dvh` are
supported by all current target browsers, and speech recognition degrades
to the text concierge where it is unavailable.

Known demo limitations (by design, not defects): no dish photographs ship
with the template, so menu and signature cards render their designed
lettered placeholders; reservation and contact submissions are local
stubs; reviews, address, phone, email and social links are demo data
behind the `*IsDemo` flags.

## Before launch — handover checklist

Everything below is demo scaffolding. The site is fully functional as a
demo; none of it talks to an external service, and nothing claims to.

**Content**
- [ ] Replace each file in `data/` (see the table at the top). The brand name
      also appears inside demo *copy* in `data/story.ts`, `data/chatbot.ts`,
      `data/experience.ts`, `data/location.ts`, `data/voiceAssistant.ts` and
      `data/hero.ts` — search for it when renaming the restaurant.
- [ ] Add dish photography to `public/images/…` using the paths in
      `data/menu.ts` / `data/signatureDishes.ts` (each folder's README lists
      the expected names and crops). Until then, cards show designed lettered
      placeholders — deliberate, not broken.
- [ ] Add the hero video to `public/video/` using the names in
      `data/hero.ts`. Missing files are detected at build time and skipped,
      so the poster carries the hero on its own.
- [ ] Replace `data/reviews.ts` with real, attributable reviews, then set
      `reviewsAreDemo = false`. Do not present demo ratings as real.
- [ ] Point `socialLinks` at the real profiles and set
      `socialLinksAreDemo = false` (they currently link to platform home
      pages and are labelled as demo links).
- [ ] Fill in the real address/phone/email/hours, then set
      `restaurantDataIsDemo = false` — this is what releases the address,
      phone, geo and opening hours into the JSON-LD.
- [ ] Add the Privacy and Terms pages, then give those entries an `href` in
      `data/footer.ts` (they render as plain text until then, never as dead
      links).

**Configuration**
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the real domain (see `.env.example`).
      Until then canonical/OG/sitemap use the `example.com` placeholder.
- [ ] Optional: set `location.mapEmbedUrl` to switch the illustrated map for
      a real embed (lazy-loaded), and add `transport` / `parking` /
      `accessibility` only if those facts are true.

**Wiring (currently local demo logic)**
- [ ] Reservations: `lib/reservationService.ts` returns a demo confirmation
      with an `ES-…` reference and says on screen that no table is held.
      Point it at a real booking provider and keep keys server-side.
- [ ] Contact: `lib/contactService.ts` is a stub; the success panel says the
      message was not actually sent. Give it a route handler / server action.
- [ ] AI Concierge and Voice: `lib/chatbot.ts` answers from the site's own
      data, and the voice assistant uses the browser's built-in speech APIs
      with a text-chat fallback. Neither calls an external AI service, and
      the voice feature never claims to be a phone call.
