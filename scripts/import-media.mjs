import fs from "node:fs/promises";
import crypto from "node:crypto";
import sharp from "sharp";
const sources = {};
async function scan(folder) {
  for (const entry of await fs.readdir(folder, { withFileTypes: true })) {
    const file = `${folder}/${entry.name}`;
    if (entry.isDirectory()) {
      await scan(file);
      continue;
    }
    if (!entry.name.endsWith(".md")) continue;
    const text = await fs.readFile(file, "utf8");
    const matches =
      text.match(
        /https?:\/\/[^\s<>"\)]+?\.(?:jpe?g|png|webp|gif|avif|svg|mp4|mov|webm)(?=[^a-zA-Z]|$)/gi,
      ) || [];
    for (const url of matches) (sources[url] ??= []).push(entry.name);
  }
}
await scan("raw messy data");
await fs.mkdir("public/media", { recursive: true });
await fs.mkdir("src/lib/data", { recursive: true });
const entries = Object.entries(sources).sort(
  (a, b) =>
    Number(
      !a[1].some((x) =>
        /upcomingtrips.md|about-us.md|gallery-3.md|com_\.md/.test(x),
      ),
    ) -
    Number(
      !b[1].some((x) =>
        /upcomingtrips.md|about-us.md|gallery-3.md|com_\.md/.test(x),
      ),
    ),
);
const manifest = {};
let next = 0,
  done = 0;
async function worker() {
  while (next < entries.length) {
    const [url, pages] = entries[next++];
    const id = crypto.createHash("sha1").update(url).digest("hex").slice(0, 12);
    const local = `/media/${id}.webp`;
    try {
      let bytes;
      try {
        await fs.access(`public${local}`);
      } catch {
        const response = await fetch(url, {
          signal: AbortSignal.timeout(45000),
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        bytes = Buffer.from(await response.arrayBuffer());
        await sharp(bytes)
          .rotate()
          .resize({
            width: 1920,
            height: 1920,
            fit: "inside",
            withoutEnlargement: true,
          })
          .webp({ quality: 80 })
          .toFile(`public${local}`);
      }
      manifest[url] = { local, pages, status: "ok" };
    } catch (e) {
      manifest[url] = { pages, status: "failed", error: String(e) };
    }
    done++;
    if (done % 30 === 0) {
      await fs.writeFile(
        "src/lib/data/media-manifest.json",
        JSON.stringify(manifest, null, 2),
      );
      console.log(`${done}/${entries.length}`);
    }
  }
}
await Promise.all(Array.from({ length: 10 }, worker));
await fs.writeFile(
  "src/lib/data/media-manifest.json",
  JSON.stringify(manifest, null, 2),
);
console.log(
  JSON.stringify({
    downloaded: Object.values(manifest).filter((x) => x.status === "ok").length,
    failed: Object.entries(manifest).filter(([, x]) => x.status !== "ok"),
  }),
);
