import LocalImage from "@/lib/components/local-image";
import Link from "next/link";
export const metadata = {
  title: "Join the tribe",
  description:
    "Connect with the GrooveTrips team to find a culturally immersive journey that suits your travel style.",
};
export default function Contact() {
  return (
    <section className="contact-page section">
      <div>
        <p className="eyebrow">YOUR PEOPLE ARE OUT THERE</p>
        <h1>
          Let’s find
          <br />
          <em>your groove.</em>
        </h1>
        <p>
          Tell us a little about yourself, the places you’re dreaming of, and
          how you like to travel. We’d love to welcome you into our community.
        </p>
        <a
          href="https://www.groovetrips.com/contact-us"
          target="_blank"
          rel="noreferrer"
          className="button button-dark"
        >
          Connect with GrooveTrips <span>↗</span>
        </a>
        <small>Continue to the GrooveTrips inquiry form.</small>
        <Link href="/trips" className="text-link">
          Still exploring? See the trips <span>↗</span>
        </Link>
      </div>
      <LocalImage
        src="/media/96f3e705686f.webp"
        alt="Travelers connecting over a rooftop view"
        fetchPriority="high"
      />
    </section>
  );
}
