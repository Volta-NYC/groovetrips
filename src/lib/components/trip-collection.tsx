"use client";
import { useState } from "react";
import trips from "@/lib/data/trips.json";
import TripCard from "./trip-card";
export default function TripCollection() {
  const [year, setYear] = useState(0);
  const filtered = trips.filter((t) => !year || t.year === year);
  return (
    <>
      <div className="collection-controls">
        <div
          className="filter-buttons"
          role="group"
          aria-label="Filter trips by year"
        >
          {[0, 2026, 2027].map((y) => (
            <button
              key={y}
              onClick={() => setYear(y)}
              aria-pressed={year === y}
            >
              {y || "All journeys"}
              {year === y && <span>↗</span>}
            </button>
          ))}
        </div>
        <span aria-live="polite">{filtered.length} journeys to discover</span>
      </div>
      <div className="trip-grid all-trips">
        {filtered.map((trip, i) => (
          <TripCard key={trip.slug} trip={trip} index={i} />
        ))}
      </div>
    </>
  );
}
