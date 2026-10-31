# ICC trial website: image prompts (v2, matched to your ChatGPT page style)

## How to use

1. Style reference: match the look of the images in your 'illawarra_apple_style_redesign' page (warm golden light, travertine, linen, jute, pale oak, olive, ocean headland). If ChatGPT still has that chat, use the same chat.
2. Open ONE new ChatGPT chat for all images so the crew and uniform stay consistent.
3. First, upload uniform-reference-1.jpg and uniform-reference-2.jpg and paste the SETUP message.
4. Then paste one prompt at a time and say: Create this image.
5. If a face shows, or the background is blurred, reply: Regenerate. Hide the face and keep everything in sharp focus.
6. Save each image with the exact file_name. Put them all in one zip and send it to me.

## Setup message (paste first, with the two uniform photos)

```
I will send you prompts for photos for a premium cleaning company website. The two photos I uploaded show our real uniform. In every image with a person, copy this uniform exactly. Every image must look like a real documentary photograph: wide lens, deep focus with everything sharp, warm golden natural daylight like the luxury coastal interiors you made for my earlier page, no portrait blur, no visible faces. Reply 'Ready' and wait for the first prompt.
```

## 1. Homepage hero and closing image

### 1. hero.png  (1536x1024 landscape)

```json
{
  "file_name": "hero.png",
  "used_on_site": "Homepage hero, full width under the headline. Cropped to 16:9 on desktop and 4:5 on phones.",
  "size": "1536x1024 landscape",
  "scene": "A wide, light-filled open-plan living room in a luxury coastal home. One crew member, seen from behind and small in the frame (about one fifth of the image height), slides open a large clean glass door to a timber balcony with a soft ocean and green escarpment view. Linen sofa, pale oak floor, stone and white palette.",
  "composition": "The room is the hero, the person is a quiet detail. Keep the person and the open door in the centre third so a tall phone crop still works.",
  "people": "No visible faces. Show people from behind, over the shoulder, side-on with the head turned away, or cropped at the shoulders or chest. Hands, gloves, uniform and the work are the subject.",
  "uniform": "Crew uniform (match the reference photos exactly): black short-sleeve polo shirt with thin light-grey contrast piping over the shoulders and down the sides, a small white embroidered logo on the left chest, plain black work trousers, black nitrile gloves when cleaning. Neat, clean, well-fitted.",
  "camera_and_style": "Luxury architectural interior photography, like a premium Australian design magazine. Warm late-afternoon golden sunlight streaming in, long soft shadows. Materials: travertine and pale limestone, cream linen and boucle, natural jute rug, pale oak timber, olive-green accent cushions, eucalyptus stems in stone vases, frameless glass balustrades. Coastal Illawarra, NSW setting: ocean, a green headland and Norfolk Island pines through floor-to-ceiling glass where a view fits. Wide 24mm lens at f/8, deep focus, everything sharp, no background blur, no bokeh. Photorealistic, natural colour, not over-processed.",
  "avoid": "visible faces, eye contact with camera, posed smiles, shallow depth of field, bokeh, portrait lighting, studio lighting, HDR, sparkles, bubbles, glints, lens flare, text, words, logos other than the small chest logo, brand names on products, watermarks, extra fingers, warped hands, warped lines, duplicated objects, plastic CGI look, oversaturated colour",
  "note": "You already have this one (the living room with the ocean view). Skip unless you want a new version."
}
```

### 2. finale.png  (1536x1024 landscape)

```json
{
  "file_name": "finale.png",
  "used_on_site": "Closing call to action, full width with white text centred on top.",
  "size": "1536x1024 landscape",
  "scene": "View from a clean timber verandah of a coastal Illawarra home at dawn, looking out to the ocean, escarpment edge on one side, two simple outdoor chairs facing the view.",
  "composition": "Keep the centre calm and low in detail (sky and sea) because text sits there.",
  "people": "No people in this image.",
  "camera_and_style": "Luxury architectural interior photography, like a premium Australian design magazine. Warm late-afternoon golden sunlight streaming in, long soft shadows. Materials: travertine and pale limestone, cream linen and boucle, natural jute rug, pale oak timber, olive-green accent cushions, eucalyptus stems in stone vases, frameless glass balustrades. Coastal Illawarra, NSW setting: ocean, a green headland and Norfolk Island pines through floor-to-ceiling glass where a view fits. Wide 24mm lens at f/8, deep focus, everything sharp, no background blur, no bokeh. Photorealistic, natural colour, not over-processed.",
  "avoid": "visible faces, eye contact with camera, posed smiles, shallow depth of field, bokeh, portrait lighting, studio lighting, HDR, sparkles, bubbles, glints, lens flare, text, words, logos other than the small chest logo, brand names on products, watermarks, extra fingers, warped hands, warped lines, duplicated objects, plastic CGI look, oversaturated colour"
}
```

