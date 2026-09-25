import Link from "next/link";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <Link className="wordmark" href="/">
          groove<span>trips</span>
          <i>✳</i>
        </Link>
        <p>
          A world to explore.
          <br />A community to come home to.
        </p>
        <div>
          <Link href="/trips">Find your trip</Link>
          <Link href="/about">Our story</Link>
          <Link href="/journal">Travel journal</Link>
          <Link href="/contact">Let’s connect</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} GrooveTrips</span>
        <span>Travel with purpose. Come back with a story.</span>
        <a href="#main">Back to top ↑</a>
      </div>
    </footer>
  );
}
