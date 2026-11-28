/*
  Makes small WebP versions of the website pictures.
  Run:  npm run images
  - process-01..04  -> 800 x 600 WebP  (cropped to 4:3, exactly what the cards show)
  - res/com/ind before/after -> max 1000 px wide WebP (not cropped, so object-position tweaks in CSS still work)
  Your original files are NOT touched. After checking the site you can delete the old .jpeg files.
*/
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const DIR = "public/images";
const JOBS = [
  { match: /^process-0\d\.jpe?g$/i, resize: { width: 800, height: 600, fit: "cover", position: "centre" }, quality: 78 },
  { match: /^(res|com|ind)-(before|after)\.jpe?g$/i, resize: { width: 1000, withoutEnlargement: true }, quality: 78 },
];

const kb = (n) => `${Math.round(n / 1024)} KB`;
const files = (await fs.readdir(DIR)).sort();
const rows = [];

for (const file of files) {
  const job = JOBS.find((j) => j.match.test(file));
  if (!job) continue;
  const input = path.join(DIR, file);
  const output = path.join(DIR, file.replace(/\.jpe?g$/i, ".webp"));
  const before = await sharp(input).metadata();
  const info = await sharp(input).rotate().resize(job.resize).webp({ quality: job.quality, effort: 5 }).toFile(output);
  rows.push({
    file,
    "original": `${before.width}x${before.height}`,
    "orig size": kb((await fs.stat(input)).size),
    "webp": `${info.width}x${info.height}`,
    "webp size": kb(info.size),
  });
}

if (rows.length === 0) console.log(`No matching pictures found in ${DIR}`);
else console.table(rows);
