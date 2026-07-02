# Team originals

Full-resolution source photos for the team page.

The site (`/team`) serves optimized thumbnails at `../<slug>.webp`
(square 320×320, WebP q85, ~10–30 KB per avatar). These originals are
kept for future editorial needs — a bigger detail view on a per-member
page, a print rendition, a re-crop with a different centering, etc.

## Regenerating a thumbnail

If you re-crop a source photo or replace one, regenerate the `.webp`
in `src/assets/team/` from the corresponding original:

```python
from PIL import Image, ImageOps
im = Image.open('originals/<slug>.<ext>').convert('RGB')
im = ImageOps.fit(im, (320, 320), method=Image.LANCZOS, centering=(0.5, 0.35))
im.save('<slug>.webp', 'WEBP', quality=85, method=6)
```

Then `avatar:` in `src/content/team/<slug>.yaml` should stay pointed at
the `.webp` (it already is).

## Sizing rationale

The `.member__avatar` CSS is a fixed 96×96 pixel disc with
`object-fit: cover`. 320×320 gives ~3.3× DPR headroom (retina + zoom)
without wasting bytes.

## Why WebP, not the original format

The team page is the first heavy page many visitors land on. Before
this pass the total avatar weight was ~22 MB (Tommaso alone: 15 MB;
Emanuel: 3.8 MB). Compressing to WebP at the actually-rendered size
brings the total to ~150 KB across all 9 avatars, a ~150× reduction
with no visible quality loss on the disc.
