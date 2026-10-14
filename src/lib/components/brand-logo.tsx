import Image from "next/image";
import Link from "next/link";

export default function BrandLogo() {
  return (
    <Link href="/" className="brand-logo" aria-label="GrooveTrips home">
      <Image
        src="/brand/groovetrips-logo.png"
        alt="GrooveTrips"
        width={500}
        height={500}
        sizes="200px"
        loading="eager"
      />
    </Link>
  );
}
