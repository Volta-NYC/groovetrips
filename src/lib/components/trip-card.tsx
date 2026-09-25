import LocalImage from "@/lib/components/local-image";
import Link from "next/link";
import trips from "@/lib/data/trips.json";
export type Trip = (typeof trips)[number];
export default function TripCard({
  trip,
  index = 0,
}: {
  trip: Trip;
  index?: number;
}) {
  return (
    <Link href={`/trips/${trip.slug}`} className="trip-card" data-reveal>
      <div className="trip-photo">
        <LocalImage
          src={trip.image}
          alt={`${trip.name} destination`}
          loading="lazy"
          width="700"
          height="850"
        />
        <span className="trip-year">{trip.year} COLLECTION</span>
        <span className="trip-index">{String(index + 1).padStart(2, "0")}</span>
        <span className="trip-circle">↗</span>
      </div>
      <div className="trip-info">
        <h3>{trip.name}</h3>
        <p>{trip.date}</p>
      </div>
      <p className="trip-description">{trip.summary.split(". ")[0]}.</p>
    </Link>
  );
}
