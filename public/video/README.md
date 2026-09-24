# Hero video

Drop the client's hero video here using these exact names. `components/Hero/Hero.tsx`
checks which of them exist **at build time** and wires up only those, so no code
change is needed — just add the files and rebuild.

| File | Used for | Required |
| --- | --- | --- |
| `restaurant-hero.mp4` | Desktop + tablet (H.264) | Recommended |
| `restaurant-hero.webm` | Same, preferred when supported (VP9/AV1) | Optional |
| `restaurant-hero-mobile.mp4` | Phones, if the desktop file is too heavy | Optional |
| `restaurant-hero-mobile.webm` | Same | Optional |

If no file is present, the hero shows `public/images/hero-poster.webp` on its own —
which is why that poster is designed to stand alone. Replace it with a real frame
from the video once you have one.

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
  -movflags +faststart restaurant-hero.mp4

# Mobile MP4
ffmpeg -i source.mov -an -vf "scale=1080:-2" -c:v libx264 -crf 27 -preset slow \
  -movflags +faststart restaurant-hero-mobile.mp4
```

The video never autoloads for visitors who have asked for reduced motion.
