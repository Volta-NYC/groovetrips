import LocalImage from "@/lib/components/local-image";
import Link from "next/link";
import { notFound } from "next/navigation";
import trips from "@/lib/data/trips.json";
import TripCard from "@/lib/components/trip-card";
export function generateStaticParams() {
  return trips.map((t) => ({ slug: t.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trip = trips.find((t) => t.slug === slug);
  return {
    title: trip ? `${trip.name} · ${trip.date}` : "Trip not found",
    description: trip?.summary,
  };
}
export default async function Trip({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trip = trips.find((t) => t.slug === slug);
  if (!trip) notFound();
  return (
    <>
      <section className="detail-hero">
        <LocalImage
          sizes="100vw"
          src={trip.image}
          alt={`${trip.name} destination`}
          fetchPriority="high"
        />
        <div className="detail-shade" />
        <div>
          <Link href="/trips" className="back-link">
            ← All journeys
          </Link>
          <p className="eyebrow">THE GROOVETRIPS COLLECTION / {trip.year}</p>
          <h1>{trip.name}</h1>
          <p className="detail-date">{trip.date}</p>
        </div>
      </section>
      <section className="trip-detail section">
        <div className="trip-story">
          <p className="eyebrow">CULTURE. CONNECTION. A LITTLE WONDER.</p>
          <h2>
            Your next
            <br />
            <em>great story.</em>
          </h2>
          {trip.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <aside className="booking-panel">
          <span className="eyebrow">LET’S GET YOU THERE</span>
          <h3>{trip.name}</h3>
          <p>{trip.date}</p>
          <div className="booking-rule" />
          <p>
            Tell us a little about yourself and your travel style. The
            GrooveTrips team will help you with the itinerary, pricing, and
            availability.
          </p>
          <a
            className="button button-dark"
            href="https://www.groovetrips.com/contact-us"
            target="_blank"
            rel="noreferrer"
          >
            Ask about this trip <span>↗</span>
          </a>
          <small>Connect directly with the GrooveTrips team.</small>
        </aside>
      </section>
      <section className="section more-trips">
        <div className="section-heading">
          <h2>
            Keep <em>exploring.</em>
          </h2>
          <Link className="text-link" href="/trips">
            All journeys <span>↗</span>
          </Link>
        </div>
        <div className="trip-grid">
          {trips
            .filter((t) => t.slug !== slug)
            .slice(0, 3)
            .map((t, i) => (
              <TripCard key={t.slug} trip={t} index={i} />
            ))}
        </div>
      </section>
    </>
  );
}
