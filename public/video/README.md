# Hero video

The hero video does **not** live in this folder. Put it in
`public/images/ember-sage/hero/` using these exact names (paths are set in
`content/restaurant.ts` → `hero.video`). `components/Hero/Hero.tsx` checks which
of them exist **at build time** and wires up only those — add the files and rebuild.

| File | Used for | Required |
| --- | --- | --- |
| `hero.mp4` | Desktop + tablet (H.264) | Recommended |
| `hero.webm` | Same, preferred when supported (VP9/AV1) | Optional |
| `hero-mobile.mp4` | Phones, if the desktop file is too heavy (falls back to `hero.mp4`) | Optional |
| `hero-mobile.webm` | Same | Optional |

If no file is present, the hero shows `public/images/ember-sage/hero/grill-embers.webp`
on its own, which is why that poster is designed to stand alone.

## Encoding guidance

- **Length** 8–15s, seamless loop, no hard cut at the wrap point.
- **Size** under ~4 MB desktop, ~1.5 MB mobile. It is a background, not a feature.
- **Resolution** 1920×1080 desktop, 1080×1350 or 720p mobile. The crop is
  `object-fit: cover`, biased toward the right of frame — keep the subject there.
- **No audio track.** It plays muted; an audio track is wasted bytes.
- **Grade it dark.** A dark scrim sits over the video, so footage that is already
  moody and warm holds the heading contrast best.

```sh
# Desktop MP4
ffmpeg -i source.mov -an -vf "scale=1920:-2" -c:v libx264 -crf 24 -preset slow \
  -movflags +faststart hero.mp4

# Mobile MP4
ffmpeg -i source.mov -an -vf "scale=1080:-2" -c:v libx264 -crf 27 -preset slow \
  -movflags +faststart hero-mobile.mp4
```

The video never autoloads for visitors who have asked for reduced motion.
