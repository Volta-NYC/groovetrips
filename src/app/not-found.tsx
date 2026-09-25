import Link from "next/link";
export default function NotFound() {
  return (
    <section className="page-heading section">
      <p className="eyebrow">A SMALL DETOUR</p>
      <h1>
        Let’s get you
        <br />
        <em>back on your way.</em>
      </h1>
      <p>
        We couldn’t find that page, but your next adventure is still out there.
      </p>
      <Link className="button button-dark" href="/trips">
        Explore the trips <span>↗</span>
      </Link>
    </section>
  );
}
