# Menu photography

Drop each dish's photo here as `<id>.webp`, where `<id>` is the dish's `id` in
[`data/menu.ts`](../../../data/menu.ts). For example:

```
truffle-burrata.webp
charred-octopus.webp
fire-roasted-ribeye.webp
```

`components/Menu/Menu.tsx` checks which files exist **at build time**, so adding
a photo and rebuilding is all that is needed — no code change. A dish with no
photo renders a designed placeholder panel carrying its initial, so the grid
never shows a broken image and partial photography looks intentional.

## Shooting and export guidance

The cards crop to **4:3** with `object-fit: cover`, so keep the plate centred
and leave room at the edges.

- **Format** WebP (or AVIF), quality ~75. `next/image` handles the responsive
  sizes, so one large file per dish is enough.
- **Resolution** 1600×1200 is plenty; the largest rendered size is ~33vw.
- **Weight** aim under 150 KB each. Thirty-two dishes adds up.
- **Direction** dark, moody environment; warm directional light; shallow depth
  of field; natural texture. The cards sit on a near-black background with a
  warm tonal wash over the image, so brightly lit, white-background studio
  shots will fight the design.

Update the dish's `alt` text in `data/menu.ts` to describe the actual photo.
