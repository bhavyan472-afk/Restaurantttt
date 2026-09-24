# Experience photography

Three photographs, at the paths set in [`data/experience.ts`](../../../data/experience.ts):

```
dining-room.webp    main visual, landscape ~21:9 — tablet and up
evening-table.webp  main visual, portrait 4:5 — phones
open-kitchen.webp   portrait 4:5 beside the pillars — laptops and up
```

The main visual is **art-directed**: phones get `evening-table`, a photograph
composed for a tall frame, instead of a centre crop of the wide room shot
that would cut guests or the fire out. The browser downloads only the one it
shows. If only one of the two is supplied, it serves every viewport.

`components/Experience/Experience.tsx` checks which files exist **at build
time**. Missing files show designed placeholders; add a file and rebuild.

## Shooting and export guidance

- **dining-room** keep people, candles and the kitchen glow in the middle
  band — the frame is 21:9 on laptops and 16:9 on tablets, and desktop
  parallax trims ~5% top and bottom. 2400×1030, under 350 KB.
- **evening-table** a close, intimate table scene, subject centred.
  1200×1500, under 200 KB.
- **open-kitchen** chefs and flame, vertical composition. 1000×1250, under 180 KB.
- **Format** WebP (or AVIF), quality ~75.
- **Direction** real service in a warm, dim room; amber highlights, natural
  shadows, shallow depth of field. Avoid posed stock photography and heavy
  colour grading — the site adds its own soft tonal wash.

Update the `alt` text in `data/experience.ts` to describe the actual photos.
