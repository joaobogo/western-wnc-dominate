import sharp from "sharp";
import { readdirSync, statSync, unlinkSync } from "fs";
import { join, extname } from "path";

const dirs = ["src/assets/gallery", "src/assets/blog", "src/assets/heroes", "src/assets"];
let saved = 0, count = 0;

async function processDir(dir) {
  let entries;
  try { entries = readdirSync(dir); } catch { return; }
  for (const f of entries) {
    const p = join(dir, f);
    let st; try { st = statSync(p); } catch { continue; }
    if (st.isFile()) {
      const ext = extname(f).toLowerCase();
      if (![".jpg",".jpeg",".webp",".png"].includes(ext)) continue;
      if (st.size < 250 * 1024) continue; // only >250KB
      const tmp = p + ".opt";
      try {
        let pipeline = sharp(p).resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: true });
        if (ext === ".webp") pipeline = pipeline.webp({ quality: 78 });
        else if (ext === ".png") pipeline = pipeline.png({ compressionLevel: 9, palette: true });
        else pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true, progressive: true });
        await pipeline.toFile(tmp);
        const after = statSync(tmp).size;
        if (after < st.size * 0.95) {
          unlinkSync(p);
          const { renameSync } = await import("fs");
          renameSync(tmp, p);
          saved += (st.size - after);
          count++;
          console.log(`${f}: ${(st.size/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB`);
        } else {
          unlinkSync(tmp);
        }
      } catch (e) { console.warn("skip", p, e.message); }
    } else if (st.isDirectory() && !p.includes("node_modules")) {
      await processDir(p);
    }
  }
}
for (const d of dirs) await processDir(d);
console.log(`\nCompressed ${count} files, saved ${(saved/1024/1024).toFixed(2)} MB`);
