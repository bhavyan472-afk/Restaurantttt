# Signature dish photography

One portrait photograph per signature dish, at the path given by its `image`
in [`data/signatureDishes.ts`](../../../data/signatureDishes.ts):

```
fire-roasted-ribeye.webp
truffle-tagliatelle.webp
charred-octopus.webp
wild-mushroom-risotto.webp
basque-cheesecake.webp
smoked-negroni.webp
```

`components/SignatureDishes/SignatureDishes.tsx` checks which files exist **at
build time**. For each dish it uses, in order: the portrait here, the dish's
menu photo in `/images/menu/`, then a designed placeholder. Add a file and
rebuild; no code change.

## Shooting and export guidance

- **Crop** 4:5 portrait. The featured dish also shows at 3:2 on tablets and the
  others at 4:3 on phones, all with `object-fit: cover`, so keep the plate
  centred with room at the edges. Desktop parallax trims about 6% top and bottom.
- **Format** WebP (or AVIF), quality ~75. `next/image` serves responsive sizes.
- **Resolution** 1600×2000 for the featured dish, 1200×1500 for the rest.
- **Weight** aim under 250 KB featured, 150 KB each otherwise.
- **Direction** dark, atmospheric setting; warm directional or firelit light;
  shallow depth of field; real texture; refined plating. No bright or
  white-background studio shots, 3D renders or illustrations.

Update each dish's `alt` in `data/signatureDishes.ts` to describe the actual photo.
