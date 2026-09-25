import fs from "node:fs/promises";
import sharp from "sharp";

const names = (await fs.readdir("public/media")).filter((name) =>
  /^[a-f0-9]{12}\.webp$/.test(name),
);
const dimensions = {};
let next = 0;

async function work() {
  while (next < names.length) {
    const name = names[next++];
    const metadata = await sharp(`public/media/${name}`).metadata();
    dimensions[`/media/${name}`] = [metadata.width, metadata.height];
    for (const width of [480, 960]) {
      const output = `public/media/${name.replace(".webp", `-${width}.webp`)}`;
      try {
        await fs.access(output);
      } catch {
        await sharp(`public/media/${name}`)
          .resize({ width, withoutEnlargement: true })
          .webp({ quality: 76 })
          .toFile(output);
      }
    }
  }
}

await Promise.all(Array.from({ length: 6 }, work));
await fs.writeFile(
  "src/lib/data/image-dimensions.json",
  JSON.stringify(dimensions),
);
console.log(`Prepared responsive sizes for ${names.length} local images.`);