## 2. Service tiles (homepage)

### 3. service-house.png  (1024x1536 portrait)

```json
{
  "file_name": "service-house.png",
  "used_on_site": "Tile: House cleaning. 4:5, white text over the lower third.",
  "size": "1024x1536 portrait",
  "scene": "Gloved hands smoothing crisp white linen on a made bed in a calm bedroom with timber bedside table and soft window light. Crew member cropped at the chest.",
  "composition": "Lower third is calm, darker bedding or floor so white text stays readable.",
  "people": "No visible faces. Show people from behind, over the shoulder, side-on with the head turned away, or cropped at the shoulders or chest. Hands, gloves, uniform and the work are the subject.",
  "uniform": "Crew uniform (match the reference photos exactly): black short-sleeve polo shirt with thin light-grey contrast piping over the shoulders and down the sides, a small white embroidered logo on the left chest, plain black work trousers, black nitrile gloves when cleaning. Neat, clean, well-fitted.",
  "camera_and_style": "Luxury architectural interior photography, like a premium Australian design magazine. Warm late-afternoon golden sunlight streaming in, long soft shadows. Materials: travertine and pale limestone, cream linen and boucle, natural jute rug, pale oak timber, olive-green accent cushions, eucalyptus stems in stone vases, frameless glass balustrades. Coastal Illawarra, NSW setting: ocean, a green headland and Norfolk Island pines through floor-to-ceiling glass where a view fits. Wide 24mm lens at f/8, deep focus, everything sharp, no background blur, no bokeh. Photorealistic, natural colour, not over-processed.",
  "avoid": "visible faces, eye contact with camera, posed smiles, shallow depth of field, bokeh, portrait lighting, studio lighting, HDR, sparkles, bubbles, glints, lens flare, text, words, logos other than the small chest logo, brand names on products, watermarks, extra fingers, warped hands, warped lines, duplicated objects, plastic CGI look, oversaturated colour"
}
```

### 4. service-lease.png  (1024x1536 portrait)

```json
{
  "file_name": "service-lease.png",
  "used_on_site": "Tile: End of lease. 4:5, white text over the lower third.",
  "size": "1024x1536 portrait",
  "scene": "An empty, bright rental apartment on handover day. A crew member kneels side-on with head turned away, cleaning a sliding door track with a cloth. Bare white walls, clean floorboards, no furniture.",
  "composition": "Person in the upper middle, even floor tone in the lower third.",
  "people": "No visible faces. Show people from behind, over the shoulder, side-on with the head turned away, or cropped at the shoulders or chest. Hands, gloves, uniform and the work are the subject.",
  "uniform": "Crew uniform (match the reference photos exactly): black short-sleeve polo shirt with thin light-grey contrast piping over the shoulders and down the sides, a small white embroidered logo on the left chest, plain black work trousers, black nitrile gloves when cleaning. Neat, clean, well-fitted.",
  "camera_and_style": "Luxury architectural interior photography, like a premium Australian design magazine. Warm late-afternoon golden sunlight streaming in, long soft shadows. Materials: travertine and pale limestone, cream linen and boucle, natural jute rug, pale oak timber, olive-green accent cushions, eucalyptus stems in stone vases, frameless glass balustrades. Coastal Illawarra, NSW setting: ocean, a green headland and Norfolk Island pines through floor-to-ceiling glass where a view fits. Wide 24mm lens at f/8, deep focus, everything sharp, no background blur, no bokeh. Photorealistic, natural colour, not over-processed.",
  "avoid": "visible faces, eye contact with camera, posed smiles, shallow depth of field, bokeh, portrait lighting, studio lighting, HDR, sparkles, bubbles, glints, lens flare, text, words, logos other than the small chest logo, brand names on products, watermarks, extra fingers, warped hands, warped lines, duplicated objects, plastic CGI look, oversaturated colour"
}
```

