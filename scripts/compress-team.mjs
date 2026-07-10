import sharp from "sharp";
import { readdirSync, statSync, renameSync, unlinkSync } from "fs";
import { join } from "path";

const dir = "src/assets/team";
const files = readdirSync(dir).filter(f => f.endsWith(".png"));
let saved = 0;
for (const f of files) {
  const src = join(dir, f);
  const out = src.replace(/\.png$/, ".jpg");
  const before = statSync(src).size;
  await sharp(src)
    .resize({ width: 900, height: 900, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toFile(out);
  const after = statSync(out).size;
  saved += (before - after);
  unlinkSync(src);
  console.log(`${f}: ${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB`);
}
console.log(`Total saved: ${(saved/1024/1024).toFixed(2)} MB`);
