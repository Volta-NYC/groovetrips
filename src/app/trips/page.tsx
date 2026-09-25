import TripCollection from "@/lib/components/trip-collection";
import JoinSection from "@/lib/components/join-section";
export const metadata = {
  title: "Find your next trip",
  description:
    "Explore GrooveTrips journeys in Bali, Turkey, Thailand, Bhutan, Japan, and beyond. Discover the 2026–2027 collection.",
};
export default function Trips() {
  return (
    <>
      <section className="page-heading section">
        <p className="eyebrow">THE 2026 — 2027 COLLECTION</p>
        <h1>
          Follow your
          <br />
          <em>curiosity.</em>
        </h1>
        <p>
          New places. Local perspectives. Your kind of people.
          <br />
          Find a journey that feels like you.
        </p>
      </section>
      <section className="section collection-section">
        <TripCollection />
      </section>
      <JoinSection />
    </>
  );
}
