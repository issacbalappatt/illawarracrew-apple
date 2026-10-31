import {cpSync, existsSync, readFileSync, readdirSync, rmSync, writeFileSync, mkdirSync} from 'node:fs';
import {resolve, join, dirname} from 'node:path';

const root = process.cwd();
const source = resolve(root, 'upstream-site');
const target = resolve(root, '.generated-site');

if (!existsSync(join(source, 'package.json'))) throw Error('Initialise private source: git submodule update --init --recursive');

// 1. Copy the full original site, without secrets, Git metadata or build output.
rmSync(target, {recursive: true, force: true});
cpSync(source, target, {
  recursive: true,
  filter: p => {
    const rel = p.slice(source.length).replaceAll('\\', '/');
    return !/^\/\.env$|^\/\.git|^\/node_modules|^\/\.output|^\/dist/.test(rel);
  },
});

// 2. Replace the homepage and navigation.
for (const [from, to] of [
  ['Index.tsx', 'src/pages/Index.tsx'],
  ['Navbar.tsx', 'src/components/layout/Navbar.tsx'],
  ['Book.tsx', 'src/pages/Book.tsx'],
  ['book.route.tsx', 'src/routes/book.tsx'],
]) {
  const out = join(target, to);
  mkdirSync(dirname(out), {recursive: true});
  cpSync(join(root, 'overrides', from), out);
}

// 3. Mark the layout shell so the theme can scope itself.
const layout = join(target, 'src/components/layout/Layout.tsx');
let shell = readFileSync(layout, 'utf8');
if (!shell.includes('apple-site')) {
  if (!shell.includes('min-h-screen flex flex-col bg-background')) throw Error('Layout shell changed, inspect before patching');
  shell = shell.replace('min-h-screen flex flex-col bg-background', 'apple-site min-h-screen flex flex-col bg-background');
  writeFileSync(layout, shell);
}

// 3b. Trial-only patches: hide floating call buttons on /book, and let the booking form
//     read the details the /book configurator passes in the query string.
{
  let t = readFileSync(layout, 'utf8');
  if (!t.includes("'/book',")) { t = t.replace("['/booking', '/quote'", "['/booking', '/book', '/quote'"); writeFileSync(layout, t); }
  const form = join(target, 'src/components/forms/EnhancedBookingForm.tsx');
  let f = readFileSync(form, 'utf8');
  const anchor = '    handleServiceTypeSelect(mapped);\n';
  if (f.includes(anchor) && !f.includes('ICC trial prefill')) {
    f = f.replace(anchor, anchor + [
      '    // ICC trial prefill: details chosen on /book.',
      "    const num = (k: string) => { const v = Number((params.get(k) || '').replace(/\"/g, '')); return Number.isFinite(v) && v > 0 ? v : null; };",
      "    const pBeds = num('beds'), pToilets = num('toilets'), pRooms = num('rooms'), pHours = num('hours');",
      "    const pDate = params.get('date');",
      '    setFormData(prev => ({ ...prev,',
      '      ...(pBeds ? { beds: pBeds } : {}), ...(pToilets ? { toilets: pToilets } : {}), ...(pRooms ? { rooms: pRooms } : {}),',
      '      ...(pHours ? { hours: pHours } : {}), ...(pDate && /^\\d{4}-\\d{2}-\\d{2}$/.test(pDate) ? { date: pDate } : {}) }));',
      '',
    ].join('\n'));
    writeFileSync(form, f);
  } else if (!f.includes('ICC trial prefill')) console.warn('Booking form prefill anchor not found; skipped.');
}

// 4. Append the design CSS.
const styles = join(target, 'src/styles.css');
writeFileSync(styles, readFileSync(styles, 'utf8') + '\n' + readFileSync(join(root, 'overrides/apple-theme.css'), 'utf8'));

// 5. Images. Every image in overrides/media/ is published as /media/apple/<name>.<ext>
//    and exposed as appleMedia['<name>']. Required slots fall back to a real team photo.
const fallbacks = {
  'hero': 'waterfront-balcony.webp',
  'band-living': 'open-plan-living.webp',
  'service-house': 'open-plan-living.webp',
  'service-deep': 'marble-bathroom-spa.webp',
  'service-lease': 'large-living-vacate.webp',
  'service-office': 'kitchen-island-granite.webp',
  'service-carpet': 'carpet-steam-clean.webp',
  'service-airbnb': 'bedroom-cleaning.webp',
  'room-kitchen': 'kitchen-white-marble.webp',
  'room-bathroom': 'ensuite-walk-in-shower.webp',
  'room-living': 'living-room-vacate.webp',
  'room-laundry': 'tiled-rumpus-room.webp',
  'detail-faucet': 'basin-detail-cropped.webp',
  'detail-rangehood': 'oven-deep-clean.webp',
  'detail-linen': 'bedroom-cleaning.webp',
  'step-1': 'apartment-kitchen-grey.webp',
  'step-2': 'cleaner-tiled-oven-wall.webp',
  'step-3': 'heritage-kitchen-window.webp',
  'finale': 'waterfront-arched-verandah.webp',
  'booking-hero': 'kitchen-island-granite.webp',
};
const mediaIn = join(root, 'overrides/media');
const mediaOut = join(target, 'public/media/apple');
mkdirSync(mediaOut, {recursive: true});
const manifest = {};
const custom = [];
for (const file of existsSync(mediaIn) ? readdirSync(mediaIn) : []) {
  const m = file.match(/^([a-z0-9-]+)\.(webp|avif|jpg|jpeg|png)$/);
  if (!m || file.startsWith('uniform-reference')) continue;
  cpSync(join(mediaIn, file), join(mediaOut, file));
  if (!manifest[m[1]] || m[2] === 'webp') manifest[m[1]] = `/media/apple/${file}`;
  if (!custom.includes(m[1])) custom.push(m[1]);
}
for (const [slot, fallback] of Object.entries(fallbacks)) {
  if (manifest[slot]) continue;
  if (!existsSync(join(target, 'public/media', fallback))) throw Error('Fallback photo missing: ' + fallback);
  manifest[slot] = `/media/${fallback}`;
}
writeFileSync(
  join(target, 'src/lib/appleMedia.generated.ts'),
  '// Generated by scripts/prepare-site.mjs. Do not edit.\n' +
  `export const appleMedia = ${JSON.stringify(manifest, null, 2)} as const;\n` +
  `export const appleCustomMedia: readonly string[] = ${JSON.stringify(custom)};\n`,
);

console.log('Prepared full site with preserved routes, media, SEO and booking code.');
console.log(`Images: ${custom.length} custom, ${Object.keys(manifest).length - custom.length} using existing photos.`);
