import film from "@/lib/data/film.json";
import LocalImage from "@/lib/components/local-image";
import Link from "next/link";
import images from "@/lib/data/source-images.json";
import trips from "@/lib/data/trips.json";
import posts from "@/lib/data/posts.json";
import CinematicHero from "@/lib/components/cinematic-hero";
import TripCard from "@/lib/components/trip-card";
import JoinSection from "@/lib/components/join-section";
import Reveal from "@/lib/components/reveal";
const gallery = images["www.groovetrips.com_gallery-3.md"];
export default function HomePage() {
  return (
    <>
      <CinematicHero poster={film.poster} videoSrc={film.src ?? undefined} />
      <div className="belief-strip">
        <span>LOCALLY ROOTED</span>
        <i>✳</i>
        <span>CULTURALLY CURIOUS</span>
        <i>✳</i>
        <span>COMMUNITY FIRST</span>
        <i>✳</i>
        <span>ALWAYS IN GOOD COMPANY</span>
      </div>
      <section className="intro section" id="intro" data-reveal>
        <p className="eyebrow">MORE THAN A GETAWAY</p>
        <h2>
          Go somewhere new.
          <br />
          <em>Come back more you.</em>
        </h2>
        <p>
          Some trips change your scenery. The best ones change your perspective.
          We bring curious people together for immersive journeys filled with
          local culture, shared rhythms, and real connection.
        </p>
        <Link className="text-link" href="/about">
          This is how we groove <span>↗</span>
        </Link>
        <span className="intro-coordinate">
          CULTURE × CONNECTION × COMMUNITY
        </span>
      </section>
      <section className="trip-section section" id="trips">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">THE WORLD IS CALLING</p>
            <h2>
              Where to <em>next?</em>
            </h2>
          </div>
          <div>
            <p>
              Find the place that moves you.
              <br />
              We’ll bring the people who get you.
            </p>
            <Link className="text-link" href="/trips">
              Explore all trips <span>↗</span>
            </Link>
          </div>
        </div>
        <div className="trip-grid">
          {trips.slice(0, 3).map((trip, i) => (
            <TripCard key={trip.slug} trip={trip} index={i} />
          ))}
        </div>
        <div className="collection-note">
          <span>THOUGHTFULLY CURATED. PERSONALLY HOSTED.</span>
          <span>2026 — 2027</span>
        </div>
      </section>
      <section className="community-section">
        <div className="community-photo" data-reveal>
          <LocalImage
            src={gallery[28].src}
            alt={gallery[28].alt}
            loading="lazy"
            width="1000"
            height="1150"
          />
          <span className="photo-caption">
            GOOD TIMES. EVEN BETTER COMPANY.
          </span>
          <div className="photo-stamp">
            COME AS YOU ARE
            <br />
            <b>
              Leave
              <br />
              <em>connected.</em>
            </b>
            <span>THE GROOVETRIPS WAY</span>
          </div>
        </div>
        <div className="community-copy" data-reveal>
          <p className="eyebrow">YOUR PEOPLE ARE OUT THERE</p>
          <h2>
            Different stories.
            <br />
            <em>One shared rhythm.</em>
          </h2>
          <p>
            A shared meal in Havana. A dance class with local artists. The quiet
            of a Thai temple. We believe the most memorable part of a place is
            the people you meet along the way.
          </p>
          <p>
            Created with BIPOC travelers in mind and a place for everyone,
            GrooveTrips is a community where you can show up as yourself.
          </p>
          <div className="community-stat">
            <strong>
              1,200<span>+</span>
            </strong>
            <span>
              GrooveTrippers.
              <br />
              And room for you.
            </span>
          </div>
          <Link href="/about" className="text-link">
            Meet your travel tribe <span>↗</span>
          </Link>
        </div>
      </section>
      <section className="values section">
        <p className="eyebrow">A DIFFERENT WAY TO GO</p>
        <div className="values-grid">
          {[
            {
              n: "01",
              title: "Go deeper.",
              copy: "Connect with local artists, guides, and small businesses. Experience a culture through the people who call it home.",
            },
            {
              n: "02",
              title: "Find your people.",
              copy: "Travel alongside curious, like-minded people. Come solo, bring a friend, and make connections that go beyond the itinerary.",
            },
            {
              n: "03",
              title: "Make it matter.",
              copy: "Travel with respect for the places that welcome you. Our partnerships support local communities and celebrate their traditions.",
            },
          ].map((x) => (
            <article key={x.n} data-reveal>
              <span>{x.n}</span>
              <h3>{x.title}</h3>
              <p>{x.copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="founder-section section">
        <div className="founder-portrait" data-reveal>
          <LocalImage
            src="/media/1840fe030aee.webp"
            alt="GrooveTrips founder Jannelle Cortes in a colorful courtyard"
            loading="lazy"
            width="750"
            height="900"
          />
          <span>JANNELLE CORTES / FOUNDER & FELLOW EXPLORER</span>
        </div>
        <div className="founder-copy" data-reveal>
          <p className="eyebrow">A NOTE FROM JANNELLE</p>
          <h2>
            “We don’t travel
            <br />
            just to see new places.
            <br />
            <em>
              We travel to build
              <br />a community.”
            </em>
          </h2>
          <p>
            A choreographer. A Dominican-American entrepreneur. A lifelong
            explorer. Jannelle brings her love of movement and connection to
            every GrooveTrip.
          </p>
          <Link className="text-link" href="/about">
            Get to know our founder <span>↗</span>
          </Link>
        </div>
      </section>
      <section className="journal-section section">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">POSTCARDS FROM THE ROAD</p>
            <h2>
              Stories with <em>soul.</em>
            </h2>
          </div>
          <Link className="text-link" href="/journal">
            The travel journal <span>↗</span>
          </Link>
        </div>
        <div className="journal-grid">
          {posts.slice(0, 3).map((post, i) => (
            <Link
              href={`/journal/${post.slug}`}
              className="journal-card"
              key={post.slug}
              data-reveal
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
                {["DOMINICAN REPUBLIC", "THAILAND", "COSTA RICA"][i]}{" "}
                <span>{post.date}</span>
              </p>
              <h3>
                {
                  [
                    "The magic of coming home.",
                    "Different groups. One magic country.",
                    "A little passport panic. A lot of pura vida.",
                  ][i]
                }
              </h3>
              <span className="journal-read">Read the story ↗</span>
            </Link>
          ))}
        </div>
      </section>
      <JoinSection />
      <Reveal />
    </>
  );
}
