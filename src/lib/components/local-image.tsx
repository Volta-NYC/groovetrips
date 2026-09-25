import type { ImgHTMLAttributes } from "react";
import dimensions from "@/lib/data/image-dimensions.json";
const imageSizes: Record<string, number[]> = dimensions;
export default function LocalImage({
  src,
  sizes = "(max-width: 760px) 86vw, 42vw",
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  const width = typeof src === "string" ? imageSizes[src]?.[0] : undefined;
  const candidates = new Map<number, string>();
  if (width && typeof src === "string") {
    candidates.set(Math.min(480, width), src.replace(".webp", "-480.webp"));
    candidates.set(Math.min(960, width), src.replace(".webp", "-960.webp"));
    candidates.set(width, src);
  }
  const srcSet = Array.from(candidates.entries())
    .map(([w, url]) => `${url} ${w}w`)
    .join(", ");
  return (
    <img
      {...props}
      src={src}
      sizes={srcSet ? sizes : undefined}
      srcSet={srcSet || undefined}
      decoding="async"
    />
  );
}
