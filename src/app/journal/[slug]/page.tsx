import { notFound } from "next/navigation";
import Link from "next/link";
import posts from "@/lib/data/posts.json";
import ArticleContent from "@/lib/components/article-content";
import JoinSection from "@/lib/components/join-section";
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  return { title: post?.title || "Story not found" };
}
export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  return (
    <>
      <header className="article-heading section">
        <Link href="/journal" className="back-link">
          ← The travel journal
        </Link>
        <p className="eyebrow">STORIES WITH SOUL</p>
        <h1>{post.title}</h1>
        <p>
          {post.author} <span> / </span> {post.date}
        </p>
      </header>
      <article>
        <ArticleContent content={post.content} />
      </article>
      <div className="article-end">
        <Link href="/journal" className="text-link">
          More from the road <span>↗</span>
        </Link>
      </div>
      <JoinSection />
    </>
  );
}
