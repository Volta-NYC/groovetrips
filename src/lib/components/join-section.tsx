import Arrow from "@/lib/components/arrow";
export default function JoinSection() {
  return (
    <section className="join-section" data-reveal>
      <div>
        <p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
        <h2>
          Come for the world.
          <br />
          <em>Stay for the people.</em>
        </h2>
      </div>
      <div className="join-copy">
        <p>
          Come as you are. Build friendships, support local communities, and
          find a journey that feels like you. We’re here to help you plan.
        </p>
        <a
          href="https://www.groovetrips.com/contact-us"
          className="button button-dark"
          target="_blank"
          rel="noreferrer"
        >
          Find your travel tribe <Arrow />
        </a>
      </div>
    </section>
  );
}
