import fs from 'fs';
import path from 'path';
const dir = 'src/assets/blog';
const map = {};
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.asset.json')) continue;
  const slug = f.replace(/\.png\.asset\.json$/,'');
  const j = JSON.parse(fs.readFileSync(path.join(dir,f),'utf8'));
  map[slug] = j.url;
}
console.error('slugs with images:', Object.keys(map).length);

let src = fs.readFileSync('src/data/blogs.ts','utf8');
// For each slug in map, find its post block and replace the `image: X,` line.
let updated = 0, missed = [];
for (const [slug, url] of Object.entries(map)) {
  // Find slug occurrence
  const re = new RegExp(`(slug:\\s*"${slug.replace(/[-/\\^$*+?.()|[\\]{}]/g,'\\\\$&')}"[\\s\\S]{0,3000}?)image:\\s*[^,\\n]+,`, 'm');
  const before = src;
  src = src.replace(re, (m,p1)=> `${p1}image: "${url}",`);
  if (src !== before) updated++; else missed.push(slug);
}
fs.writeFileSync('src/data/blogs.ts', src);
console.error('updated:', updated, 'missed:', missed.length);
if (missed.length) console.error(missed.slice(0,10));