### 5. service-deep.png  (1024x1536 portrait)

```json
{
  "file_name": "service-deep.png",
  "used_on_site": "Tile: Deep cleaning. 4:5, white text over the lower third.",
  "size": "1024x1536 portrait",
  "scene": "Close detail: a gloved hand drawing a squeegee down a frameless shower glass panel in a stone bathroom. Only the forearm and hand of the crew member are visible.",
  "composition": "Glass and hand in the upper two thirds, darker tiles in the lower third.",
  "people": "No visible faces. Show people from behind, over the shoulder, side-on with the head turned away, or cropped at the shoulders or chest. Hands, gloves, uniform and the work are the subject.",
  "uniform": "Crew uniform (match the reference photos exactly): black short-sleeve polo shirt with thin light-grey contrast piping over the shoulders and down the sides, a small white embroidered logo on the left chest, plain black work trousers, black nitrile gloves when cleaning. Neat, clean, well-fitted.",
  "camera_and_style": "Luxury architectural interior photography, like a premium Australian design magazine. Warm late-afternoon golden sunlight streaming in, long soft shadows. Materials: travertine and pale limestone, cream linen and boucle, natural jute rug, pale oak timber, olive-green accent cushions, eucalyptus stems in stone vases, frameless glass balustrades. Coastal Illawarra, NSW setting: ocean, a green headland and Norfolk Island pines through floor-to-ceiling glass where a view fits. Wide 24mm lens at f/8, deep focus, everything sharp, no background blur, no bokeh. Photorealistic, natural colour, not over-processed.",
  "avoid": "visible faces, eye contact with camera, posed smiles, shallow depth of field, bokeh, portrait lighting, studio lighting, HDR, sparkles, bubbles, glints, lens flare, text, words, logos other than the small chest logo, brand names on products, watermarks, extra fingers, warped hands, warped lines, duplicated objects, plastic CGI look, oversaturated colour"
}
```

### 6. service-office.png  (1024x1536 portrait)

```json
{
  "file_name": "service-office.png",
  "used_on_site": "Tile: Office cleaning. 4:5, white text over the lower third.",
  "size": "1024x1536 portrait",
  "scene": "A small modern office after hours. A crew member seen from behind wipes down a long oak desk; neat chairs, closed laptops, polished concrete floor, large window with a soft city and escarpment view.",
  "composition": "Person in the middle distance, floor in the lower third.",
  "people": "No visible faces. Show people from behind, over the shoulder, side-on with the head turned away, or cropped at the shoulders or chest. Hands, gloves, uniform and the work are the subject.",
  "uniform": "Crew uniform (match the reference photos exactly): black short-sleeve polo shirt with thin light-grey contrast piping over the shoulders and down the sides, a small white embroidered logo on the left chest, plain black work trousers, black nitrile gloves when cleaning. Neat, clean, well-fitted.",
  "camera_and_style": "Luxury architectural interior photography, like a premium Australian design magazine. Warm late-afternoon golden sunlight streaming in, long soft shadows. Materials: travertine and pale limestone, cream linen and boucle, natural jute rug, pale oak timber, olive-green accent cushions, eucalyptus stems in stone vases, frameless glass balustrades. Coastal Illawarra, NSW setting: ocean, a green headland and Norfolk Island pines through floor-to-ceiling glass where a view fits. Wide 24mm lens at f/8, deep focus, everything sharp, no background blur, no bokeh. Photorealistic, natural colour, not over-processed.",
  "avoid": "visible faces, eye contact with camera, posed smiles, shallow depth of field, bokeh, portrait lighting, studio lighting, HDR, sparkles, bubbles, glints, lens flare, text, words, logos other than the small chest logo, brand names on products, watermarks, extra fingers, warped hands, warped lines, duplicated objects, plastic CGI look, oversaturated colour"
}
```

## 3. Room by room (homepage)

### 7. room-kitchen.png  (1024x1536 portrait)

