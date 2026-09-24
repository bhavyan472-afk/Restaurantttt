# Story photography

Two photographs, at the paths set in [`data/story.ts`](../../../data/story.ts):

```
chef-fire.webp     main portrait, 4:5 — e.g. a chef working over open flame
ingredients.webp   square detail, 1:1 — e.g. seasonal produce, hands at work
```

`components/Story/Story.tsx` checks which files exist **at build time**. A
missing file shows a designed firelit placeholder, so the section never shows a
broken image. Add a file and rebuild; no code change. To drop the detail image
entirely, remove `images.detail` from the data.

## Shooting and export guidance

- **Crop** keep the subject in the centre of the frame; desktop parallax trims
  about 5% top and bottom of the portrait. The detail is hidden on phones.
- **Format** WebP (or AVIF), quality ~75. `next/image` serves responsive sizes.
- **Resolution** 1400×1750 for the portrait, 800×800 for the detail.
- **Weight** aim under 250 KB and 100 KB.
- **Direction** dark, cinematic kitchen or dining room; warm firelight or
  candlelight; shallow depth of field; natural texture. Avoid staged, evenly
  lit stock photography.

Update each image's `alt` in `data/story.ts` to describe the actual photo.
