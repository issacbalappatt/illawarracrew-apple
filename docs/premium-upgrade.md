# Premium editorial upgrade, 1 November 2026

The homepage now leads from original local-home imagery to a four-field enquiry form, service choices, reviews, local coverage and FAQs. Header, hero and mobile quick actions lead directly to the enquiry section. Optional phone and notes sit behind a disclosure. Existing booking routes and SEO content remain available.

## Photography

15 original generated scenes replace all 20 editorial image slots. The mobile hero has its own crop. Assets are compressed WebP with explicit layout dimensions and lazy loading below the fold. Crew scenes use black polos with grey shoulder/side piping and black trousers, guided by the repository's uniform reference photos. No vacuum cleaners or cords. The original real-job galleries and evidence photos are retained; generated scenes are not presented as completed customer jobs.

Generation used the built-in image tool. The prompt set uses the following common direction: one photorealistic Australian architectural/editorial photograph, natural exposure, straight verticals, tactile timber/stone/linen, subtle grain and lived-in irregularities; no text, watermark, collage, cords or vacuum cleaner.

| Scene | Prompt subject | Slots |
| --- | --- | --- |
| Hero | Leafy Mount Pleasant family home, blackbutt floors, garden/escarpment view, uniformed woman wiping island | hero, hero-mobile |
| Kitchen | Balgownie kitchen, olive cabinetry, stone island, uniformed Indian man wiping surface | service-house, room-kitchen |
| Bathroom | Figtree limestone bathroom, walnut vanity, practical glass shower | service-deep, room-bathroom |
| Living | Mount Pleasant split-level lounge, cream sofa, timber, garden outlook | band-living, room-living |
| Bedroom | Thirroul weatherboard cottage, linen bed, sash windows | service-airbnb, detail-linen |
| Office | Wollongong professional office, walnut meeting table, uniformed woman cleaning | service-office |
| Arrival | Red brick family home, native garden, two uniformed cleaners with caddies | step-2 |
| Laundry | Dapto family laundry, sage cabinets, practical sink and washing machine | room-laundry |
| Detail | Limestone vanity, brushed metal mixer, cotton towel | detail-faucet |
| Empty home | Clean unfurnished Figtree lounge and kitchen, timber floors and garden | service-lease |
| Carpet | Low angle wool carpet detail in a warm family lounge | service-carpet |
| Coastal | Bulli living room, rooftops and modest ocean glimpse behind trees | finale, booking-hero |
| Planning | Homeowner typing on a laptop at a timber kitchen table | step-1 |
| Hallway | Balgownie entrance, keys in ceramic bowl, timber console | step-3 |
| Cooktop | Practical gas cooktop and stainless rangehood, sage kitchen | detail-rangehood |

Local property inspiration, for materials and architecture only:
- https://www.realestate.com.au/sold/property-house-nsw-mount%2Bpleasant-147231188
- https://www.stonerealestate.com.au/property/8771338-185-brokers-road-mount-pleasant-nsw/
- https://www.domain.com.au/2-dobinson-street-mount-pleasant-nsw-2519-2020480592

No listing photos are redistributed.

## Motion

Lenis 1.3.11 is vendored from its published package, with its MIT licence, so runtime does not depend on a third-party CDN. Source: https://github.com/darkroomengineering/lenis/tree/v1.3.11. Fine-pointer devices receive restrained wheel smoothing; touch scrolling remains native. Motion is disabled when reduced motion is requested, including when that setting changes. Reveal animations use IntersectionObserver and the browser animation API. Content remains visible without JS or if enhancement fails.

## Enquiry behaviour

The production component uses the existing `create-enquiry` function and attribution/conversion helpers. It requires a server acknowledgement with an enquiry ID before showing success. Failures preserve entered details. Duplicate submits are locked while in flight; retries reuse the request ID. Analytics failures cannot turn a saved enquiry into a failure. A honeypot supplements the existing server controls.

GitHub Pages remains a design preview with `trial-disabled.invalid` backend configuration and no Google tracking. Its enquiry button is disabled with an explicit explanation and a call option. This does not enable real lead delivery or modify the production website. Before production release, configure the original backend environment and verify a real consented enquiry reaches the team.

## Validation

- Build and TypeScript checks.
- Existing SEO regression checks: server metadata, FAQ, reviews, schema, canonical URLs, sitemap and location routes.
- `node scripts/check-enquiry.mjs`: success acknowledgement, payload, failed/offline response, retry ID, duplicate-submit lock, analytics isolation, preview guard and honeypot. No live leads created.
- Desktop and 390px embedded viewport visual review, including home-to-enquiry navigation.