```json
{
  "file_name": "room-kitchen.png",
  "used_on_site": "Room by room: Kitchens. 4:5 with rounded corners.",
  "size": "1024x1536 portrait",
  "scene": "Gloved hands wiping a long pale stone island benchtop with a folded grey microfibre cloth in a white modern kitchen. Crew member cropped at the chest. Clean splashback, stainless sink.",
  "people": "No visible faces. Show people from behind, over the shoulder, side-on with the head turned away, or cropped at the shoulders or chest. Hands, gloves, uniform and the work are the subject.",
  "uniform": "Crew uniform (match the reference photos exactly): black short-sleeve polo shirt with thin light-grey contrast piping over the shoulders and down the sides, a small white embroidered logo on the left chest, plain black work trousers, black nitrile gloves when cleaning. Neat, clean, well-fitted.",
  "camera_and_style": "Luxury architectural interior photography, like a premium Australian design magazine. Warm late-afternoon golden sunlight streaming in, long soft shadows. Materials: travertine and pale limestone, cream linen and boucle, natural jute rug, pale oak timber, olive-green accent cushions, eucalyptus stems in stone vases, frameless glass balustrades. Coastal Illawarra, NSW setting: ocean, a green headland and Norfolk Island pines through floor-to-ceiling glass where a view fits. Wide 24mm lens at f/8, deep focus, everything sharp, no background blur, no bokeh. Photorealistic, natural colour, not over-processed.",
  "avoid": "visible faces, eye contact with camera, posed smiles, shallow depth of field, bokeh, portrait lighting, studio lighting, HDR, sparkles, bubbles, glints, lens flare, text, words, logos other than the small chest logo, brand names on products, watermarks, extra fingers, warped hands, warped lines, duplicated objects, plastic CGI look, oversaturated colour"
}
```

### 8. room-bathroom.png  (1024x1536 portrait)

```json
{
  "file_name": "room-bathroom.png",
  "used_on_site": "Room by room: Bathrooms. 4:5 with rounded corners.",
  "size": "1024x1536 portrait",
  "scene": "A finished, spotless bathroom: walk-in shower with clear glass, pale grey tiles with clean grout, stone vanity, one folded white towel on a timber stool.",
  "people": "No people in this image.",
  "camera_and_style": "Luxury architectural interior photography, like a premium Australian design magazine. Warm late-afternoon golden sunlight streaming in, long soft shadows. Materials: travertine and pale limestone, cream linen and boucle, natural jute rug, pale oak timber, olive-green accent cushions, eucalyptus stems in stone vases, frameless glass balustrades. Coastal Illawarra, NSW setting: ocean, a green headland and Norfolk Island pines through floor-to-ceiling glass where a view fits. Wide 24mm lens at f/8, deep focus, everything sharp, no background blur, no bokeh. Photorealistic, natural colour, not over-processed.",
  "avoid": "visible faces, eye contact with camera, posed smiles, shallow depth of field, bokeh, portrait lighting, studio lighting, HDR, sparkles, bubbles, glints, lens flare, text, words, logos other than the small chest logo, brand names on products, watermarks, extra fingers, warped hands, warped lines, duplicated objects, plastic CGI look, oversaturated colour"
}
```

### 9. room-living.png  (1024x1536 portrait)

```json
{
  "file_name": "room-living.png",
  "used_on_site": "Room by room: Living areas. 4:5 with rounded corners.",
  "size": "1024x1536 portrait",
  "scene": "A crew member cropped at the waist uses a plain unbranded cordless stick vacuum on a pale wool rug in a bright living room. Clean skirting boards, oak floor, low sofa.",
  "composition": "Low camera height so the floor and skirting boards are clearly visible.",
  "people": "No visible faces. Show people from behind, over the shoulder, side-on with the head turned away, or cropped at the shoulders or chest. Hands, gloves, uniform and the work are the subject.",
  "uniform": "Crew uniform (match the reference photos exactly): black short-sleeve polo shirt with thin light-grey contrast piping over the shoulders and down the sides, a small white embroidered logo on the left chest, plain black work trousers, black nitrile gloves when cleaning. Neat, clean, well-fitted.",
  "camera_and_style": "Luxury architectural interior photography, like a premium Australian design magazine. Warm late-afternoon golden sunlight streaming in, long soft shadows. Materials: travertine and pale limestone, cream linen and boucle, natural jute rug, pale oak timber, olive-green accent cushions, eucalyptus stems in stone vases, frameless glass balustrades. Coastal Illawarra, NSW setting: ocean, a green headland and Norfolk Island pines through floor-to-ceiling glass where a view fits. Wide 24mm lens at f/8, deep focus, everything sharp, no background blur, no bokeh. Photorealistic, natural colour, not over-processed.",
  "avoid": "visible faces, eye contact with camera, posed smiles, shallow depth of field, bokeh, portrait lighting, studio lighting, HDR, sparkles, bubbles, glints, lens flare, text, words, logos other than the small chest logo, brand names on products, watermarks, extra fingers, warped hands, warped lines, duplicated objects, plastic CGI look, oversaturated colour"
}
```

