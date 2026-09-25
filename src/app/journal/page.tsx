import LocalImage from "@/lib/components/local-image";
import Link from "next/link";
import posts from "@/lib/data/posts.json";
import JoinSection from "@/lib/components/join-section";
export const metadata = {
  title: "Travel journal",
  description:
    "Personal stories from the road, cultural connections, and memorable journeys with the GrooveTrips community.",
};
export default function Journal() {
  return (
    <>
      <section className="page-heading section">
        <p className="eyebrow">POSTCARDS FROM THE ROAD</p>
        <h1>
          A world of
          <br />
          <em>good stories.</em>
        </h1>
        <p>
          The places that move us. The people who stay with us.
          <br />
          Notes, reflections, and discoveries from the GrooveTrips family.
        </p>
      </section>
      <section className="section journal-index">
        <div className="journal-grid">
          {posts.map((post) => (
            <Link
              href={`/journal/${post.slug}`}
              className="journal-card"
              key={post.slug}
            >
              <div className="journal-image">
                <LocalImage
                  src={post.image}
                  alt=""
                  loading="lazy"
                  width="700"
                  height="500"
                />
                <span>↗</span>
              </div>
              <p className="journal-meta">
                {post.author}
                <span>{post.date}</span>
              </p>
              <h3>{post.title}</h3>
              <span className="journal-read">Read the story ↗</span>
            </Link>
          ))}
        </div>
      </section>
      <JoinSection />
    </>
  );
}
