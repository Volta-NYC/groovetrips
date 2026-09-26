"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <header className={`site-header ${path === "/" ? "over-hero" : ""}`}>
      <Link href="/" className="wordmark" aria-label="GrooveTrips home">
        groove<span>trips</span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        <Link href="/trips">Find your trip</Link>
        <Link href="/about">Our groove</Link>
        <Link href="/journal">Travel journal</Link>
      </nav>
      <a
        className="nav-cta"
        href="https://www.groovetrips.com/contact-us"
        target="_blank"
        rel="noreferrer"
      >
        Join the tribe <span>↗</span>
      </a>
      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close" : "Menu"} <span>{open ? "−" : "+"}</span>
      </button>
      {open && (
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {[
            ["/trips", "Find your trip"],
            ["/about", "Our groove"],
            ["/journal", "Travel journal"],
            ["/contact", "Join the tribe"],
          ].map(([href, label]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              {label}
              <span>↗</span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