## 4. Team and trust

### 10. team.png  (1536x1024 landscape)

```json
{
  "file_name": "team.png",
  "used_on_site": "Trust section and About page, full width.",
  "size": "1536x1024 landscape",
  "scene": "Three crew members seen from behind walk up a stone front path to a modern coastal home in morning light, each carrying a neat grey cleaning caddy. The black polos with grey piping are clearly visible from the back.",
  "composition": "Wide shot, people in the centre third, house and garden around them.",
  "people": "No visible faces. Show people from behind, over the shoulder, side-on with the head turned away, or cropped at the shoulders or chest. Hands, gloves, uniform and the work are the subject.",
  "uniform": "Crew uniform (match the reference photos exactly): black short-sleeve polo shirt with thin light-grey contrast piping over the shoulders and down the sides, a small white embroidered logo on the left chest, plain black work trousers, black nitrile gloves when cleaning. Neat, clean, well-fitted.",
  "camera_and_style": "Luxury architectural interior photography, like a premium Australian design magazine. Warm late-afternoon golden sunlight streaming in, long soft shadows. Materials: travertine and pale limestone, cream linen and boucle, natural jute rug, pale oak timber, olive-green accent cushions, eucalyptus stems in stone vases, frameless glass balustrades. Coastal Illawarra, NSW setting: ocean, a green headland and Norfolk Island pines through floor-to-ceiling glass where a view fits. Wide 24mm lens at f/8, deep focus, everything sharp, no background blur, no bokeh. Photorealistic, natural colour, not over-processed.",
  "avoid": "visible faces, eye contact with camera, posed smiles, shallow depth of field, bokeh, portrait lighting, studio lighting, HDR, sparkles, bubbles, glints, lens flare, text, words, logos other than the small chest logo, brand names on products, watermarks, extra fingers, warped hands, warped lines, duplicated objects, plastic CGI look, oversaturated colour"
}
```

### 11. about-van.png  (1536x1024 landscape)

```json
{
  "file_name": "about-van.png",
  "used_on_site": "About page.",
  "size": "1536x1024 landscape",
  "scene": "A plain white van with no writing parked on a quiet coastal street in Wollongong. A crew member seen from behind lifts a cleaning caddy out of the open side door. Ocean glimpse at the end of the street.",
  "composition": "Van and person in the centre third.",
  "people": "No visible faces. Show people from behind, over the shoulder, side-on with the head turned away, or cropped at the shoulders or chest. Hands, gloves, uniform and the work are the subject.",
  "uniform": "Crew uniform (match the reference photos exactly): black short-sleeve polo shirt with thin light-grey contrast piping over the shoulders and down the sides, a small white embroidered logo on the left chest, plain black work trousers, black nitrile gloves when cleaning. Neat, clean, well-fitted.",
  "camera_and_style": "Luxury architectural interior photography, like a premium Australian design magazine. Warm late-afternoon golden sunlight streaming in, long soft shadows. Materials: travertine and pale limestone, cream linen and boucle, natural jute rug, pale oak timber, olive-green accent cushions, eucalyptus stems in stone vases, frameless glass balustrades. Coastal Illawarra, NSW setting: ocean, a green headland and Norfolk Island pines through floor-to-ceiling glass where a view fits. Wide 24mm lens at f/8, deep focus, everything sharp, no background blur, no bokeh. Photorealistic, natural colour, not over-processed.",
  "avoid": "visible faces, eye contact with camera, posed smiles, shallow depth of field, bokeh, portrait lighting, studio lighting, HDR, sparkles, bubbles, glints, lens flare, text, words, logos other than the small chest logo, brand names on products, watermarks, extra fingers, warped hands, warped lines, duplicated objects, plastic CGI look, oversaturated colour"
}
```

