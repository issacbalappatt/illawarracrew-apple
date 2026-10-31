# Image review: 60 images from the two zips

## The main problem: resolution, not style

Both zips say it in their own README: the images are **cut out of contact sheets and enlarged**.

| Collection | Native size of each image | Result on the site |
|---|---|---|
| Collection 1 (30 images, "1536 px") | about 250 to 370 px wide, enlarged 4 to 6 times | Soft and smeary at 100%. Halo edges, mushy caddies and hands. OK only as small cards. |
| Collection 2 (images 31 to 60) | about 300 x 165 px | Too small for any web use beyond thumbnails. |
| `31-kitchen-cleaner-standalone` | 1536 x 1024, generated alone | **Excellent.** Sharp, real-looking, correct uniform piping, no face. This is the quality bar. Now the homepage hero. |

**Fix:** In ChatGPT, generate **one image per message**, at full size. Never ask for a sheet or grid of scenes. Then send the files exactly as ChatGPT downloads them.

## Content check: what looks too "AI generic"

### Replace (do not use, even when re-generated at full size)
| Image | Problem |
|---|---|
| `finale.png` (sunset over the sea) | Saturated orange sun ball on the horizon is the classic AI sunset. Also wrong for the Illawarra: the coast faces east, so the sun **rises** over the ocean and **sets** behind the escarpment. Use a soft sunrise or daytime view. |
| `team.png` and #10 | Three crew members in identical poses, identical ponytails and identical caddies, walking in step. Reads as cloned. |
| `team-checklist.png` and #29 | Two identical heads side by side. Same clone problem. |
| `service-windows.png` and #18 | Back of the head fills the frame, cloth too close to the lens. Awkward crop. |
| `detail-eco-products.png`, #30 | Amber bottle, green microfibre, eucalyptus sprig: the stock "eco clean" still life. Generic. |
| `detail-caddy.png`, #23 | Rows of generic spray bottles. Stock-photo look. |
| `hero-alt-vacuum.png` | Person cut off at the frame edge. Looks like a mistake. |

### Keep the idea, but re-generate at full size
`hero` (concept), `service-house`, `service-deep` (remove the water droplets, an AI cliche), `service-lease`, `service-office`, `service-carpet`, `room-kitchen`, `room-living`, `room-laundry`, `room-bedroom`, `detail-faucet`, `detail-rangehood`, `detail-linen`, `step-1`, `step-2`, `step-3`, `lifestyle-deck`, `lifestyle-coastal-dining`, `booking-hero`, `about-van`.

### Two patterns that make the whole set look AI
1. **Every crew member is the same person:** a woman with long black hair in a ponytail. Real teams vary. Ask for men and women, short hair and long hair, different builds, in different images.
2. **Uniform piping:** collection 1 mostly shows plain black polos. Collection 2 and the standalone show the grey piping correctly. Keep uploading the two uniform reference photos.

## Priority re-generation list (one image per message, full size)

1. `service-house` (portrait)
2. `service-deep` (portrait, no droplets)
3. `service-lease` (portrait)
4. `service-office` (portrait)
5. `service-carpet` (portrait)
6. `room-kitchen` (portrait)
7. `room-living` (portrait)
8. `room-laundry` (portrait)
9. `team` (landscape, 3 different people, different heights and hair, not in step)
10. `finale` (landscape, sunrise or daytime, centre kept calm for text)

Paste the matching prompt from `image-prompts.md`, then add: "Generate this single image at full resolution. Do not make a grid or contact sheet."
