// Extract slug/title/category/town/excerpt from src/data/blogs.ts by loading it via a tsx eval trick.
// Simpler: regex parse. Each post object contains slug: "...", title: "...", excerpt: "...", category: "...", optional town: "...".
import fs from 'fs';
const src = fs.readFileSync('src/data/blogs.ts','utf8');
// Split at each `slug: "..."` and capture surrounding fields until next slug or end of block.
const slugRe = /slug:\s*"([^"]+)"/g;
const positions = [];
let m; while ((m = slugRe.exec(src))) positions.push({slug:m[1], idx:m.index});
const out = [];
for (let i=0;i<positions.length;i++){
  const start = positions[i].idx;
  const end = i+1<positions.length ? positions[i+1].idx : Math.min(start+8000, src.length);
  const chunk = src.slice(start, end);
  const grab = (k)=>{ const r = new RegExp(k+':\\s*"((?:[^"\\\\]|\\\\.)*)"'); const mm = chunk.match(r); return mm ? mm[1] : ''; };
  out.push({
    slug: positions[i].slug,
    title: grab('title'),
    excerpt: grab('excerpt'),
    category: grab('category'),
    town: grab('town'),
  });
}
fs.writeFileSync('/tmp/blogimg/posts.json', JSON.stringify(out,null,2));
console.log('extracted', out.length);
