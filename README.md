# GrooveTrips

A complete Next.js website for GrooveTrips, based on the 37 scraped Markdown files in `raw messy data/`.

## Run locally

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Build with `npm run build`, then serve with `npm start`.

## What is included

- Editorial homepage with a native-scroll, sticky WebGL experience, subtle refraction, typography choreography, and a motion toggle.
- Twelve upcoming trips, year filters, and individual trip pages.
- Six journal stories, an about page, and contact page.
- All 364 distinct source images downloaded, optimized, and locally served. Each has 480px and 960px variants, plus a full-size WebP capped at 1920px. Fonts are local too.
- Reduced-motion and unavailable-WebGL fallbacks. Content and links are server-rendered and readable without JavaScript.
- Real inquiry links to the existing GrooveTrips form. No fabricated bookings, prices, availability, testimonials, or contact details.

## Video status — blocked

Higgsfield rejected both requested film options with `Requires basic plan or higher.` No jobs were submitted. The running experience uses original source photography with WebGL. It does **not** contain AI-generated video, and that requested part is incomplete.

`src/lib/data/film.json` records the status and film directions. Once generation is enabled, generate and assess the two options, download the selected clip, then encode a muted H.264 MP4 with frequent or all-intra keyframes and fast-start metadata. Save it under `public/media/` and set `src` in that JSON to its local URL. Set `poster` to its local first frame. The cinematic component already contains a seeked-event-driven video scrub path, with only one seek in flight. The video path has not been exercised with actual footage.

The current WebGL path caps render resolution, stops rendering offscreen and in background tabs, and releases resources on unmount. It preserves the normal browser scroll. Cross-device frame rate and browser interaction testing remain to be verified; a successful build is not proof of 60fps.

## Source and media

- `src/lib/data/trips.json` — normalized upcoming trip data.
- `src/lib/data/posts.json` — journal text and source URLs.
- `src/lib/data/source-images.json` — original image context and local paths.
- `src/lib/data/media-manifest.json` — download provenance and status for every distinct source image.
- `src/lib/data/image-dimensions.json` — actual image dimensions for accurate responsive sizing.
- `docs/content-notes.md` — source conflicts and editorial decisions.

Re-download source media with `node scripts/import-media.mjs`. Then run `node scripts/prepare-responsive-media.mjs` to prepare responsive variants. These scripts use the `sharp` dependency supplied by Next.js.

The site was not published. The original raw data is preserved.