## 5. Booking steps (homepage and booking page)

### 12. step-1.png  (1536x1024 landscape)

```json
{
  "file_name": "step-1.png",
  "used_on_site": "Step 1: Tell us about your space.",
  "size": "1536x1024 landscape",
  "scene": "A homeowner's hands on a laptop keyboard at a clean timber kitchen table, a cup of coffee beside it. The laptop screen faces away from the camera and is not visible. Morning light.",
  "composition": "Only hands and forearms visible.",
  "people": "No visible faces. Show people from behind, over the shoulder, side-on with the head turned away, or cropped at the shoulders or chest. Hands, gloves, uniform and the work are the subject.",
  "uniform": "Crew uniform (match the reference photos exactly): black short-sleeve polo shirt with thin light-grey contrast piping over the shoulders and down the sides, a small white embroidered logo on the left chest, plain black work trousers, black nitrile gloves when cleaning. Neat, clean, well-fitted.",
  "camera_and_style": "Luxury architectural interior photography, like a premium Australian design magazine. Warm late-afternoon golden sunlight streaming in, long soft shadows. Materials: travertine and pale limestone, cream linen and boucle, natural jute rug, pale oak timber, olive-green accent cushions, eucalyptus stems in stone vases, frameless glass balustrades. Coastal Illawarra, NSW setting: ocean, a green headland and Norfolk Island pines through floor-to-ceiling glass where a view fits. Wide 24mm lens at f/8, deep focus, everything sharp, no background blur, no bokeh. Photorealistic, natural colour, not over-processed.",
  "avoid": "visible faces, eye contact with camera, posed smiles, shallow depth of field, bokeh, portrait lighting, studio lighting, HDR, sparkles, bubbles, glints, lens flare, text, words, logos other than the small chest logo, brand names on products, watermarks, extra fingers, warped hands, warped lines, duplicated objects, plastic CGI look, oversaturated colour"
}
```

### 13. step-2.png  (1536x1024 landscape)

```json
{
  "file_name": "step-2.png",
  "used_on_site": "Step 2: We confirm the details.",
  "size": "1536x1024 landscape",
  "scene": "A front door of a modern home is open. A crew member, cropped at the shoulders, stands at the door holding a neat grey cleaning caddy, ready to start.",
  "composition": "Door and caddy centred, person cropped at the shoulders.",
  "people": "No visible faces. Show people from behind, over the shoulder, side-on with the head turned away, or cropped at the shoulders or chest. Hands, gloves, uniform and the work are the subject.",
  "uniform": "Crew uniform (match the reference photos exactly): black short-sleeve polo shirt with thin light-grey contrast piping over the shoulders and down the sides, a small white embroidered logo on the left chest, plain black work trousers, black nitrile gloves when cleaning. Neat, clean, well-fitted.",
  "camera_and_style": "Luxury architectural interior photography, like a premium Australian design magazine. Warm late-afternoon golden sunlight streaming in, long soft shadows. Materials: travertine and pale limestone, cream linen and boucle, natural jute rug, pale oak timber, olive-green accent cushions, eucalyptus stems in stone vases, frameless glass balustrades. Coastal Illawarra, NSW setting: ocean, a green headland and Norfolk Island pines through floor-to-ceiling glass where a view fits. Wide 24mm lens at f/8, deep focus, everything sharp, no background blur, no bokeh. Photorealistic, natural colour, not over-processed.",
  "avoid": "visible faces, eye contact with camera, posed smiles, shallow depth of field, bokeh, portrait lighting, studio lighting, HDR, sparkles, bubbles, glints, lens flare, text, words, logos other than the small chest logo, brand names on products, watermarks, extra fingers, warped hands, warped lines, duplicated objects, plastic CGI look, oversaturated colour"
}
```

### 14. step-3.png  (1536x1024 landscape)

