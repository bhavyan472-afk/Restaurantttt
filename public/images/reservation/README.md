# Reservation photography

One atmosphere photograph, at the path set in
[`data/reservations.ts`](../../../data/reservations.ts):

```
reservation-atmosphere.webp
```

`components/Reservation/Reservation.tsx` checks for it **at build time**; until
it exists a candlelit placeholder is shown. Add the file and rebuild.

- **Crop** 3:2 on tablets and phones, 4:3 on laptops — keep the subject centred.
- **Size** 1400×1050, WebP quality ~75, under 200 KB.
- **Direction** a quiet, inviting table or corner of the room by candlelight;
  warm, dim, shallow depth of field. It sits beside the booking form, so it
  should calm rather than compete.

Update `image.alt` in `data/reservations.ts` to describe the actual photo.
