import LocalImage from "@/lib/components/local-image";
import { createHash } from "node:crypto";
import type { ReactNode } from "react";
function inline(text: string): ReactNode[] {
  return text
    .split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|_[^_]+_)/g)
    .map((part, i) => {
      if (part.startsWith("**"))
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      if (part.startsWith("_")) return <em key={i}>{part.slice(1, -1)}</em>;
      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link && /^https?:\/\//.test(link[2]))
        return (
          <a key={i} href={link[2]} target="_blank" rel="noreferrer">
            {link[1]}
          </a>
        );
      return part.replace(/\*\*|[\u00ad\u200d]/g, "");
    });
}
export default function ArticleContent({ content }: { content: string }) {
  const clean = content.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    "\n\n![$1]($2)\n\n",
  );
  const blocks = clean.split(/\n\s*\n/).filter((x) => x.trim());
  let imageCount = 0;
  return (
    <div className="article-prose">
      {blocks.map((block, i) => {
        const img = block.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        if (img) {
          imageCount++;
          if (imageCount > 8) return null;
          const local =
            "/media/" +
            createHash("sha1")
              .update(img[2].split("?")[0])
              .digest("hex")
              .slice(0, 12) +
            ".webp";
          return (
            <figure key={i}>
              <LocalImage
                src={local}
                alt={
                  /\.(jpg|png|jpeg)/i.test(img[1])
                    ? "A moment from the journey"
                    : img[1] || "A moment from the journey"
                }
                loading="lazy"
                width="1000"
                height="750"
              />
            </figure>
          );
        }
        if (/^#+ /.test(block))
          return <h2 key={i}>{inline(block.replace(/^#+ /, ""))}</h2>;
        if (block.startsWith(">"))
          return (
            <blockquote key={i}>
              {inline(block.replace(/^>\s*/gm, ""))}
            </blockquote>
          );
        if (block.startsWith("- "))
          return (
            <ul key={i}>
              {block.split(/\n- /).map((line, j) => (
                <li key={j}>{inline(line.replace(/^- /, ""))}</li>
              ))}
            </ul>
          );
        return <p key={i}>{inline(block)}</p>;
      })}
    </div>
  );
}
