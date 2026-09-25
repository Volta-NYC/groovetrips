import LocalImage from "@/lib/components/local-image";
import JoinSection from "@/lib/components/join-section";
import images from "@/lib/data/source-images.json";
export const metadata = {
  title: "Our groove",
  description:
    "Meet Jannelle Cortes and the GrooveTrips community. Culturally rich travel rooted in connection, inclusion, and local partnerships.",
};
export default function About() {
  const gallery = images["www.groovetrips.com_gallery-3.md"];
  return (
    <>
      <section className="page-heading section">
        <p className="eyebrow">THIS IS OUR GROOVE</p>
        <h1>
          Travel is a place.
          <br />
          <em>Connection is the point.</em>
        </h1>
        <p>
          We’re building a world where travel is personal, accessible,
          <br />
          and rooted in the communities that welcome us.
        </p>
      </section>
      <div className="about-banner">
        <LocalImage
          src={gallery[16].src}
          alt={gallery[16].alt}
          fetchPriority="high"
        />
      </div>
      <section className="founder-section section about-founder">
        <div className="founder-portrait">
          <LocalImage
            src="/media/18808ed5195a.webp"
            alt="Jannelle Cortes, founder of GrooveTrips"
            width="750"
            height="900"
          />
          <span>FOUNDER · CHOREOGRAPHER · TRAVEL ADVOCATE</span>
        </div>
        <div className="founder-copy">
          <p className="eyebrow">MEET JANNELLE CORTES</p>
          <h2>
            A life in motion.
            <br />
            <em>A world of connection.</em>
          </h2>
          <p>
            Jannelle is a second-generation travel professional and
            first-generation Dominican-American entrepreneur who brings together
            two lifelong passions: dance and travel.
          </p>
          <p>
            After a 20-year career as a choreographer in New York City, she
            founded GrooveTrips to create immersive, culturally rich travel
            experiences for artists and adventurers.
          </p>
          <p>
            Working with local vendors, guides, artists, and wellness
            professionals, she designs and leads journeys that are meaningful
            for travelers and the communities they visit.
          </p>
          <p>
            She is also a Brand Ambassador for Capezio in Cuba and a
            correspondent for CaribbeanOneTV, amplifying diverse voices across
            travel and the arts.
          </p>
        </div>
      </section>
      <section className="mission-section section">
        <p className="eyebrow">THE REASON WE GO</p>
        <h2>
          Find your travel tribe.
          <br />
          <em>Journey with purpose.</em>
        </h2>
        <div className="mission-columns">
          <p>
            Our mission is to make travel accessible, meaningful, and beneficial
            for everyone involved. We connect like-minded travelers and partner
            directly with local artists, guides, and vendors.
          </p>
          <p>
            Created with BIPOC travelers in mind, GrooveTrips makes room for
            people to feel safe, supported, and seen. Our community of over
            1,200 GrooveTrippers shares a belief that the world is better
            explored together.
          </p>
        </div>
      </section>
      <JoinSection />
    </>
  );
}
