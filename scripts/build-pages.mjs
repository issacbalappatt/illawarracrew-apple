// Builds a static, trial-only copy of the site for GitHub Pages at /illawarracrew-apple/.
// Safety: forms cannot reach the live Supabase project, and Google tags are switched off,
// so the hosted trial never creates real leads or touches Ads/Analytics data.
//
// Usage: node scripts/build-pages.mjs   (output in dist-pages/)
import {execSync, spawn} from 'node:child_process';
import {cpSync, existsSync, mkdirSync, readFileSync, readdirSync, renameSync, rmSync, statSync, writeFileSync} from 'node:fs';
import {join, resolve, extname, dirname} from 'node:path';

const BASE = '/illawarracrew-apple';
const PORT = 4174;
const root = process.cwd();
const gen = resolve(root, '.generated-site');
const out = resolve(root, 'dist-pages');
const run = (cmd, cwd = root) => execSync(cmd, {cwd, stdio: 'inherit'});

// 1. Fresh generated site, keeping installed node_modules if present.
const keep = resolve(root, '.nm-keep');
if (existsSync(join(gen, 'node_modules'))) renameSync(join(gen, 'node_modules'), keep);
run('node scripts/prepare-site.mjs');
if (existsSync(keep)) renameSync(keep, join(gen, 'node_modules'));
else run('npm install --legacy-peer-deps', gen);

// 2. Trial-only patches.
const patch = (file, from, to) => {
  const p = join(gen, file);
  const s = readFileSync(p, 'utf8');
  if (!s.includes(from)) throw Error(`Patch anchor not found in ${file}: ${from}`);
  writeFileSync(p, s.replace(from, to));
};
patch('src/router.tsx', '    routeTree,\n', `    routeTree,\n    basepath: '${BASE}',\n`);
patch('vite.config.ts', '  vite: {\n', `  vite: {\n    base: '${BASE}/',\n`);
patch('src/routes/__root.tsx', 'function loadGtag() {\n', 'function loadGtag() {\n  return; // Trial copy: no Google tags.\n');
writeFileSync(join(gen, '.env'), [
  'VITE_SUPABASE_URL=https://trial-disabled.invalid',
  'VITE_SUPABASE_PUBLISHABLE_KEY=trial-disabled',
  'VITE_SUPABASE_PROJECT_ID=trial-disabled',
  '',
].join('\n'));

// 3. Build.
run('npm run build', gen);

// 4. Render every page from the built worker.
const sitemap = readFileSync(join(gen, 'public/sitemap.xml'), 'utf8');
const paths = new Set(['/', '/book', '/booking', '/quote', '/contact', '/login', '/thank-you']);
paths.add('/journal');
for (const a of JSON.parse(readFileSync(join(root, 'overrides/journal.json'), 'utf8'))) paths.add(`/journal/${a.slug}`);
for (const m of sitemap.matchAll(/<loc>https?:\/\/[^/<]+(\/[^<]*)<\/loc>/g)) paths.add(m[1].replace(/\/$/, '') || '/');

const worker = spawn('npx', ['wrangler', 'dev', '--config', '.output/server/wrangler.json', '--compatibility-date', '2026-10-30', '--port', String(PORT)], {cwd: gen, stdio: ['ignore', 'pipe', 'pipe'], detached: true});
const wait = ms => new Promise(r => setTimeout(r, ms));
let ready = false;
for (let i = 0; i < 60 && !ready; i++) {
  await wait(1000);
  try { ready = (await fetch(`http://localhost:${PORT}${BASE}/`)).ok; } catch {}
}
if (!ready) { process.kill(-worker.pid); throw Error('Worker did not start'); }

rmSync(out, {recursive: true, force: true});
cpSync(join(gen, '.output/public'), out, {recursive: true});
const failed = [];
for (const p of paths) {
  const res = await fetch(`http://localhost:${PORT}${BASE}${p === '/' ? '/' : p}`);
  if (!res.ok) { failed.push(`${p} ${res.status}`); continue; }
  const file = p === '/' ? join(out, 'index.html') : join(out, p.slice(1), 'index.html');
  mkdirSync(dirname(file), {recursive: true});
  writeFileSync(file, await res.text());
}
process.kill(-worker.pid);

// 5. Prefix root-absolute public asset paths with the base path.
const prefixes = ['media/', 'brand/', 'lovable-uploads/', 'fonts/', 'gallery/', 'ai/', 'favicon.ico', 'og-image.png', 'placeholder.svg'];
const re = new RegExp(`(["'(\`=\\s,])/(${prefixes.map(x => x.replace('.', '\\.')).join('|')})`, 'g');
const walk = d => readdirSync(d).flatMap(f => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
let changed = 0;
for (const f of walk(out)) {
  if (!['.html', '.js', '.css', '.json'].includes(extname(f))) continue;
  const s = readFileSync(f, 'utf8');
  let t = s.replace(re, `$1${BASE}/$2`);
  if (extname(f) === '.html' && !t.includes('name="robots" content="noindex')) t = t.replace(/<head>/i, '<head><meta name="robots" content="noindex, nofollow">');
  if (t !== s) { writeFileSync(f, t); changed++; }
}

// 6. Safety net: any stray root link (/booking) lands on the trial copy instead of a 404.
writeFileSync(join(out, '404.html'), `<!doctype html><meta charset="utf-8"><title>Redirecting</title><script>
var b='${BASE}',p=location.pathname;if(p.indexOf(b+'/')!==0&&p!==b){location.replace(b+p+location.search+location.hash)}else{document.write('<p style="font:16px system-ui;padding:40px">Page not found. <a href="'+b+'/">Go to the homepage</a>.</p>')}
</script>`);
writeFileSync(join(out, '.nojekyll'), '');

console.log(`Rendered ${paths.size - failed.length} pages, rewrote ${changed} files.`);
if (failed.length) console.log('Failed:', failed.join(', '));