```json
{
  "file_name": "step-3.png",
  "used_on_site": "Step 3: Come home to it.",
  "size": "1536x1024 landscape",
  "scene": "A hand placing house keys into a ceramic bowl on a clean console table in a bright, spotless entry hall. Fresh flowers in a simple vase, oak floor beyond.",
  "composition": "Only the hand is visible, not in uniform (this is the homeowner).",
  "people": "No people in this image.",
  "camera_and_style": "Luxury architectural interior photography, like a premium Australian design magazine. Warm late-afternoon golden sunlight streaming in, long soft shadows. Materials: travertine and pale limestone, cream linen and boucle, natural jute rug, pale oak timber, olive-green accent cushions, eucalyptus stems in stone vases, frameless glass balustrades. Coastal Illawarra, NSW setting: ocean, a green headland and Norfolk Island pines through floor-to-ceiling glass where a view fits. Wide 24mm lens at f/8, deep focus, everything sharp, no background blur, no bokeh. Photorealistic, natural colour, not over-processed.",
  "avoid": "visible faces, eye contact with camera, posed smiles, shallow depth of field, bokeh, portrait lighting, studio lighting, HDR, sparkles, bubbles, glints, lens flare, text, words, logos other than the small chest logo, brand names on products, watermarks, extra fingers, warped hands, warped lines, duplicated objects, plastic CGI look, oversaturated colour"
}
```

## 6. Booking page

### 15. booking-hero.png  (1536x1024 landscape)

```json
{
  "file_name": "booking-hero.png",
  "used_on_site": "Booking page header, full width behind the booking steps.",
  "size": "1536x1024 landscape",
  "scene": "A calm, bright, perfectly clean open-plan living and dining space in a coastal home. Morning light, linen, oak, stone, a sea view through large windows.",
  "composition": "Calm, low-detail left half so booking text can sit there.",
  "people": "No people in this image.",
  "camera_and_style": "Luxury architectural interior photography, like a premium Australian design magazine. Warm late-afternoon golden sunlight streaming in, long soft shadows. Materials: travertine and pale limestone, cream linen and boucle, natural jute rug, pale oak timber, olive-green accent cushions, eucalyptus stems in stone vases, frameless glass balustrades. Coastal Illawarra, NSW setting: ocean, a green headland and Norfolk Island pines through floor-to-ceiling glass where a view fits. Wide 24mm lens at f/8, deep focus, everything sharp, no background blur, no bokeh. Photorealistic, natural colour, not over-processed.",
  "avoid": "visible faces, eye contact with camera, posed smiles, shallow depth of field, bokeh, portrait lighting, studio lighting, HDR, sparkles, bubbles, glints, lens flare, text, words, logos other than the small chest logo, brand names on products, watermarks, extra fingers, warped hands, warped lines, duplicated objects, plastic CGI look, oversaturated colour"
}
```

### 16. booking-done.png  (1536x1024 landscape)

```json
{
  "file_name": "booking-done.png",
  "used_on_site": "Booking confirmation screen.",
  "size": "1536x1024 landscape",
  "scene": "A neat grey cleaning caddy with folded microfibre cloths and unbranded bottles, set down on a clean timber floor in a bright hallway. A crew member's legs in black trousers are visible at the edge of the frame.",
  "composition": "Caddy centred, no product labels visible.",
  "people": "No visible faces. Show people from behind, over the shoulder, side-on with the head turned away, or cropped at the shoulders or chest. Hands, gloves, uniform and the work are the subject.",
  "uniform": "Crew uniform (match the reference photos exactly): black short-sleeve polo shirt with thin light-grey contrast piping over the shoulders and down the sides, a small white embroidered logo on the left chest, plain black work trousers, black nitrile gloves when cleaning. Neat, clean, well-fitted.",
  "camera_and_style": "Luxury architectural interior photography, like a premium Australian design magazine. Warm late-afternoon golden sunlight streaming in, long soft shadows. Materials: travertine and pale limestone, cream linen and boucle, natural jute rug, pale oak timber, olive-green accent cushions, eucalyptus stems in stone vases, frameless glass balustrades. Coastal Illawarra, NSW setting: ocean, a green headland and Norfolk Island pines through floor-to-ceiling glass where a view fits. Wide 24mm lens at f/8, deep focus, everything sharp, no background blur, no bokeh. Photorealistic, natural colour, not over-processed.",
  "avoid": "visible faces, eye contact with camera, posed smiles, shallow depth of field, bokeh, portrait lighting, studio lighting, HDR, sparkles, bubbles, glints, lens flare, text, words, logos other than the small chest logo, brand names on products, watermarks, extra fingers, warped hands, warped lines, duplicated objects, plastic CGI look, oversaturated colour"
}
```
